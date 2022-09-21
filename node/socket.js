const Moment = require('moment');
const Storage = require('./storage');

const initSocket = function (io) {
  io.on('connection', socket => {
    socket.on('getPhotos', async data => {
      try {
        let photos = await Storage.read('photos', {}, {
            pn: data.pn,
            ps: data.ps,
            sort: {'_id': -1}
        });
        socket.emit('pushPhotos', photos);

        if (photos.length < data.ps) {
            socket.emit('noMorePhotos', 'true');
        }
      } catch(e) {
        errorHandler(e);
      }
    });

    socket.on('writeNote', async data => {
      try {
        await Storage.write('notes', {
          text: data.text,
          date: Moment().format('YYYY-MM-DD HH:mm:ss')
        });
        socket.emit('writeNoteDone');
      } catch (e) {
        socket.emit('writeNoteFailed');
        errorHandler(e);
      };
    });

    socket.on('getNotes', async data => {
      try {
        let notes = await Storage.read('notes', {}, {
          pn: data.pn,
          ps: data.ps,
          sort: {'_id': -1}
        });

        socket.emit('pushNotes', notes);

        if (notes.length < data.ps) {
            socket.emit('noMoreNotes', 'true');
        }
      } catch (e) {
        errorHandler(e);
      }
    });
  });
};

let errorHandler = function (e) {
    console.log('=========' + new Date().toString() + '==========');
    console.log(e);
};

module.exports = initSocket;