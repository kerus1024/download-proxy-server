const express = require('express');
const cors = require('cors');
const router = express.Router();


const RequestManager = require(process.cwd() + '/lib/ResponseManager');

router.get('/', cors(), (req, res) => {

  res.render('index', {
  });

});

router.get('/download', cors(), (req, res) => {

	RequestManager.MakeProxyResponse(req, res);	

});

module.exports = router;

