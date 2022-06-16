const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { rsort } = require('semver');

const register = require('./register.js');
const imageurl = require('./imageurl');
const { response } = require('express');




const db = knex({
  client:'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: '43211',
    database: 'test'
  }  
});

db.select('*').from('users').then(data => {
  console.log(data);
});

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send('success')
})

// res.send vs res.json just returns a string
app.post('/signin', (req, res) => {
  db.select('email', 'hash').from('login')
  .where('email', '=', req.body.email)
  .then(data => {
  const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
    if (isValid){
      return db.select('*').from('users')
      .where('email', '=', req.body.email)
      .then(user => {
        res.json(user[0])                                      
      })
      .catch(err => res.status(400).json('unable to get user'))
    } else {
        res.status(400).json('Wrong credentials');
    }
  })
  .catch(err => res.status(400).json('Wrong credentials'))
})

app.post('/register', register.handleRegister(db, bcrypt))
// dependency injection so the file where the function is hosted has access to the packages/ project dependencies

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
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
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0].entries);
  })
  .catch(err => res.status(400).json('unable to get entries'))
})

app.post('/imageurl', (req, res) => { imageurl.handleApiCall(req, res)})

app.listen(3000, () => {
  console.log('is running') 
})

// we want a root route first - this works
// next a signin endpoint using POST to send the data to our store - success or fail
//register using POST - return the new user 
//profile using GET with user info - return USER
//rank using PUT to update rank info - return rank