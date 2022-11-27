const groupModel = require("../models/groupModel");
const bcrypt = require("bcrypt");

module.exports.addToGroups = async (userId, socket) => {
    try {
        const groups = await groupModel.find({ members: userId });
        const rooms = [];
        for(let i = 0; i<groups.length; i++) {
            rooms.push(groups[i].groupId);
        }
        socket.join(rooms);
    } catch(err) {
        return;
    }
    return;
};

module.exports.leaveGroups = (socket) => {
    try {
        const rooms = socket.rooms;
        for(let i = 0; i<rooms.length; i++) {
            socket.leave(rooms[i]);
        }
    } catch(err) {
        return;
    }
    return;
}