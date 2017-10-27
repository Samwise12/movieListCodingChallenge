import mongoose from 'mongoose';

var createListSchema = mongoose.Schema({
	listTitle: {
		type: String,
		unique: true,
		index: true,
		required: true
	},
	data: {
		type: Array
	},
	rating: {
		type: Array
	}
})

let List = module.exports = mongoose.model('List', createListSchema);
