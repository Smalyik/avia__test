const express = require('express');
const request = require('request');
const cors = require('cors')
const bodyParser = require('body-parser');


function server() {
	const app = express();
	app.use(cors())
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	app.use('/flights', function(req, res) {
		const fromOrTo = req.query.flightType === 'departing' ? 'from' : 'to'
		const urlApi = `https://api.flightstats.com/flex/schedules/rest/v1/json/${fromOrTo}/${req.query.airport}/${req.query.flightType}/${req.query.year}/${req.query.month}/${req.query.day}/${req.query.hour}?appId=81a98f60&appKey=f3226e6677a30c331e413b552ddef8cf`;
		var url = urlApi;
		req.pipe(request(url)).pipe(res);
	});

	app.listen(3001, 'localhost')
}

exports.server = server
