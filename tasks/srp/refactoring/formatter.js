var rivets = require('rivets');

_.extend(rivets.formatters, {
    isSameOrigin: function (url) {
        var $parser = $('<a>');
        $parser.attr('href', url);

        return location.origin === $parser.origin;
    }
});