var debounce = require('debounce');

var browser = navigator.userAgent.match(/[a-zA-Z]+\/[0-9.A-F]+/g)
    .filter(function (string) {
        return !/^(AppleWebKit|WebKit|Safari|Gecko|Mozilla)/.test(string);
    })
    .map(function (string) {
        return string.replace(/^Version/, 'Safari');
    })
    .join(' ');

module.exports = function () {
    window.onerror = debounce(function (message, file, line, column) {
        yaCounter12208345.params(
            'error',
            location.hostname,
            message,
            file + ':' + line + ':' + (column || 0),
            browser
        );
    }, 1000, true);
};
