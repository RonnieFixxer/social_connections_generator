// import { allUsers } from "../config/database.js";

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function createUsersQuery (userName, userGender) {
    return (`
    INSERT INTO users (first_name, gender) 
    VALUES ('${userName}', '${userGender}');`)
};

export function dynamicSort(property) {
    let sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

export const subscribersTableCreateQuery = `
    CREATE TABLE IF NOT EXISTS "user_subscriptions" (
	    "id" SERIAL,
        "user_id" int NOT NULL REFERENCES users(id),
	    "friend_id" INT NOT NULL REFERENCES users(id),
        PRIMARY KEY ("id")
    );`

export const userTableCreateQuery = `
CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL,
    "first_name" VARCHAR(100) NOT NULL,
    "gender" VARCHAR(15) NOT NULL,
    PRIMARY KEY ("id")
);`

export const dataBaseUsers = `
SELECT *
    from users
`;

export const dataBaseSubscribers = `
SELECT *
    from user_subscriptions
`;

export function getUserById (req, res) {
    const {
      params: { id },
    } = req;
  
    if (!wantedUser(users, id)) {
      res.sendStatus(404);
    };
  
    res.json(wantedUser(users, id));
};



