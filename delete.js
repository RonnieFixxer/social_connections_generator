import * as dotenv from 'dotenv'
import pkg from 'pg'
dotenv.config()

const { Client } = pkg

const deleteTables = async () => {
  try {
    const client = new Client({
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT
    })

    await client.connect()
    await client.query('DROP TABLE if exists "users", "user_subscriptions" cascade;')
    await client.end()
  } catch (error) {
    console.log(error)
  }
}

deleteTables()
