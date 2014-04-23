var ACTIONS_TO_METHODS_MAP = {
    'create': 'POST',
    'read': 'GET',
    'update': 'PUT',
    'delete': 'DELETE'
};

/**
 *
 * @param {Object} options
 * @param {String} options.url
 * @constructor
 */
function RemoteStorage(options) {
    this.url = options.url;
}

RemoteStorage.prototype = {
    /**
     *
     * @param {Object} query
     * @returns {string}
     */
    serializeQuery: function (query) {
        return Object.keys(query).map(function (key) {
            return key + '=' + query[key];
        }).join('&');
    },

    /**
     *
     * @param {String} action
     * @param {Object} options
     * @param {Object} options.query
     * @param {Object} [options.body]
     * @param {Function} callback
     */
    sync: function (action, options, callback) {
        var req = new XMLHttpRequest();
        var query = this.serializeQuery(options.query);

        req.addEventListener('load', function () {
            callback(null, req);
        }, false);
        req.addEventListener('error', callback, false);
        req.addEventListener('abort', callback, false);

        req.open(ACTIONS_TO_METHODS_MAP[action], this.url + (query ? '?' + query : ''), true);

        req.send(options.body ? JSON.serialize(options.body) : void 0);
    },

    /**
     *
     * @param {String} id
     * @param {Object} value
     * @param {Function} callback
     */
    create: function (id, value, callback) {
        this.sync('create', {
            query: {
                id: id
            },
            body: value
        }, callback);
    },

    /**
     *
     * @param {String} id
     * @param {Function} callback
     */
    read: function (id, callback) {
        this.sync('read', {
            query: {
                id: id
            }
        }, callback);
    },

    /**
     *
     * @param {String} id
     * @param {Object} value
     * @param {Function} callback
     */
    update: function (id, value, callback) {
        this.sync('update', {
            query: {
                id: id
            },
            body: value
        }, callback);
    },

    /**
     *
     * @param {String} id
     * @param {Function} callback
     */
    'delete': function (id, callback) {
        this.sync('delete', {
            query: {
                id: id
            }
        }, callback);
    }
};

/**
 *
 * @param {Object} [options]
 * @param {String} [options.storageName='localStorage']
 * @param {String} [options.storagePrefix='']
 * @constructor
 */
function LocalStorage(options) {
    options = options || {};
    this.storageName = options.storageName || 'localStorage';
    this.storagePrefix = options.storagePrefix || '';
}

LocalStorage.prototype = Object.assign(Object.create(RemoteStorage.prototype), {
    /**
     *
     * @param {String} id
     * @param {Object} value
     * @param {Function} callback
     */
    create: function (id, value, callback) {
        window[this.storageName][this.storagePrefix + id] = JSON.serialize(value);
        callback(null);
    },

    /**
     *
     * @param {String} id
     * @param {Function} callback
     */
    read: function (id, callback) {
        callback(null, window[this.storageName][this.storagePrefix + id]);
    },

    /**
     *
     * @param {String} id
     * @param {Object} value
     * @param {Function} callback
     */
    update: function (id, value, callback) {
        window[this.storageName][this.storagePrefix + id] = JSON.serialize(value);
        callback(null);
    },

    /**
     *
     * @param {String} id
     * @param {Function} callback
     */
    'delete': function (id, callback) {
        callback(null, delete window[this.storageName][this.storagePrefix + id]);
    }
});

