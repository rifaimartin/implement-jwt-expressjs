const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const EmployeSchema = new Schema({
	firstname: {
		type: String,
		trim: true,		
		required: true,
	},
	lastname: {
		type: String,
		trim: true,
		required: true
	},
	address: {
		type: String,
		trim: true,
		required: true
	},
	email: {
		type: String,
		trim: true,
		required: true
	},
	age: {
		type: Number,
		trim: true,
		required: true
	},
	city: {
		type: String,
		trim: true,
		required: true
	},
});

module.exports = mongoose.model('Employe', EmployeSchema)