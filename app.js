var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	expressSession = require('express-session'),
	mongoose = require('mongoose'),
	problemController = require('./server/controllers/problem-controller.js'),
	solutionController = require('./server/controllers/solution-controller.js'),
	userController = require('./server/controllers/user-controller.js');
	passport = require('passport'),
	passportLocal = require('passport-local');

mongoose.connect('mongodb://localhost:27017/test');

// Middlewear
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
	secret: process.env.SESSION_SECRET || 'secret',
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal.Strategy(function(username, password, done) {
	userController.authenticate({ username: username, password: password }, function(err, result) {
		if (result) {
			done(null, { _id: result._id, name: result.name });
		} else {
			done(null, null);
		}
	});
}));

passport.serializeUser(function(user, done) {
	done(null, user._id);
});

passport.deserializeUser(function(_id, done) {
	userController.getUser(_id, function(err, result) {
		if (result)
			done(null, { _id: result._id, name: result.username });
		else
			done(null, null);
	});
});

app.set('view engine', 'ejs');

// Routes
app.get('/', function(req, res) {
	res.render(__dirname + '/client/views/index.ejs', {
		isAuthenticated: req.isAuthenticated(),
		user: req.user
	});
});
app.post('/', passport.authenticate('local'), function(req, res) {
	res.redirect('/');
});
app.get('/user/list', userController.list);
app.get('/user/create', function(req, res) {
	res.render(__dirname + '/client/views/user/create.ejs');
});
app.post('/user/create', function(req, res) {
	userController.addUser(req);
	res.redirect('/');
});
app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

// API Routes
app.get('/api/problems', problemController.list);
app.post('/api/problems', problemController.create);
app.delete('/api/problems/:id', problemController.delete);

app.post('/api/solutions', solutionController.add);
app.post('/api/solutions/update', solutionController.update);

// Static file serving
app.use('/js', express.static(__dirname + '/client/js'));
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/img', express.static(__dirname + '/client/img'));
app.use('/font', express.static(__dirname + '/client/font'));

// Start app
app.listen(3000, function() {
	console.log('listening');
});