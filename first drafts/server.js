const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors()); // allows front end access to my server. unblocks a blocking security feature in chrome, as chrome doesnt trust the server yet.
// so this comes into play only when u want to access the server from the client side using fetch

const database = {
   users: [
     {
       id: '123',
       name: 'John',
       email: 'john@gmail.com',
       password: 'cookies',
       entries: 0,
       joined: new Date()
     },
     {
      id: '124',
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'cake',
      entries: 0,
      joined: new Date()
    }

   ]
}

app.get('/', (req, res) => {
  res.send(database.users)
})

// res.json is another handy express method similar to res.send with a few extra features. res.send vs res.json just returns info in json format
app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email &&
   req.body.password === database.users[0].password){
    res.json('success');
   } else {
     res.status(400).json('error logging in');
   }
})

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  database.users.push({
      id: '125',
      name: name,
      email: email,
      password: password,
      entries: 0,
      joined: new Date()
  })
  res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false; // try this out with find or filter instead
  database.users.forEach(user => {
    if (user.id === id){
      found = true;
      return res.json(user);
    } 
  })
    if (!found) {
      res.status(404).json('user doesnt exist')
    }
  })

app.put('/rank', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id){
      found = true;
      user.entries++
      return res.json(user.entries);
      } 
    })
    if (!found) {
      res.status(404).json('user doesnt exist')
    }
  })

app.listen(3000, () => {
  console.log('is running') 
})

// we want a root route first - this works
// next a signin endpoint using POST to send the data to our store - success or fail
//register using POST - return the new user 
//profile using GET with user info - return USER
//rank using PUT to update rank info - return rank