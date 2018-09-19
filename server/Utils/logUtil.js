const log4js = require('log4js');
log4js.configure({
    appenders: {
        cheese: {
            type: "datefile",
            filename: __dirname + '/logs/logger',
            pattern: '-yyyy-MM-dd-hh.log',
        }
    },
    categories: {
        default: {
            appenders: ['cheese'],
            level: 'INFO'
        }
    }
});
const logger = log4js.getLogger('cheese');
class LogUtil {};

LogUtil.trace = (value) => {
    if (value) {
        logger.trace(value);
    }

}
LogUtil.debug = (value) => {
    if (value) {
        logger.debug(value);
    }
}
LogUtil.error = (value) => {
    if (value) {
        logger.error(value);
    }
}

module.exports = LogUtil