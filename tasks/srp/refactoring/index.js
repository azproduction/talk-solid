var PersonCollection = require('PersonCollection'),
    PersonView = require('PersonView');

(function () {
    var options = {
        model: new PersonCollection(/*...*/),
        logger: console
    };
    var view = new PersonView(options);
})();
