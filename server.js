var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	problemController = require('./server/controllers/problem-controller.js'),
	solutionController = require('./server/controllers/solution-controller.js');

mongoose.connect('mongodb://localhost:27017/test');

app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/views/index.html');
});

app.use('/js', express.static(__dirname + '/client/js'));
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/img', express.static(__dirname + '/client/img'));

app.get('/api/problems', problemController.list);
app.post('/api/problems', problemController.create);
app.delete('/api/problems/:id', problemController.delete);

app.post('/api/solutions', solutionController.add);

app.listen(3000, function() {
	console.log('listening');
});