const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');

require('dotenv').config();
app.set('views', 'public/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

if (process.env.NODE_ENV === 'prod') {
	app.use(express.static(path.join(__dirname, "../client/build")));
	app.get('/', (req, res)=>{
		res.sendFile(path.join(__dirname, "../client/build", "index.html"));
	})
}

app.use('/api/photo', express.static('./public'));

app.use('/api/create_base', require('./router/create_base'));
app.use('/api/drop_base', require('./router/drop_base'));
app.use('/api/save_movies', require('./router/save_movies'));
app.use('/api/scraper/yts', require('./router/scraper/yts_api'));
app.use('/api/scraper/popcorn', require('./router/scraper/popcorn_api'));
app.use('/api/scraper/regroup', require('./router/scraper/regroup_movies'));
app.use('/api/auth', require('./router/auth'));
app.use('/api/get_data', require('./router/get_data'));
app.use('/api/signin', require('./router/signin'));
app.use('/api/signup', require('./router/signup'));
app.use('/api/resetpassword', require('./router/resetpassword'));
app.use('/api/emailvalidation', require('./router/emailvalidation'));

app.use('/tools', express.static('./tools'));
app.use('/play', require('./router/play'));
app.use('/tmp', express.static('tmp'))

app.listen(3000, () => {
	console.log('Listening on port 3000');
})
