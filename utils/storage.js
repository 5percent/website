const Mongo = require("mongoskin");

var Storage = {
    _db      : null,
    init() {
        if (this._db) {
            return false;
        }

        this._db = Mongo.db("mongodb://127.0.0.1:27017/cc");
    },

    readOne(collection_name, query) {
        if(!this._db){
            this.init();
        }
        
        return callback => {
            let collection = this._db.bind(collection_name);
            collection.find(query, {
                limit: 1,
                sort: {'date': -1}
            }).toArray((err,docs) => {
                callback(err, docs);
                this._db.close();
            });
        };
    },

    read(collection_name, query) {
        if(!this._db){
            this.init();
        }

        return callback => {
            let collection = this._db.collection(collection_name);
            collection.find(query).toArray((err,docs) => {
                callback(err, docs);
                this._db.close();
            });
        }
    },

    write(collection_name, data) {
        if(!this._db){
            this.init();
        }

        return callback => {
            let collection = this._db.collection(collection_name);
            collection.insert(data, {w: 1}, (err, result) => {
                callback(err, result);
                this._db.close();
            });
        };
    },

    update(collection_name, obj, data) {
        if(!this._db){
            this.init();
        }

        return callback => {
            var collection = this._db.collection(collection_name);
            collection.update({_id:obj._id}, {$set: data}, null, (err, result) => {
                callback(err, result);
                this._db.close();
            });
        };
    }
};


module.exports = Storage;
