import * as winston from 'winston'
import { createLogger, format, transports } from 'winston'
 
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


