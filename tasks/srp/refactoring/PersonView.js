var Backbone = require('Backbone'),
    rivets = require('rivets'),
    yaCounter100500 = require('yaCounter100500');

var PersonView = Backbone.View.extend({

    events: {
        "click .b-person": "handleClick"
    },

    className: "header",

    initialize: function(options) {
        var viewModel = {
            model: options.model
        };
        this.logger = options.logger;
        this.dataBindTo(viewModel);
    },

    dataBindTo: function (viewModel) {
        return rivets.bind(this.el, viewModel);
    },

    handleClick: function () {
        yaCounter100500.params('user_page_visited');
        this.logger.log('debug', 'user_page_visited');
    }
});

module.export = PersonView;