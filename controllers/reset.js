
// /reset endpoint PUT request responsible for deleting all of a user's transactions 
const handleReset = async (req, res, db) => {
	const { user_id } = req.body;
	try {
		const resetData = await db('transactions').where('id', user_id).del();
		res.json(resetData);
	} catch {
		res.status(404).json('error')
	}
}

module.exports = {
	handleReset
};
