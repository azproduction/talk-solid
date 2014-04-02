function Person(options) {
    options = options || {};
    this.name = options.name;
    this.url = options.url;
    this._wrapper = options.wrapper || '.header';

    this._buildHTML();
    this.bindEvents();
    this._initEvents();
}

Person.prototype = {
    /**
     * Построить HTML элемента
     * @returns {*|jQuery|HTMLElement}
     */
    render: function () {
        return $('<a href="' + this.url + '" class="b-person' + this._buildExtraClass() + '">' + this.name + '</a>');
    },

    /**
     * Проверка переданного url на соответствие текущему
     * @param {string} url
     * @returns {boolean}
     */
    isSameOrigin: function (url) {
        return location.origin === url;
    },

    /**
     * Выставление имени элемента
     * @param {string} name
     */
    setName: function (name) {
        this.set('name', name);
    },

    setUrl: function (url) {
        if (/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(url)) {
            this.set('url', url);
        } else {
            this.trigger('error', 'wrong url');
        }
    },

    bindEvents: function () {
        this.$el.on('click', function () {
            this.trigger('element-clicked')
        }, this);
    },


    // Новые методы

    _initEvents: function () {
        this.on('change:name', function (){
            this.$el.html(this.name);
        });
        this.on('change:url', function (){
            this.$el.attr('href', this.url);
            this.$el.toggleClass('b-person_origin_same', this.isSameOrigin(this.url));
        });

        this.on('element-clicked', function () {
            yaCounter100500.params('user_page_visited');
            this.debug('debug', 'user_page_visited');
        });

        this.on('error', function (msg) {
            console.error(msg);
        });

        this.on('debug', function (msg) {
            console.debug(msg);
        });
    },

    set: function(field, value) {
        this[field] = value;
        this.trigger('change:' + field);
    },

    // Здесь будет функция trigger или возьмём Backbone

    _buildExtraClass: function () {
        return this.isSameOrigin(this.url) ? ' b-person_origin_same' : ''
    },

    _buildHTML: function (){
        this.$el = this.render();
        this.$el.appendTo(this._wrapper);
    }

};
