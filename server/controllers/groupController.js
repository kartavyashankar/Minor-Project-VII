const Group = require("../models/groupModel");
const bcrypt = require("bcrypt");

module.exports.addGroup = async (req, res, next) => {
    try {
        let groupName = req.body.groupName;
        let members = req.body.members;
        let groupId = await bcrypt.genSalt(groupName + Date.now(), 10);
        const createdGroup = await Group.create({
            groupId,
            groupName,
            members
        });
        return res.status(200).json({ message: "Group Created Successfully!" });
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
        if(givenGroup.members.indexOf(req.body.userId) < 0) {
            return res.status(401).json({ message: "You are not a member of the Group" });
        }
        let newMembers = givenGroup.members;
        let idx = newMembers.indexOf(userId);
        newMembers.splice(idx, 1);
        const updatedGroup = await Group.updateOne({ groupId: req.body.groupId }, { $set: { members: newMembers } });
        await updatedGroup.save();
        return res.status(200).json({ message: "Group Left Successfully" });
    } catch(err) {
        next(err);
    }
};

module.exports.searchUser = (req, res, next) => {
    try {
      let regExp = new RegExp(`[^\n]*${req.params.search}[^\n]*`);
      let userList = User.find({ username: { $ne: req.params.username, $regex: regExp, $options: "i" } }).select([
        "email",
        "username",
        "avatarImage",
        "_id"
      ]);
      return res.status(200).json(userList);
    } catch(err) {
      next(err);
    }
  };