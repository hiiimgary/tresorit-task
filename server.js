const io = require('socket.io')(3000)

var files = [];

io.on('connection', (socket) => {
    socket.on('new-file', data => {
        var file = { name: data, message: {} }
        files.push(file);
    })

    socket.on('new-connection', file => {
        for (var i = 0; i < files.length; i++) {
            if (file == files[i].name) {
                socket.emit('access-file', files[i].message);
                break;
            }
        }
    })

    socket.on('send-message', message => {
        for(var i = 0; i < files.length; i++){
            if(files[i].name == message.filename){
                files[i].message = message;
                break;
            }
        }
        socket.broadcast.emit('broadcast-message', message);
    })
})