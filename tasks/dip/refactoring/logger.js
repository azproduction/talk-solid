var ErrorLogger = require('./error-handlers/debounce-error-logger'),
        repeatTime = 1000,
        needFirst = true,
        formatter = ('./error-formater/object-error-formatter'),
        adapter = require('./network-adapters/yaCounter')(yaCounter12208345, formatter);

module.exports = function () {
    var logger = new ErrorLogger({
        repeatTime: repeatTime,
        needFirst: needFirst,
        adapter: adapter
    });
    window.onerror = function (message, file, line, column) {
        logger.handle({
            message: message,
            file: file,
            line: line,
            column: column
        });
    };
};
