var PersonCollection = require('PersonCollection'),
    PersonView = require('PersonView')

module.export = function () {
    var options = {
        model: new PersonCollection(/*...*/),
        logger: console
    };
    var view = new PersonView(options);
};
