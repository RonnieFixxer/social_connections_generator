import express from 'express';
import { allUsers, allSubscribers } from './app/config/database.mjs';
import { sendUserWithfriends } from './app/controllers/endpointControllers.js';
const app = express()
const port = 3000

// app.get('/users', (req, res) => {
//   res.send(allSubscribers.rows)
// });

// app.get('/users/:id', (req, res) => {
//   res.send(req.params.id + '\n')
// })

app.get('/users/:id/friends', sendUserWithfriends)
 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
