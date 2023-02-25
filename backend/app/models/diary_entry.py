from pydantic import BaseModel, Field
from datetime import datetime
from enum import Enum
from uuid import UUID, uuid4

class Mood(str, Enum):
    excited = "excited"
    happy = "happy"
    disgusted = "disgusted"
    sad = "sad"
    calm = "calm"
    disappointed = "disappointed"
    angry = "angry"
    shocked = "shocked"
    crazy = "crazy"
    cool = "cool"
    crying = "crying"
    confused = "confused"


class DiaryEntryInput(BaseModel):
    text: str | None
    mood: Mood | None


class DiaryEntry(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    text: str
    mood: Mood | None
    created: datetime = Field(default_factory=datetime.now)