const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').config();
app.set('views', 'public/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/create_base', require('./router/create_base'));
app.use('/api/drop_base', require('./router/drop_base'));
app.use('/api/save_movies', require('./router/save_movies'));
app.use('/api/scraper/yts', require('./router/scraper/yts_api'));
app.use('/api/scraper/popcorn', require('./router/scraper/popcorn_api'));
app.use('/api/scraper/regroup', require('./router/scraper/regroup_movies'));

app.use('/tools', express.static('./public/tools'));

app.use('/api/signup', require('./router/signup'))

app.use('/', require('./router/movies'));
app.use('/play', require('./router/play'));
app.use('/tmp', express.static('tmp'))

app.listen(3000, function () {
	console.log('Listening on port 3000');
})
