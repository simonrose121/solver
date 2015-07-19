var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	expressSession = require('express-session'),
	mongoose = require('mongoose'),
	problemController = require('./server/controllers/problem-controller.js'),
	solutionController = require('./server/controllers/solution-controller.js'),
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
	// find username and verify password in database
	if (username == password) {
		done(null, { _id: username, name: username });
	} else {
		done(null, null);
	}
}));

passport.serializeUser(function(user, done) {
	done(null, user._id);
});

passport.deserializeUser(function(_id, done) {
	// query database or cache
	done(null, { _id: _id, name: _id });
});

app.set('view engine', 'ejs');

// Routes
app.get('/', function(req, res) {
	res.render(__dirname + '/client/views/index.ejs', {
		isAuthenticated: req.isAuthenticated(),
		user: req.user
	});
});

app.get('/login', function(req, res) {
	res.render(__dirname + '/client/views/login.ejs');
});

app.post('/login', passport.authenticate('local'), function(req, res) {
	res.redirect('/');
});

// Static file serving
app.use('/js', express.static(__dirname + '/client/js'));
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/img', express.static(__dirname + '/client/img'));
app.use('/font', express.static(__dirname + '/client/font'));

// API Routes
app.get('/api/problems', problemController.list);
app.post('/api/problems', problemController.create);
app.delete('/api/problems/:id', problemController.delete);

app.post('/api/solutions', solutionController.add);
app.post('/api/solutions/update', solutionController.update);

// Start app
app.listen(3000, function() {
	console.log('listening');
});