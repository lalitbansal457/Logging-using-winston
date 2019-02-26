var http = require('http');
var path = require('path');
var express = require('express');
var app = express();

var logger = require('./config/winston');
var winston = require('winston');
var appRoot = require('app-root-path');

//var morgan = require('morgan');
//app.use(morgan('combined', { stream: winston.stream }));



const options = {
  from: new Date() - (24 * 60 * 60 * 1000),
  until: new Date(),
  limit: 10,
  start: 0,
  order: 'desc',
  fields: ['message']
};

// Find items logged between today and yesterday.
logger.query(options, function (err, results) {
  if (err) {
    throw err;
  }

  //console.log(results);
});


app.listen(8000);


app.post('/cep/:apiKey/:name', function(request, response){
  //Adding dynamic filename
  const files = new winston.transports.File({ filename: `${appRoot}/logs/${request.params.apiKey}/${request.params.name}.log` });
})




