import express from 'express';
import { allUsers, allSubscribers } from './app/config/database.mjs';
import { 
  getUserWithfriends, 
  getUsersWithSubscribtions,
  topfiveUsers,
  usersWithNullSubsciptions
} from './app/controllers/endpointControllers.js';
const app = express()
const port = 3000

app.get('/users', getUsersWithSubscribtions);

app.get('/users/:id/friends', getUserWithfriends)
 
app.get('/max-following', topfiveUsers)

app.get('/not-following', usersWithNullSubsciptions)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
