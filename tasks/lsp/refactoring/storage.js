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

    _bindToEvents: function (req, callback) {
        req.addEventListener('load', function () {
            callback(null, req);
        }, false);
        req.addEventListener('error', callback, false);
        req.addEventListener('abort', callback, false);
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

        this._bindToEvents(req, callback)

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

    _getLocalVariable: function (id) {
        return window[this.storageName][this.storagePrefix + id];
    },

    _setLocalVariable: function (id, value) {
        return window[this.storageName][this.storagePrefix + id] = JSON.serialize({ responseText: value });
    },

    _deleteLocalVariable: function (id) {
        return delete window[this.storageName][this.storagePrefix + id];
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
        if (action === 'create' || action === 'update') {
            callback(null, this._setLocalVariable(options.query.id, options.body.value));
        }

        if (action === 'read') {
            callback(null, this._getLocalVariable(options.query.id));
        }

        if (action === 'delete') {
            callback(null, this._deleteLocalVariable(options.query.id));
        }
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
});

