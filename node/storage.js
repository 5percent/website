const Mongo = require("mongoskin");

var Storage = {
  _db: null,
  init() {
    if (this._db) {
      return false;
    }

    this._db = Mongo.db("mongodb://127.0.0.1:27017/cc");
  },

  read(collection_name, query, cond) {
    if(!this._db){
      this.init();
    }

    return new Promise((resolve, reject) => {
      let collection = this._db.collection(collection_name);
      let res = collection.find(query, {_id: 0});

      if (cond.sort) {
        res = res.sort(cond.sort);
      }

      if (cond.ps && cond.pn) {
        let index = (cond.pn - 1) * cond.ps;
        res = res.skip(index).limit(cond.ps);
      }

      res.toArray((err, docs) => {
        if (!err && docs) {
          resolve(docs);
        } 
        else {
          reject(err);
        }

        this._db.close();
      });
    });
  },

  write(collection_name, data) {
    if(!this._db){
      this.init();
    }

    return new Promise((resolve, reject) => {
      let collection = this._db.collection(collection_name);
      collection.insert(data, {w: 1}, (err, result) => {
        if (!err && result) {
          resolve(result);
        } 
        else {
          reject(err);
        }

        this._db.close();
      });
    });
  },

  update(collection_name, obj, data) {
    if(!this._db){
      this.init();
    }

    return new Promise((resolve, reject) => {
      let collection = this._db.collection(collection_name);
      collection.update({_id:obj._id}, {$set: data}, null, (err, result) => {
        if (!err && result) {
          resolve(result);
        } 
        else {
          reject(err);
        }

        this._db.close();
      });
    });
  }
};

// Storage.write('photos', {url: ""})( (err, res)=> {console.log(err, res)});
// Storage.read('notes', {}, {pn: 1, ps:1, sort: {'_id': -1}})( (err, res)=> {console.log(err, res)});

module.exports = Storage;
