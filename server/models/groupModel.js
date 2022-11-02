const mongoose = require("mongoose");

let groupSchema = mongoose.Schema({
    groupId: {
        type: String,
        required: true
    },
    groupName: {
        type: String,
        required: true
    },
    members: {
        type: [String],
        default: []
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false
    },
    avatarImage: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model("Groups", groupSchema);