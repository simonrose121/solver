var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	problemController = require('./server/controllers/problem-controller.js'),
	solutionController = require('./server/controllers/solution-controller.js');

var config = JSON.parse(process.env.APP_CONFIG);
mongoose.connect('mongodb://' + config.mongo.user + ':pword@' + config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.db);

app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/views/index.html');
});

app.use('/js', express.static(__dirname + '/client/js'));
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/img', express.static(__dirname + '/client/img'));
app.use('/font', express.static(__dirname + '/client/font'));

app.get('/api/problems', problemController.list);
app.post('/api/problems', problemController.create);
app.delete('/api/problems/:id', problemController.delete);

app.post('/api/solutions', solutionController.add);
app.post('/api/solutions/update', solutionController.update);

app.listen(3000, function() {
	console.log('listening');
});