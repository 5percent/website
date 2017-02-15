let socket = {
    init(io) {
        io.on('connection', socket => {
            console.log('connect success!');
            socket.emit('news', { hello: 'world' });
            socket.on('my other event', data => {
                console.log(data);
            });
        });
    }
};

module.exports = socket;
