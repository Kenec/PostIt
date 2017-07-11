const Message = require("../models").Message;

module.exports = {
  create(req, res) {
    return Message
      .create({
        message: req.body.message,
        priority_level: req.body.priority_level,
        groupid: req.params.groupid,
        sentBy: req.body.sentBy,
      })
      .then(group => res.status(201).send(group))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
  return Group
    .findById(req.params.groupid,{
      include:[{
        model:User,
      }],
    })
    .then(user => {
      if(user.length == 0){
        return res.status(404).send({message: "Member for the Group not found"});
      }
      return res.status(200).send(user);
    })
    .catch(error => res.status(400).send(error));
},
};
