var isSameOrigin = function (url) {
    var parser = document.createElement('a');
    parser.href = url;

    return location.origin === parser.origin;
};

var Logger = {
    log: function (msg) {
        //yaCounter100500.params(msg);
        console.log('debug', msg);
    }
};

var PersonModel = Backbone.Model.extend({});

var PersonView = Backbone.View.extend({
    initialize: function (o) {
        this.listenTo(this.model, 'change:name', this._onNameChange);
        this.listenTo(this.model, 'change:url', this._onUrlChange);
        
        this.template = o.template;
        this.logger = o.logger
    },

    events: {
        'click a': '_onLinkClick'
    },

    _onNameChange: function () {
        this.render();
    },

    _onUrlChange: function () {
        this.render();
    },

    _onLinkClick: function (e) {
        this.logger.log('user_page_visited');
        e.preventDefault();
    },

    render: function() {
        this.$el.html(this.template({
            data: this.model.attributes,
            isSameOrigin: isSameOrigin
        }));
        return this;
    }
});
