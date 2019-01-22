const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');

require('dotenv').config();

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin',  '*');
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());

if (process.env.NODE_ENV === 'prod') {
	app.use(express.static(path.join(__dirname, "../client/build")));
	app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
	});
}

app.use(cookieParser());
app.use('/api/photo', express.static('./public'));

app.use('/api/user', require('./router/user'));
app.use('/api/profile', require('./router/settings'));
app.use('/api/create_base', require('./router/create_base'));
app.use('/api/drop_base', require('./router/drop_base'));
app.use('/api/save_movies', require('./router/save_movies'));
app.use('/api/auth', require('./router/auth'));
app.use('/api/get_data', require('./router/get_data'));
app.use('/api/signin', require('./router/signin'));
app.use('/api/signup', require('./router/signup'));
app.use('/api/logout', require('./router/logout'));
app.use('/api/checklog', require('./router/checklog'));
app.use('/api/comments', require('./router/comments'));
app.use('/api/resetpassword', require('./router/resetpassword'));
app.use('/api/emailvalidation', require('./router/emailvalidation'));
app.use('/tools', express.static('./tools'));
app.use('/play', require('./router/play'));
app.use('/tmp', express.static('tmp'))

app.listen(process.env.PORT_BACK, () => {
	console.log(`Listening on port ${process.env.PORT_BACK}`);
})
