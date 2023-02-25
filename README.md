# Daily Diary

A diary app for CRUD demonstration purposes, written in React, with FastAPI as the backend and Redis as the data store.

## Setup

1. To run this project locally, install [Docker](https://docs.docker.com/get-docker/).

2. Once Docker is set up on your machine, run:
    ```
    docker compose up --build
    ```
    This will initialize 3 services: Redis store, FastAPI backend, and the main React app, as indicated in `docker-compose.yml`.

3. The backend app is set at port `8001`. You may view the API docs at these two links:
    * http://localhost:8001/docs
    * http://localhost:8001/redoc

4. The frontend app is set at port `3000`. You may view the app by visiting:
    * http://localhost:3000

## Scaffolding

The project is divided into 2 parts: `backend` and `frontend`.

```
.
├── backend
│   ├── app
│   │   ├── models
│   │   └── main.py
│   ├── Dockerfile
│   └── requirements.txt
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── App.js
│   │   └── index.js
│   ├── public
│   │   └── index.html
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml
```

The `backend` is written in Python with FastAPI as the framework, and contains the data models and APIs for storing diary entries to Redis. The `frontend` is written in React, and provides a UI for viewing and adding diary entries.