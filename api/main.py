import uvicorn

from fastapi import FastAPI

from config import Settings


app = FastAPI()
settings = Settings()


if __name__ == '__main__':
    uvicorn.run(app, host=settings.host, port=settings.port)