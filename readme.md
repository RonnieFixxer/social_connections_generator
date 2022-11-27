# Social connections generator

### How use this app
    Clone app: ```git clone <the-link-from-repo>```;
    2. Open the project folder in your IDE;
    3. Open a terminal in the project folder;
    4. Run ```npm install (or just npm i)``` to install the dependencies;
    5. Open .env and fill your data:
    6. Run app: ```npm run start <amount of users>```;
    7. Endpoints to check users: 
        1) /users (to get all users with subscriptions);
        2) /users/123/friends?order_by=id&order_type=desc (to get information about the user with friends and available sorting by order_by and order_type. For friends we  consider mutual subscription);
        3) /max-following (getting the top 5 users who made the most subscriptions);
        4) /not-following (receiving users who have made 0 subscriptions).
    8. **To delete** data from database run: ```npm run delete```

### Technology stack:
 - Node.js;
 - Express;
 - PostgreSQ:
 - Faker lib.;
