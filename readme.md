# Social connections generator

## How use this app:
- Clone app: ```git clone <the-link-from-repo>```;
- Open a terminal in the project folder;
- Run ```npm install (or just npm i)``` to install the dependencies;
- Open .env and fill your data;
- Run app: ```npm run start <amount of users>```;
- Endpoints to check users: 
    * [http://localhost:3000/users] (to get all users with subscriptions);
    * [http://localhost:3000/users/123/friends?order_by=id&order_type=desc] (to get information about the user with friends and available sorting by order_by and order_type. For friends we  consider mutual subscription);
    * [http://localhost:3000/max-following] (getting the top 5 users who made the most subscriptions);
    * [http://localhost:3000/not-following] (receiving users who have made 0 subscriptions).
- **To delete data** from database run: ```npm run delete```;

### Technology stack:
 - Node.js;
 - Express;
 - PostgreSQ:
 - Faker lib.;
