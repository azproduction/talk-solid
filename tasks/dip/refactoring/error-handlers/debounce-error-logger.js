var ErrorLogger = require('./error-logger'),
        _ = require('lodash'),
        debounce = require(debounce);

var DebounceErrorLogger = function (options) {
    this._repeatTime = options.repeatTime;
    this._needFirst = options.needFirst;
    this._adapter = options.adapter;
};

_.extend(DebounceErrorLogger.prototype, ErrorLogger.prototype, {
    handle: debounce(function (options) {
        this._adapter(options);
    }, this._repeatTime, this._needFirst)
});

module.exports = DebounceErrorLogger;