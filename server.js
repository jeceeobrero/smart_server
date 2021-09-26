const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const e = require('express');
const register = require('./controllers/register')
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : 'postgresql-rectangular-01034',
      user : 'postgres',
      password : '2685139',
      database : 'smart-brain'
    }
  });

db.select('*').from('users').then(data => {
    console.log(data);
});
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req,res) => res.send('success'))
app.post('/signin', signin.handleSignIn(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfile(db))
app.put('/image', image.handleImage(db))
app.post('/imageurl', (req,res) => image.handleAPICall(req,res))
app.listen(process.env.PORT || 3000, (req,res) => {
    console.log('port = ${process.env.PORT}');
})

