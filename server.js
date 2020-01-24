const express = require('express');
const request = require('request');
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/flights', function(req, res) {
	const urlApi = `https://api.flightstats.com/flex/schedules/rest/v1/json/from/SVO/departing/${req.query.year}/${req.query.month}/${req.query.day}/${req.query.hour}?appId=81a98f60&appKey=f3226e6677a30c331e413b552ddef8cf`;
	var url = urlApi;
	req.pipe(request(url)).pipe(res);
});

app.listen(3001, 'localhost')