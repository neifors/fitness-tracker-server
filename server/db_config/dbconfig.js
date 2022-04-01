const { MongoClient } = require('mongodb')
const connectionUrl = process.env.DB_CONNECTION||'mongodb://futureproof:userpass@db:27017'

const dbName = process.env.DB_NAME||'users'

const init = async () => {
  let client = await MongoClient.connect(connectionUrl)
  console.log('connected to database!', dbName)
  return client.db(dbName)
}


module.exports = { init };
