from pymongo import MongoClient

def initialize_db():
    client = MongoClient('mongodb://admin:admin@cluster0-shard-00-00-ab800.gcp.mongodb.net:27017,cluster0-shard-00-01-ab800.gcp.mongodb.net:27017,cluster0-shard-00-02-ab800.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true')
    db = client['vinacann']

    return db

