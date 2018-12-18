const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').config()
app.set('views', 'public/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/tools', express.static('./public/tools'));

app.use('/', require('./router/movies'));
app.use('/play', require('./router/play'));
app.use('/tmp', express.static('tmp'))

app.listen(3000, function () {
	console.log('Listening on port 3000');
})
