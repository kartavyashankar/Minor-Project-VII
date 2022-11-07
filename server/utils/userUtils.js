const groupModel = require("../models/groupModel");

module.exports.addToGroups = async (userId, socket) => {
    try {
        const groups = await groupModel.find({ members: userId });
        for(let i = 0; i<groups.length; i++) {
            socket.join(groups[i].groupId);
        }
    } catch(err) {
        return;
    }
    return;
};