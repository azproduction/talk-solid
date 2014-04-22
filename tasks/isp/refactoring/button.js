function notImplemented() {
    throw new Error('Method is not implemented');
}

function AbstractButton(options) {
    this.label = options.label;
    this.$el = this.render();
    this.bind();
}
AbstractButton.prototype = {
    getLabel: function() {
        return this.label;
    },
    onClick: function (e) {},
    render: function () {
        var label = this.getLabel();
        var $el = $('<button></button>');

        if (label) {
            $el.append(label);
        }

        return $el;
    },
    bind: function () {
        this.$el.click(this.onClick);
    }
};

function IconButton(options) {
    AbstractButton.call(this, options);
    this.icon = options.icon;
}
IconButton.prototype = Object.extend(Object.create(AbstractButton.prototype), {
    getIcon: function () {
        return this.icon;
    },
    onClick: function (e) {
        // some logic
    },
    render: function () {
        var icon = this.getIcon(),
            $el = IconButton.prototype.render.call(this);

        if (icon) {
            $el.append($('<img/>').attr('src', icon));
        }

        return $el;
    }
});

function AnchorButton(options) {
    AbstractButton.call(this, options);
    this.url = options.url || '#';
}
AnchorButton.prototype = Object.extend(Object.create(AbstractButton.prototype), {
    getUrl: function () {
        return this.url;
    },
    onClick: function (e) {
        // some logic
    },
    render: function () {
        var label = this.getLabel();
        var $el = $('<a href="' + this.getUrl() + '"></a>');

        if (label) {
            $el.append(label);
        }

        return $el;
    }
});
