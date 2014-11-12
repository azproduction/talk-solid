function Person(options) {
    options = options || {};
    this.setName(options.name);
    this.setUrl(options.url);
}

Person.prototype = {
    setName: function (name) {
        this.name = name;
    },

    setUrl: function (url) {
        this.url = url;
    }
};

module.export = Person;
