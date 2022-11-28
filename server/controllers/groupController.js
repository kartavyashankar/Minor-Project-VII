const Group = require("../models/groupModel");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.addGroup = async (req, res, next) => {
    try {
        let groupName = req.body.groupName;
        const checkGroup = await Group.findOne({ groupName: groupName });
        if(checkGroup) {
            return res.status(405).json({ message: `Group with name '${groupName}' already exists` });
        }
        let members = req.body.members;
        let groupId = await bcrypt.hash(groupName + Date.now(), 10);
        const createdGroup = await Group.create({
            groupId,
            groupName,
            members
        });
        return res.status(200).json({ message: "Group Created Successfully!", group: {
            groupId: createdGroup.groupId,
            groupName: createdGroup.groupName,
            members: createdGroup.members
        } });
    } catch(err) {
        next(err);
    }

};

module.exports.quitGroup = async (req, res, next) => {
    try {
        const givenGroup = await Group.findOne({ groupId: req.body.groupId });
        if(!givenGroup) {
            return res.status(404).json({ message: "Group not found" });
        }
        if(givenGroup.members.indexOf(req.body.username) < 0) {
            return res.status(401).json({ message: "You are not a member of the Group" });
        }
        let newMembers = givenGroup.members;
        let idx = newMembers.indexOf(req.body.username);
        newMembers.splice(idx, 1);
        const updatedGroup = await Group.updateOne({ groupId: req.body.groupId }, { $set: { members: newMembers } });
        return res.status(200).json({ message: "Group Left Successfully" });
    } catch(err) {
        next(err);
    }
};

module.exports.searchUser = async (req, res, next) => {
    try {
      let regExp = new RegExp(`[^\n]*${req.query.search}[^\n]*`);
      let userList = await User.find({ username: { $ne: req.query.username, $regex: regExp, $options: "i" } }).select([
        "email",
        "username",
        "avatarImage",
        "_id"
      ]);
      return res.status(200).json({ users: userList });
    } catch(err) {
      next(err);
    }
  };