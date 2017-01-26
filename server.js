// system
const express = require('express');
const path = require('path');
const app = express();

app.use('/static/', express.static(path.join(__dirname + '/dist/static')));

// custom
const routers = require('./routers');

app.get('/', routers.home);
app.get('/games/snake', routers.snake);
app.get('/games/tetris', routers.tetris);
app.get('/tools/cal', routers.calDay);

const server = app.listen(80);
