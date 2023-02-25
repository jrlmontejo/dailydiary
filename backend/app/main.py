import json

from redis import Redis
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

from app.models.diary_entry import DiaryEntry, DiaryEntryInput

r = Redis(host="store", decode_responses=True)
app = FastAPI(title="Daily Diary")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return { "message": "API is healthy." }


@app.post("/diary", status_code=201, response_model=DiaryEntry)
async def create_diary_entry(input: DiaryEntryInput) -> DiaryEntry:
    entry = DiaryEntry(text=input.text, mood=input.mood)
    key = str(entry.id)

    obj_data = entry.dict(exclude={"id", "created"})
    r.set(f"diary:{key}", json.dumps(obj_data))

    ts = datetime.timestamp(entry.created)

    ts_data = {}
    ts_data[key] = ts

    r.zadd("diary", ts_data)

    return entry


@app.get("/diary")
def get_diary_entries() -> list[DiaryEntry]:
    entries = []

    results = r.zrevrangebyscore("diary", "+inf", "-inf", withscores=True)

    for (key, ts) in results:
        result = r.get(f"diary:{key}")

        if result is None:
            continue

        data = json.loads(result)

        entry = DiaryEntry(
            id=key,
            text=data["text"],
            mood=data["mood"],
            created=datetime.fromtimestamp(ts)
        )

        entries.append(entry)

    return entries


@app.put("/diary/{entry_id}", response_model=DiaryEntry)
async def update_diary_entry(entry_id: str, input: DiaryEntryInput) -> DiaryEntry:
    result = r.get(f"diary:{entry_id}")

    if result is None:
        raise HTTPException(status_code=404, detail="Diary entry not found.")

    data = json.loads(result)
    ts = r.zscore("diary", entry_id)

    entry = DiaryEntry(
        id=entry_id,
        text=input.text if input.text else data["text"],
        mood=input.mood if input.mood else data["mood"],
        created=datetime.fromtimestamp(ts)
    )

    obj_data = entry.dict(exclude={"id", "created"})
    r.set(f"diary:{entry_id}", json.dumps(obj_data))

    return entry


@app.delete("/diary/{entry_id}")
async def delete_diary_entry(entry_id: str):
    r.zrem("diary", entry_id)
    r.delete(f"diary:{entry_id}")







