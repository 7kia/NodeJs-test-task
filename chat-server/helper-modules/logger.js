import {createLogger, format, transports} from "winston";

/** @type {Date} */
const LOG_FORMAT = ".log";
/** @type {Date} */
const time = new Date();

const logger = createLogger({
    level: 'info',
    format: format.json(),
    transports: [
        new transports.File({ filename: 'error_' + time + LOG_FORMAT, level: 'error' }),
        new transports.Console({ level: 'error' }),
        new transports.File({ filename: 'info_' + time + LOG_FORMAT, level: 'info' }),
        new transports.Console({ level: 'info' }),
    ],
});
export {logger};