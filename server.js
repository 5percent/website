// system
const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


// custom
const routers = require('./node/routers');
const initSocket = require('./node/socket');

initSocket(io);

app.use('/static/', express.static(path.join(__dirname + '/dist/static')));
app.use('/photo/', express.static(path.join(__dirname + '/photo')));

app.get('/', routers.home);
app.get('/cc', routers.sg);

server.listen(80);
