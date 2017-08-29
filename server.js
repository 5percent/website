// system
const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


// custom
const routers = require('./routers');
const initSocket = require('./socket');

initSocket(io);

app.use('/static/', express.static(path.join(__dirname + '/dist/static')));
app.get('/', routers.home);
app.get('/cc', routers.sg);
app.get('/games/snake', routers.snake);
app.get('/games/tetris', routers.tetris);
app.get('/tools/cal', routers.calDay);
app.get('/invitation', routers.invitation);

server.listen(80);
