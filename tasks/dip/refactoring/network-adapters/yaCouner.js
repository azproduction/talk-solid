module.exports = function (counter, formatter) {
    return function (options) {
        var data = formatter(options);

        counter.params(
            data.type,
            data.hostname,
            data.message,
            data.location,
            data.browser
        );
    }
}