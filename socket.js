const Moment = require('moment');
const Co = require('co');

const Storage = require('./utils/storage');

let initSocket = function (io) {
    io.on('connection', socket => {
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

        socket.on('writeNote', data => {
            Co(function* () {
                yield Storage.write('notes', {
                    text: data.text,
                    date: Moment().format('YYYY-MM-DD HH:mm:ss')
                });
                socket.emit('writeNoteDone');
            }).catch((e)=> {
                socket.emit('writeNoteFailed');
                errorHandler(e);
            });
        });

        socket.on('getNotes', data => {
            Co(function* () {
                let notes = yield Storage.read('notes', {}, {
                    pn: data.pn,
                    ps: data.ps,
                    sort: {'_id': -1}
                });
                socket.emit('pushNotes', notes);

                if (notes.length < data.ps) {
                    socket.emit('noMoreNotes', 'true');
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