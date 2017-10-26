import express from 'express';

// import User from '../models/User';

const router = express.Router();

router.post('/', (req, res) => {
	// console.log('req:',req.body)
	console.log('data route')
	res.status(200).json({success: 'success'})
})

export default router;