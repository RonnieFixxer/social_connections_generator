import express from 'express';
import { allUsersWithSubscribers } from './app/config/database.mjs';
import { allUsers, allSubscribers } from './app/config/database.mjs';
const app = express()
const port = 3000

app.get('/users', (req, res) => {
  res.send(allSubscribers.rows)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
