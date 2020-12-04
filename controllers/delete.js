
// /delete endpoint PUT request responsible for deleting a transaction and responding with updated transaction data
const handleDelete = async (req, res, db) => {
	const { amount, description, type, date, user_id } = req.body;
	try {
		const removeData = await db('transactions').where({amount: amount, description: description, type: type, date: date, id: user_id}).del();
		const newData = await db('transactions').where('id', user_id);
		res.json(newData);
	} catch {
		res.status(404).json("unable to delete")
	}
}

module.exports = {
	handleDelete
};
