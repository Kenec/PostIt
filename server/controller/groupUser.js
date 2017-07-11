const Member = require("../models").Member;
const Group = require("../models").Group;
const User = require("../models").User;


module.exports = {
  create(req, res) {
    Member.findAll({
      where:{
        userid: req.body.userid,
        groupid: req.params.groupid,
      }
    }).then((result) => {
        if(result.length == 0){
          return Member
            .create({
              userid: req.body.userid,
              groupid: req.params.groupid,
            })
            .then(userGroup => res.status(201).send(userGroup))
            .catch(error => res.status(400).send(error));
        } else{
          res.status(400).send("Duplicate User Error");
        }
    })
  },


};
