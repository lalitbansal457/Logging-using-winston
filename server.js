var http = require('http');
var path = require('path');
var express = require('express');
var app = express();

var logger = require('./config/winston');
var winston = require('winston');
var appRoot = require('app-root-path');

var {format, label} = require('winston');

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

console.log(logger.format);
app.post('/cep/:apiKey/:name', function(request, response){
  

  // Format logs
  const myFormat = format.printf(({ level, message, label, timestamp }) => {
    console.log(level, message, label, timestamp);
    return `${timestamp} [${label}] ${level}: ${message} abc`;
  });

  //Adding dynamic filename
  const files = new winston.transports.File({ 
    filename: `${appRoot}/logs/${request.params.apiKey}/${request.params.name}.log`,  
    format: format.combine(
    format.label({ label: 'right meow!' }),
    format.timestamp(),
    myFormat
  )
  });

  logger.add(files);
  logger.info("vdsfvfs","bgfb")
})




