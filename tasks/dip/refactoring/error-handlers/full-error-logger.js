var ErrorLogger = require('./error-logger'),
    _ = require('lodash');

var FullErrorLogger = function (options) {
    this._adapter = options.adapter;
}

_.extend(FullErrorLogger.prototype, ErrorLogger.prototype, { handle: adapter })

module.exports = FullErrorLogger;
