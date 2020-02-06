
const employeModel = require('../models/employes');		
const redis = require('redis')
const client = redis.createClient()			

module.exports = {
	getById: function(req, res, next) {
		console.log(req.body);
		client.get("getEmpById",  function  (data)   { employes = data; });
		employeModel.findById(req.params.employeId, function(err, employeInfo){
			if (err) {
				client.setex("getEmployeById", 3600, res.json(employes))
				next(err);
			} else {
				res.json({status:"success", message: "Employe found!!!", data:{employes: employeInfo}});
			}
		});
	},

	getAll: function(req, res, next) {
		let employesList = [];
		client.get("getAllEmp",  function  (data)   { employes = data});
		employeModel.find({}, function(err, employes){
			if (err){
				client.setex("getAllEmp", 3600, res.json(employes))
				console.log(employes,"ini employe")
				next(err);
			} else{
				for (let employe of employes) {
					employesList.push({id: employe._id, firstname: employe.firstname, lastname: employe.lastname,address: employe.address,email: employe.email,age: employe.age,city: employe.city});
				}
				res.json({status:"success", message: "Employe list found!!!", data:{employes: employesList}});
			}
		});
	},

	updateById: function (req, res, next) {
		console.log(req.body);

		employeModel.findByIdAndUpdate(req.params.employeId,{$set:req.body}, function(err, result){
			if(err){
				console.log(err);
			}
			console.log("RESULT: " + result);
			res.send('Done')
		});
	},

	deleteById: function(req, res, next) {
		client.get("deleteByid",  function  (data)   { employes = data});
		employeModel.findByIdAndRemove(req.params.employeId, function(err, employeInfo){
			if(err){
				client.setex("deleteByid", 3600, res.json(employes))
				next(err);
			}else {
				res.json({status:"success", message: "Employe deleted successfully!!!", data:null});
			}
		});
	},

	create: function(req, res, next) {
		employeModel.create({ firstname: req.body.firstname,lastname: req.body.lastname,address: req.body.address,email: req.body.email,age: req.body.age,city: req.body.city}, function (err, result) {
				  if (err) 
				  	next(err);
				  else
				  	res.json({status: "success", message: "Employe added successfully!!!", data: null});
				  
				});
	},

}					