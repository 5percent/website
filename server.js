// system
var express = require('express');
var app = express();

// custom
var routers = require('./routers');

app.use(express.static(__dirname + '/public'));

app.get('/', routers.home);
app.get('/games/snake', routers.snake);
app.get('/games/tetris', routers.tetris);
app.get('/tools/cal', routers.calDay);

var server = app.listen(80);
