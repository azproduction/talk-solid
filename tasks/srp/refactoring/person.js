function Person(options) {
    options = options || {};
    this.name = options.name;
    this.url = options.url;

    this.$el = this.render();
    this.bindEvents();
    this.$el.appendTo('.header');
}

Person.prototype = {
    render: function () {
        var extraClass = this.isSameOrigin(this.url) ? ' b-person_origin_same' : '';
        return $('<a href="' + this.url + '" class="b-person' + extraClass + '">' + this.name + '</a>');
    },

    isSameOrigin: function (url) {
        var parser = document.createElement('a');
        parser.href = url;

        return location.origin === parser.origin;
    },

    setName: function (name) {
        this.name = name;
        this.$el.html(this.name);
    },

    setUrl: function (url) {
        this.url = url;
        this.$el.attr('href', this.url);
        this.$el.toggleClass('b-person_origin_same', this.isSameOrigin(this.url));
    },

    bindEvents: function () {
        this.$el.on('click', function () {
            yaCounter100500.params('user_page_visited');
            console.log('debug', 'user_page_visited');
        });
    }
};
