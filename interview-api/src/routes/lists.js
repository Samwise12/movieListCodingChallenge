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

router.delete('/', (req, res) => {
	console.log('req:',req.body.movieId)	
	List.find({ 'data.id': req.body.movieId }, {_id: 1})
		.then(getId => {
			// console.log(getId[0]._id)
		List.update(
			{'_id': getId[0]._id},
			{ $pull: { "data" : { "id": req.body.movieId } } }
			)
			.then(stuff => {
			// console.log('stuff:',stuff)
				return (res.json({success: 'success'}))
		})
			.catch(err => console.log('err:',err))			
			})
		.catch(err => console.log('err:',err));
	/*List.remove({ 'data.id': req.body.movieId })
		.then(stuff => {
			// console.log('stuff:',stuff)
			return (res.json({success: 'success'}))
	})
		.catch(err => console.log('err:',err))*/
	// res.json({success: 'success'})
})

export default router;