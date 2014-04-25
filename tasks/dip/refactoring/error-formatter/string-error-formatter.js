var browser = require('../util/browser');

module.exports = function (options) {
    return
        'type: ' + 'handle' +
        '; hostname: ' + location.hostname +
        '; message: ' + options.message +
        '; location: ' + options.file + ':' + options.line + ':' + (options.column || 0) +
        '; browser: ' + browser;
}