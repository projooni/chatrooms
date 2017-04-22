/**
 * Created by projo on 2017-04-23.
 */
var soketio = require('socket.io');
var io;
var guestNumber = 1;
var nickNames = {};
var namesUsed = [];
var currentRoom = {};

exports.listen = function(server){
    io = socketio.listen(server);
    io.set('log lovel', 1);

    io.sockets.on('connection', function(socket){
        guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
        joinRoom(socket, 'Lobby'); // 사용자가 접속하면 대기실로 이동

        handleMessageBroadcasting(socket, nickNames);
        handleNameChangeAttempts(socket, nickNames, namesUsed);
        handleRoomJoining(socket);

        socket.on('room', function(){
            socket.emit('room', io.sockets.manager.rooms);
        });

        handleClientDisconnection(socket, nickNames, namesUsed);

    });
};