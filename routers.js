exports.home = function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
}
exports.sg = function (req, res) {
    res.sendFile(__dirname + '/dist/sg.html');
}
exports.snake = function (req, res) {
    res.sendFile(__dirname + '/views/snake.html');
}
exports.tetris = function (req, res) {
    res.sendFile(__dirname + '/views/tetris.html');
}
exports.calDay = function (req, res) {
    res.sendFile(__dirname + '/views/calDay.html');
}
exports.invitation = function (req, res) {
    res.sendFile(__dirname + '/views/invitation.html');
}

