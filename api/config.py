from pydantic import BaseSettings


class Settings(BaseSettings):
    host: str
    port: int
    db_url: str
    db_name: str

    class Config:
        env_file = '.env'


settings = Settings()
