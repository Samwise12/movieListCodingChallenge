import express from 'express';

import List from '../models/List';

const router = express.Router();

router.post('/', (req, res) => {
	// console.log('req:',req.body)	
	const { listTitle, data } = req.body;
	// console.log(data)
	const NewList = new List({
		listTitle: listTitle,
		data: data
	})
	// console.log(NewList)
	// res.status(200).json({success: 'success'})
	NewList.save()
		.then(NewList => res.json( NewList ))
		.catch(err => res.status(500).json({ error: err }));
});

router.get('/', (req,res) => {
	List.find().then(data => {
		{ res.json({ data }) }
	}).catch(err => res.status(500).json({ error: err }))
})

export default router;