var JUST = require('just');

function Person(options) {
    options = options || {};
    this.name = options.name;
    this.url = options.url;

    this.render();
    this.bindEvents();
}

Person.prototype = {
    render: function () {
        var extraClass = this._getExtraClass();

        this.template = this.getTemplate();

        this.template.render({ name: this.name, url: this.url, extraClass: extraClass });
    },

    _getExtraClass: function () {
        return this.isSameOrigin(this.url) ? ' b-person_origin_same' : '';
    },

    getTemplate: function () {
        if (this.template) {
            return this.template;
        }

        return new JUST({root: {
                page: 'header',
                layout: '<a href="<%= url %>" class="b-person <%= extraClass %>"><%= name %></a>'
            }
        });
    },

    isSameOrigin: function (url) {
        return location.origin === url;
    },

    setName: function (name) {
        this.name = name;
        this.render();
    },

    setUrl: function (url) {
        this.url = url;
        this.render();
    },

    counter: function (params) {
        yaCounter100500.params(params);
    },

    debug: function (name) {
        console.log('debug', name);
    },

    bindEvents: function () {
        this.template.on('click', function () {
            this.counter('user_page_visited');
            this.debug('user_page_visited');
        }, this);
    }
};
