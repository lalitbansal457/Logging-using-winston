var appRoot = require('app-root-path');
var winston = require('winston');
var {format} = require('winston');


var options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true,
    /*format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        //
        // The simple format outputs
        // `${level}: ${message} ${[Object with everything else]}`
        //
        //format.simple()
        //
        // Alternatively you could use this custom printf format if you
        // want to control where the timestamp comes in your final message.
        // Try replacing `format.simple()` above with this:
        //
         format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
      ),*/
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

//console.log(winston.transports.File)
var logger = new winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false, // do not exit on handled exceptions
});


logger.stream = {
  write: function(message, encoding) {
    //logger.info(message);
  },
};


module.exports = logger;