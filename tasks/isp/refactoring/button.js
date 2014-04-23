function notImplemented() {
    throw new Error('Method is not implemented');
}

/**
 * Интерфейс ссылки
 *
 * @param {String} url
 * @param {String} content
 * @constructor
 */
function AbstractLink(url, content) {
    this.url = url;
    this.content = content;
    this.$el = this.render();
}
AbstractLink.prototype = {
    getContent: function() {
        return this.content;
    },
    getUrl: function () {
        return this.url;
    },
    render: function () {
        var url = this.getUrl();
        var content = this.getContent();
        var $el = '';

        if (url) {
            $el = $('<a></a>').attr('href', url);
        } else {
            $el = $('<span></span>');
        }

        if (content) {
            $el.append(content);
        }

        return $el;
    }
};


/**
 * Интерфейс псевдо-ссылки
 *
 * @param {String} content
 * @param {Function} cb
 * @constructor
 */
function AbstractPseudoLink(content, cb) {
    this.content = content;
    this.cb = cb;
    this.$el = this.render();
    this.bind();
}
AbstractPseudoLink.prototype = {
    getContent: function() {
        return this.content;
    },
    onClick: function (e) {
        this.cb(e);
    },
    render: function () {
        var content = this.getContent();
        var $el = $('<span></span>');

        if (content) {
            $el.append(content);
        }

        return $el;
    },
    bind: function () {
        this.$el.click(this.onClick);
    }
};

/**
 * Интерфейс кнопки
 *
 * @param {String} label
 * @constructor
 */
function AbstractButton(label) {
    this.label = label;
    this.$el = this.render();
    this.bind();
}
AbstractButton.prototype = {
    getLabel: function() {
        return this.label;
    },
    getIcon: function () {
        notImplemented();
    },
    onClick: function (e) {
        notImplemented();
    },
    render: function () {
        var icon = this.getIcon();
        var label = this.getLabel();
        var $el = $('<button></button>');

        if (icon) {
            $el.append($('<img/>').attr('src', icon));
        }

        if (label) {
            $el.append(label);
        }

        return $el;
    },
    bind: function () {
        this.$el.click(this.onClick);
    }
};

/**
 * Ссылка
 *
 * @param url
 * @param content
 * @constructor
 */
function Link(url, content) {
    AbstractLink.call(this, url, content);
}

Link.prototype = Object.extend(Object.create(AbstractLink.prototype), {});

/**
 * Псевдо - Ссылка
 *
 * @param url
 * @param content
 * @constructor
 */
function PseudoLink(content, cb) {
    AbstractPseudoLink.call(this, content, cb);
}

PseudoLink.prototype = Object.extend(Object.create(AbstractPseudoLink.prototype), {});

/**
 * Кнопка
 *
 * @param label
 * @constructor
 */
function AnchorButton(label) {
    AbstractButton.call(this, label);
}

AnchorButton.prototype = Object.extend(Object.create(AbstractButton.prototype), {
    // Тут заглушка и да - это плохо (
    getIcon: function () {},
    // Это тоже очень плохо
    onClick: function (e) {}
});