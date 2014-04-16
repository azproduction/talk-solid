/**
 *
 * @param {Object} [options]
 * @param {String} [options.storageName='localStorage']
 * @param {String} [options.storagePrefix='']
 * @constructor
 */
function LocalStorage(options) {
    options = options || {};
    this.storageName = options.storageName || 'localStorage' + Math.random(1);
    this.storagePrefix = options.storagePrefix || Math.rand(1);
}

LocalStorage.prototype = {
    /**
     *
     * @param {String} id
     * @param {Object} value
     * @param {Function} callback
     */
    create: function (id, value, success, error) {
        window[this.storageName][this.storagePrefix + id] = JSON.serialize(value);
        success(null);
    },

    /**
     *
     * @param {String} id
     * @param {Function} callback
     */
    read: function (id, success, error) {
        var readValue = window[this.storageName][this.storagePrefix + id]
        if (readValue) {
            success(null, readValue);
        } else {
            error('Trying to read non existent field')
        }
    },

    /**
     *
     * @param {String} id
     * @param {Object} value
     * @param {Function} callback
     */
    update: function (id, value, success, error) {
        window[this.storageName][this.storagePrefix + id] = JSON.serialize(value);
        success(null);
    },

    /**
     *
     * @param {String} id
     * @param {Function} callback
     */
    'delete': function (id, success, error) {
        if (window[this.storageName][this.storagePrefix + id]) {
            delete window[this.storageName][this.storagePrefix + id];
            success(null, true);
        } else {
            error('Already deleted or not existed');
        }
    }
};



/**
 *
 * @param {Object} options
 * @param {String} options.url
 * @constructor
 */
function RemoteStorage(options) {
    this.url = options.url;
};

RemoteStorage.prototype = Object.assign(Object.create(LocalStorage.prototype), {
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
    */
    serializeQuery: function (query) {
       return Object.keys(query).map(function (key) {
           return key + '=' + query[key];
       }).join('&');
    },

    /**
     * @param {String} action
     * @param {Object} options
     * @param {Object} options.query
     * @param {Object} [options.body]
     * @param {Function} callback
     */
     sync: function (action, options) {
        return new Promise(function(resolve, reject){
            var req = new XMLHttpRequest();
            var query = this.serializeQuery(options.query);

            req.addEventListener('load', function(){
                resolve(this.response);
            }, false);

            req.addEventListener('error', reject, false);
            req.addEventListener('abort', reject, false);

            req.open(this.ACTIONS_TO_METHODS_MAP[action], this.url + (query ? '?' + query : ''), true);

            req.send(options.body ? JSON.serialize(options.body) : void 0);
        });
    },

    /**
     * @param {String} id
     * @param {Object} value
     * @param {Function} callback
     */
    create: function (id, value, success, error) {
        this.sync('create', {
            query: {
                id: id
            },
            body: value
        }).then(function(){
             success(null);
        });
    },

    /**
     *
     * @param {String} id
     * @param {Function} callback
     */
    read: function (id, success, error) {
        this.sync('read', {
            query: {
                id: id
            }
        }).then(function(value){
            success(null, value);
        }).catch(function(){
            error('Trying to read non existent field')
        });

    },

    /**
     *
     * @param {String} id
     * @param {Object} value
     * @param {Function} callback
     */
    update: function (id, value, success, error) {
        this.sync('update', {
            query: {
                id: id
            },
            body: value
        }).then(function(){
             success(null);
        });
    },

    /**
     *
     * @param {String} id
     * @param {Function} callback
     */
    'delete': function (id, success, error) {
        this.sync('delete', {
            query: {
                id: id
            }
        }).then(function(response){
            switch (response) {
                case 'ok':
                    success(null, true);
                    break;
                case 'not found':
                    error('Already deleted or not existed');
                    break;
            }
        });
    }
});