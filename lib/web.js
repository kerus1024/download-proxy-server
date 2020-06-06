const CONFIG = require('./config.json');

process.title = CONFIG.processTitle;

const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const request = require('request');
const url = require('url');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
 //       res.status(302).setHeader("Location", "./download");
  res.send('Hello World!');
});

app.get('/download', (req, res) => {

	let targetURL = "http://speed.hetzner.de/1GB.bin";

	request.get({url: targetURL, followAllRedirects: true })
	.on('response', (response) => {

		response
		.on('data', (data) => {
			
		})
		.on('end', () => {
	
		})
		.on('error', (e) => {
			console.error(e);
		});

	})
	.pipe(res);


});

app.listen(CONFIG.bindPortAddress, CONFIG.bindIPAddress, function () {
  console.log(`listening on port ${CONFIG.bindPortAddress}`);
});

