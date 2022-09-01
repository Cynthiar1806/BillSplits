import * as winston from 'winston'
const { createLogger, format, transports } = require("winston");
const logConfig = winston.format.combine(
    winston.format.timestamp(),
    winston.format.align(),
  );

  const logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
  };

  const options = {
    console: {
      format: logConfig,
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  };

const logConfiguration={
    levels: logLevels,
    format: format.combine(format.timestamp(), format.json()),
    'transports':[
        new winston.transports.File({
            filename:'logs/example.logs'           
        }),
        new winston.transports.Console(options.console),
    ],
    exitOnError:false,
};
const logger=winston.createLogger(logConfiguration);
export default logger;
// logger.log({
//  message: "Hello! I am the log file on 30th aug.",
//     level:"info"
// });
// logger.info('Hello!! I am the log file here!!');

