var Backbone = require('Backbone'),
    Person = require('Person');

var PersonCollection = Backbone.Collection.extend({
    model: Person
});

module.export = PersonCollection;
