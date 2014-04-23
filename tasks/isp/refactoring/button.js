function notImplemented() {
    throw new Error('Method is not implemented');
}

function AbstractButton(label) {
    this.label = label;
    this.$el = this.render();
}
AbstractButton.prototype = {
    getLabel: function() {
        return this.label;
    },
    render: function () {
        var label = this.getLabel();
        var $el = $('<button></button>');

        if (label) {
            $el.append(label);
        }

        return $el;
    }
};

function clickButton () {
    AbstractButton.call(this, void 0);
    this.bind();
}

clickButton.prototype = Object.extend(Object.create(AbstractButton.prototype), {
    onClick: function (e) {
        notImplemented();
    },
    bind: function () {
        this.$el.click(this.onClick);
    }
})

function IconButton(icon) {
    AbstractButton.call(this, void 0);
    this.icon = icon;
}

IconButton.prototype = Object.extend(Object.create(AbstractButton.prototype), {
    getIcon: function () {
        return this.icon;
    },
    render: function () {
        var $el = AbstractButton.prototype.render.apply(this);
        var icon = this.getIcon();

        if (icon) {
            $el.append($('<img/>').attr('src', icon));
        }

        return $el;
    }
});

function AnchorButton(label, url) {
    AbstractButton.call(this, label);
    this.url = url;
}
AnchorButton.prototype = Object.extend(Object.create(AbstractButton.prototype), {
    getUrl: function () {
        return this.url;
    },
    render: function () {
        var $el = AbstractButton.prototype.render.apply(this);
        var url = this.getUrl();

        if (url) {
            $el.wrap('<a href="' + url + '"></a>');
        }

        return $el;
    }
});
