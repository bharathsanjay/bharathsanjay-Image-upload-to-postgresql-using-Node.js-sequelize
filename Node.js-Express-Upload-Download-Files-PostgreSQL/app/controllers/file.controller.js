var stream = require('stream');
const express = require("express");
const app = express();
const bodyparser = require('body-parser');
const db = require('../config/db.config.js');
const File = db.files;
app.use(bodyparser.urlencoded({extended:false})) 
app.use(bodyparser.json())
exports.uploadFile = (req, res) => {
	File.create({
		type: req.file.mimetype,
		image_name: req.file.originalname,
		data: req.file.buffer,
		Name: req.body.name1,
		Roll_No: req.body.roll

	}).then(() => {
		res.json({msg:'File uploaded successfully! -> filename = ' + req.file.originalname});
	}).catch(err => { 
		console.log(err);
		res.json({msg: 'Error', detail: err});
	});
} 

exports.listAllFiles = (req, res) => {
	File.findAll({attributes: ['id', 'type','image_name','Name','Roll_No','createdAt','updatedAt','data']}).then(files => {
	  res.json(files);
	}).catch(err => {
		console.log(err);
		res.json({msg: 'Error', detail: err});
	});
}
  

exports.downloadFile = (req, res) => {
	File.findByPk(req.params.id).then(file => {
		var fileContents = Buffer.from(file.data, "base64");
		var readStream = new stream.PassThrough();
		readStream.end(fileContents);
		
		res.set('Content-disposition', 'attachment; filename=' + file.name);
		res.set('Content-Type', file.type);

		readStream.pipe(res);
	}).catch(err => {
		console.log(err);
		res.json({msg: 'Error', detail: err});
	});
}