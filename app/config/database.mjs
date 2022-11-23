import pkg from 'pg';
import { faker } from '@faker-js/faker';
import { argv } from 'node:process';

const { Client } = pkg;

const client = new Client({
    host: '127.0.0.1',
    user: 'postgres',
    password: 'manowars',
    port: 5432,
});

await client.connect(); //connect

import { 
    getRandomInt, 
    subscribersTableCreateQuery,
    userTableCreateQuery,
    dataBaseUsers,
    dataBaseSubscribers,
    createUsersQuery,
} from '../controllers/dataBaseControllers.js'; 

const sendData = async (query) => {
    try {
        await client.query(query);
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } 
};

const getData = async (query) => {
    try {
        const data = await client.query(query);
        return data;
    } catch (error) {
        console.error(error.stack);
        return false;
    } 
};

const randomNum = getRandomInt(0, argv[2]);

const localUsers = [];

for (let i = 0; i <= randomNum; i++) {
    localUsers.push({
       name:  faker.name.firstName(),
       gender: faker.name.sexType(),
    })
}

await sendData(userTableCreateQuery).then(result => {
    if (!result) {
        return;
    }

    Promise.all(localUsers.map(user => {
        sendData(createUsersQuery(user.name, user.gender))
    }));

    console.log('Table created');
});

export const allUsers = await getData(dataBaseUsers);
export const allSubscribers = await getData(dataBaseSubscribers);

await sendData(subscribersTableCreateQuery).then(result => {
    if (!result) {
        return;
    }  
    console.log('Table subscribers created');
});

const  addSubscribers = async (userId, friendId) => {
    const getUserQuery = (userId) => (`
        SELECT *
        from user_subscriptions
        where user_id = '${userId}'
    `)

    const addSubscribersQuery = (userId, friendId) => ( `
        INSERT INTO user_subscriptions(user_id, friend_id) VALUES('${userId}', '${friendId}')
    `)

    const user = await getData(getUserQuery(userId));

    if (user.rows.every(item => item.friend_id !== friendId) && userId !== friendId) {

        await sendData(addSubscribersQuery(userId, friendId)).then(result => {
            if (!result) {
                return;
            }  
            console.log('friend added');
        });
    };
}

for (let i = 0; i < allUsers.rows.length; i++) {
    await addSubscribers(getRandomInt(0, allUsers.rows.length), getRandomInt(0, allUsers.rows.length))
}

export const allUsersWithSubscribers = await client.query(`
    SELECT users.id AS id, first_name AS name, COUNT(friend_id) AS subscribers
    from users
    JOIN user_subscriptions
    ON users.id = user_subscriptions.user_id
    GROUP BY users.id
`);

const topfiveUsers = ``


await client.end(); //disconect
