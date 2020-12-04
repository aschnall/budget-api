const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors')
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const submit = require('./controllers/submit');
const reset = require('./controllers/reset');
const deleteItem = require('./controllers/delete');


const db = knex({
	client: 'pg',
  	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl: {
			rejectUnauthorized: false
   		}
   	}
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send('it is working') });

// get request responding with user's pre-existing transaction data immediately upon logging in
app.get('/:user_id', async (req, res) => {
	const { user_id } = req.params
	try {
		const database = await db('transactions').where('user_id', user_id);
		res.json(database);
	} catch {
		res.status(404).json('unable to get data');
	}
})

//register endpoint
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

//sigin endpoint
app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) });

//submit endpoint
app.put('/submit', (req, res) => { submit.handleSubmit(req, res, db) });

//reset endpoint
app.put('/reset', (req, res) => { reset.handleReset(req, res, db) });

//delete endpoint
app.put('/delete', (req, res) => { deleteItem.handleDelete(req, res, db) });


app.listen(process.env.PORT || 3001, function() {
	console.log(`app is running on port ${process.env.PORT}`);
})

