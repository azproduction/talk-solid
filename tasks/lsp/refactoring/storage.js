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
    ACTIONS_TO_METHODS_MAP: {
        'create': 'POST',
        'read': 'GET',
        'update': 'PUT',
        'delete': 'DELETE'
    },

    /**
     *
     * @param {Object} query
     * @returns {string}
     * @private
     */
    _buildUrl: function (query) {
        var queryString = Object.keys(query).map(function (key) {
            return key + '=' + query[key];
        }).join('&');

        return this.url + (queryString ? '?' + queryString : '');
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
        if (!this._isActionAvailable(action)) {
            throw new Error('UnsupportedMethodException'); // java <3
        }

        var self = this,
            req = new XMLHttpRequest();

        req.addEventListener('load', function () {
            var res = self._parseRequest(req, action);
            callback(null, res);
        }, false);

        req.addEventListener('error', function (error) {
            console.log(arguments);
            callback('error', {
                error_msg: 'error!!!'
            });
        }, false);

        req.addEventListener('abort', function (error) {
            callback('error', {
                error_msg: 'abort!!!'
            });
        }, false);

        req.open(this.ACTIONS_TO_METHODS_MAP[action], this._buildUrl(options.query), true);

        req.send(JSON.stringify(options.body));
    },

    /**
     * @param {XMLHttpRequest} req
     * @param {String} action
     * @private
     */
    _parseRequest: function (req, action) {
        return action === 'GET' ?
            {value: JSON.parse(req.responseText)} :
            {success: req.status === 200};
    },

    /**
     * @param {String} action
     * @protected
     */
    _isActionAvailable: function (action) {
        return typeof this.ACTIONS_TO_METHODS_MAP[action] !== 'undefined';
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
     * @param {String} action
     * @param {Object} options
     * @param {Object} options.query
     * @param {Object} [options.body]
     * @param {Function} callback
     */
    sync: function (action, options, callback) {
        if (!this._isActionAvailable(action)) {
            throw new Error('UnsupportedMethodException'); // java <3
        }

        try {
            switch (action) {
                case 'create':
                case 'update':
                    window[this.storageName][this.storagePrefix + id] = JSON.stringify(value);
                    callback(null, {
                        success: true
                    });
                    break;
                case 'delete':
                    callback(null, {
                        success: delete window[this.storageName][this.storagePrefix + id]
                    });
                    break;
                case 'read':
                    callback(null, {
                        value: window[this.storageName][this.storagePrefix + id]
                    });
                    break;
            }
        }
        catch(e) {
            callback('error', {
                error_msg: e.message
            });
        }
    }
});
