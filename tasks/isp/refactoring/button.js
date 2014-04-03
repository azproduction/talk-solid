function notImplemented() {
    throw new Error('Method is not implemented');
}

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
    getUrl: function () {
        notImplemented();
    },
    onClick: function (e) {
        notImplemented();
    },
    render: function () {
        var icon = this.getIcon();
        var url = this.getUrl();
        var label = this.getLabel();
        var $el = $('<button></button>');

        if (icon) {
            $el.append($('<img/>').attr('src', icon));
        }

        if (label) {
            $el.append(label);
        }

        if (url) {
            $el.wrap('<a href="' + url + '"></a>');
        }

        return $el;
    },
    bind: function () {
        this.$el.click(this.onClick);
    }
};

function IconButton(icon) {
    AbstractButton.call(this, void 0);
    this.icon = icon;
}
IconButton.prototype = Object.extend(Object.create(AbstractButton.prototype), {
    getIcon: function () {
        return this.icon;
    },
    getUrl: function () {},
    onClick: function (e) {}
});

function AnchorButton(label, url) {
    AbstractButton.call(this, label);
    this.url = url;
}
AnchorButton.prototype = Object.extend(Object.create(AbstractButton.prototype), {
    getIcon: function () {},
    getUrl: function () {
        return this.url;
    },
    onClick: function (e) {}
});
