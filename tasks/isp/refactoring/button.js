function notImplemented() {
    throw new Error('Method is not implemented');
}

var IView = {
    bind: function () {
        notImplemented();
    },
    render: function () {
        notImplemented();
    },
    getElement: function () {
        notImplemented();
    }
};
var IButton = Object.extend(IView, {
    onClick: function () {
        notImplemented();
    }
});

function AbstractButton() {
    this.$el = this.render();

    this.bind();
}

AbstractButton.prototype = Object.extend(IButton, {
    bind: function () {
        this.$el.on('click', this.onClick);
    },
    getElement: function () {
        return this.$el;
    }
});

function IconButton(icon) {
    this.icon = icon;

    AbstractButton.apply(this);
}
IconButton.prototype = Object.extend(Object.create(AbstractButton.prototype), {
    getIcon: function () {
        return this.icon;
    },
    render: function () {
        var icon = this.getIcon();
        var $el = $('<button></button>');

        $el.append($('<img/>').attr('src', icon));

        return $el;
    },
    onClick: function (e) {
        this.$el.css('opacity', '0.5');
    }
});

function AnchorButton(label, url) {
    this.label = label;
    this.url = url;

    AbstractButton.apply(this);
}
AnchorButton.prototype = Object.extend(Object.create(AbstractButton.prototype), {
    getUrl: function () {
        return this.url;
    },
    getLabel: function () {
        return this.label;
    },
    render: function () {
        var url = this.getUrl();
        var label = this.getLabel();

        var $el = $('<a href="' + url + '">' + label + '</a>');

        return $el;
    },
    onClick: function (e) {
        this.$el.css('color', 'red');
    }
});
