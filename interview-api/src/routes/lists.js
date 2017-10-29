import express from 'express';

import List from '../models/List';

const router = express.Router();
// db.lists.updateMany({'rating': {$elemMatch: { id: 140607 } } }, {$set:{'rating': { id : 14067,rating : 1 } } })
//db.lists.update( {rating: {$elemMatch: { id: 11 } } }, {$set:{'rating': {'rating': 1} } })
router.put('/', (req, res) => {	
	const { rating, id, objKey } = req.body;
	let q = "rating." + objKey.toString() + ".id",
		u= "rating.0.rating"; //issue
	// console.log(req.body)
	List.findOne(
	{rating: {$elemMatch: { id: id } } }
	).then(response=>{
		if(response) {
			List.updateMany(
				{}, 
				{$set: { [u]: rating } }, (err, list) => {
					if (err) {return err};
					 // console.log(list)
					res.send(list)
				});
		} else {
	List.updateMany(
	{},
	{ $push: { rating: {id, rating} } }, (err, list) => {
		if (err) {return err };
		res.send(list)
	});				
		}	
	});
	// res.status(200).json({success: 'success'})
});

router.post('/', (req, res) => {	

const { listTitle, data } = req.body;
const NewList = new List({
		listTitle: listTitle,
		data: data
	})	

List.find().then(response => {
	if(response[0]){		
	console.log('worked:',response[0].rating);	
	NewList.rating = response[0].rating
	}
}).catch(err => console.log(err))

	List.findOne({ listTitle: listTitle})
		.then(response => {
			if(response){
				console.log(response, ' ***already exists')
				res.status(400).json({ errors: { global: "List name is already taken"}})
			}
				else (
	NewList.save()
		.then(NewList => {
			// console.log(NewList);
			res.json( NewList )
		})
		.catch(err => res.status(500).json({ error: err }))
					)
		})
		.catch(err => err)		
});


router.get('/', (req,res) => {
	List.find().then(data => {
		{ res.json({ data }) }
	}).catch(err => res.status(500).json({ error: err }))
})

router.delete('/', (req, res) => {
	// console.log('req:',req.body.movieId)	
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