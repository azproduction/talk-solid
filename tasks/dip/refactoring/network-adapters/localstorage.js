function isAvailableLocalStorage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

module.exports = function (formatter) {
    var noop = function () {
    };
    return isAvailableLocalStorage() ? function (options) {
        var data = formatter(options);
        localStorage["log" + (+new Date())] = data;
    } : noop;
}
