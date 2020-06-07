const CONFIG = require('./config.json');
process.title = CONFIG.processTitle;

const express = require('express');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'))
app.use('/', routes);

const server = app.listen(CONFIG.bindPortAddress, CONFIG.bindIPAddress, () => {
  console.log(`Express is running on port ${server.address().port}`);
});
