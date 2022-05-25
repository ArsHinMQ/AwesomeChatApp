from http import client


from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase, AsyncIOMotorCollection

from config import settings

db: AsyncIOMotorDatabase = None
client: AsyncIOMotorClient = None
user_collection: AsyncIOMotorCollection = None


async def connect():
    global db, client, user_collection
    client = AsyncIOMotorClient(settings.db_url)
    db = client[settings.db_name]
    user_collection = db.users


async def disconnect():
    global client
    client.close()
