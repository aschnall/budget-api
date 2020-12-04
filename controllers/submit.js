
// /submit endpoint PUT request responsible for adding a new transaction and returning updated data
const handleSubmit = async (req, res, db) => {
	const { amount, description, type, date, user_id } = req.body;
	try {
		const newTransaction = await db('transactions').insert({
			amount: amount, description: description, type: type, date: date, user_id: user_id
		});
		const transactions = await db('transactions').where('user_id', user_id);
		res.json(transactions);
	} catch {
		res.status(404).json('unable to fetch data');
	}
}

module.exports = {
	handleSubmit
};