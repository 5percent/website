const Moment = require('moment');
const Co = require('co');

const Storage = require('./utils/storage');

let initSocket = function (io) {
    io.on('connection', socket => {
        socket.emit('news', { hello: 'world' });
        socket.on('my other event', data => {
            console.log(data);
        });

        socket.on('getPhotos', data => {
            Co(function* () {
                let photos = yield Storage.read('photos', {}, {
                    pn: data.pn,
                    ps: data.ps,
                    sort: {'_id': -1}
                });
                socket.emit('pushPhotos', photos);

                if (photos.length < data.ps) {
                    socket.emit('noMorePhotos', 'true');
                }
                
            }).catch(errorHandler);

        });
    });
};

let errorHandler = function (e) {
    console.log('=========' + new Date().toString() + '==========');
    console.log(e);
};

module.exports = initSocket;