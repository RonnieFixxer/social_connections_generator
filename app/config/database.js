import * as dotenv from 'dotenv'
import pkg from 'pg'
import { faker } from '@faker-js/faker'
import { argv } from 'node:process'
import {
  getRandomInt,
  subscribersTableCreateQuery,
  userTableCreateQuery,
  dataBaseUsers,
  dataBaseSubscribers,
  createUsersQuery
} from '../controllers/dataBaseControllers.js'
dotenv.config()

const { Client } = pkg

const client = new Client({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

await client.connect()

const sendData = async (query) => {
  try {
    await client.query(query)
    return true
  } catch (error) {
    console.error(error.stack)
    return false
  }
}

const getData = async (query) => {
  try {
    const data = await client.query(query)
    return data
  } catch (error) {
    console.error(error.stack)
    return false
  }
}

const localUsers = []

for (let i = 0; i <= argv[2]; i++) {
  localUsers.push({
    name: faker.name.firstName(),
    gender: faker.name.sexType()
  })
}

await sendData(userTableCreateQuery).then(result => {
  if (!result) {
    return
  }

  Promise.all(localUsers.map(user => {
    return sendData(createUsersQuery(user.name, user.gender))
  }))

  console.log('Table created')
})

await sendData(subscribersTableCreateQuery).then(result => {
  if (!result) {
    return
  }
  console.log('Table subscribers created')
})

export const allUsers = await getData(dataBaseUsers)

const addSubscribers = async (userId, friendId) => {
  const getUserQuery = (userId) => (`
        SELECT *
        from user_subscriptions
        where user_id = '${userId}'
    `)

  const addSubscribersQuery = (userId, friendId) => (`
        INSERT INTO user_subscriptions(user_id, friend_id) VALUES('${userId}', '${friendId}')
    `)

  const user = await getData(getUserQuery(userId))

  if (user.rows.every(item => item.friend_id !== friendId) && userId !== friendId) {
    await sendData(addSubscribersQuery(userId, friendId)).then(result => {
      if (!result) {
        return
      }
      console.log('Subscriber added')
    })
  };
}

for (let i = 0; i < allUsers.rows.length; i++) {
  const userId = getRandomInt(1, allUsers.rows.length)

  for (let i = 0; i <= getRandomInt(1, allUsers.rows.length); i++) {
    const friendId = getRandomInt(1, allUsers.rows.length)

    if (userId !== friendId) {
      await addSubscribers(userId, friendId)
    }
  }
}

export const allSubscribers = await getData(dataBaseSubscribers)

await client.end()
