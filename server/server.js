require('dotenv').config();
const express = require('express');
const request = require('request');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.login,
		pass: process.env.pass,
	},
});

function sendEmail(mail) {
	let mailOptions = {
		from: process.env.login,
		to: mail.to,
		subject: mail.subject,
		html: mail.body,
	};
	transporter.sendMail(mailOptions, (err, info) => {
		if (err) {
			console.log(err)
		} else {
			console.log(`Email отправлен: ${info.response}`)
		}
	})
}

function server() {
	const app = express();
	app.use(cors());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	app.use('/flights', function(req, res) {
		const fromOrTo = req.query.flightType === 'departing' ? 'from' : 'to';
		const urlApi = `https://api.flightstats.com/flex/schedules/rest/v1/json/${fromOrTo}/${req.query.airport}/${req.query.flightType}/${req.query.year}/${req.query.month}/${req.query.day}/${req.query.hour}?appId=81a98f60&appKey=f3226e6677a30c331e413b552ddef8cf`;
		req.pipe(request(urlApi)).pipe(res);
	});

	app.use('/sendmail', function(req, res) {
		const mail = {
				to: req.body.email,
				subject: req.body.email,
				body: req.body.html
		}
		console.log(mail)
		sendEmail(mail)		
	});

	app.listen(3001, 'localhost');
}

exports.server = server;
