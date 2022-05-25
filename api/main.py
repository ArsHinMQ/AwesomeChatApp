import uvicorn

from fastapi import FastAPI

from database import connect as db_connect, disconnect as db_disconnect
from endpoints import router
from config import settings


app = FastAPI()
app.include_router(router)


@app.on_event('startup')
async def connect_db():
    await db_connect()


@app.on_event('shutdown')
async def disconnect_db():
    await db_disconnect()


if __name__ == '__main__':
    uvicorn.run(app, host=settings.host, port=settings.port)
