import mongoose from 'mongoose';

var createRateSchema = mongoose.Schema({
	listTitle: {
		type: String,
		index: true
	},
	data: {
		type: Array
	}/*,
	rating: {
		type: Array
	}*/
})

let Rate = module.exports = mongoose.model('Rate', createRateSchema);
