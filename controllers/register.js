
// /register endpoint POST request responsible for inserting new user into user's table
// and inserting their hashed password into login table using bcrypt before returning the new user's data from the user table
const handleRegister = (req, res, db, bcrypt) => {
	const { first_name, last_name, email, password } = req.body;
	if (!first_name || !last_name || !email || !password) {
		return res.status(400).json('incorrect form submission')
	}
	const hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			secret: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
				.returning('*')
				.insert({
					first_name: first_name,
					last_name: last_name,
					email: loginEmail[0],
					joined: new Date()
				})
			.then(user => {
				res.json(user[0]);
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json('unable to register'));
}

module.exports = {
	handleRegister
};

