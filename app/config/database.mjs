import pkg from 'pg';
import { faker } from '@faker-js/faker';

const { Client } = pkg;

const client = new Client({
    host: '127.0.0.1',
    user: 'postgres',
    password: 'manowars',
    port: 5432,
});

await client.connect(); //connect

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
const randomNum = getRandomInt(0, 200);


const users = [];

for (let i = 0; i <= 5; i++) {
    users.push({
       name:  faker.name.firstName(),
       gender: faker.name.sexType(),
    })
}


const execute = async (query) => {
    try {
        await client.query(query);
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } 
};

const userTableQuery = `
    CREATE TABLE IF NOT EXISTS "users" (
	    "id" SERIAL,
	    "first_name" VARCHAR(100) NOT NULL,
	    "gender" VARCHAR(15) NOT NULL,
	    PRIMARY KEY ("id")
    );`

const createUsersQuery = (userName, userGender) => (`
    INSERT INTO users (first_name, gender) 
    VALUES ('${userName}', '${userGender}');
`);

await execute(userTableQuery).then(result => {
    if (!result) {
        return;
    }

    Promise.all(users.map(user => {
        execute(createUsersQuery(user.name, user.gender))
    }));

    
    console.log('Table created');
});

const getDataBaseUsers = await client.query(`
    SELECT *
    from users
`);

console.log(getDataBaseUsers.rows)

const friendsTableQuery = `
    CREATE TABLE IF NOT EXISTS "friends" (
	    "id" SERIAL,
        "user_name" VARCHAR(100) NOT NULL,
	    "user_id" VARCHAR(100) NOT NULL,
	    "friends" VARCHAR(15) NOT NULL,
	    PRIMARY KEY ("id")
    );`

await execute(friendsTableQuery).then(result => {
    if (!result) {
        return;
    }  
    console.log('Table friends created');
});

await client.end(); //disconect
