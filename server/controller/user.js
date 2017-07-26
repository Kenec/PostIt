import { User } from '../models';
import jwt from 'jsonwebtoken';
import md5 from 'md5';

export default {
  create(req, res) {
    return User
      .create({
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password)
      })
      .then(user => res.status(201).json({
        message: 'User Created successfully',
        success:true,
        username: user.username,
        email: user.email
      }))
      .catch(error => res.status(400).json({
        message: 'Account Already Exists!',
        success: false
      }));
  },
  list(req, res) {
      User
        .findAll({
          where: {
            username: [req.body.username],
            password: md5(req.body.password)
          }
        })
        .then((user) => {
          if (user[0]) {
            // create an authToken for the user
            const token = jwt.sign({
              data: user[0].id
            }, "kenechukwu", { expiresIn: "2h" });

            res
              .status(202)
              .send({
                token,
                message: `${user[0].id} has successfully logged in`,
                username: `${user[0].username}`,
                success:true,
              });
            return;
          }

          res.status(401)
            .send({
              message: "username not found, please register"
            });
        });
    },
    getAllUsers(req, res) {
      return models.Users
        .findAll()
        .then(users => res.status(200).send(users))
        .catch(error => res.status(400).send(error));
    },

  };
//   list(req, res) {
//     User
//       .findOne({
//         where: {
//           username: req.body.username,
//           password: req.body.password,
//         }
//       })
//       .then((user) => {
//           if(user[0]) {
//             //create an authToken for the user
//             const token = jwt.sign({
//               data: user[0].id
//             }, "kenechukwu", { expiresInMinutes: 1440 });
//
//
//           res
//           .status(202)
//           .send({
//             token:token,
//             message:`${user[0].id} has successfully logged in`
//           });
//           return;
//       }
//
//       res
//       .status(401)
//           .send({
//             message: "username not found, please register"
//           });
//     }),
//   },
//   getAllUsers(req, res) {
//    return User
//      .findAll()
//      .then(users => res.status(200).send(users))
//      .catch(error => res.status(400).send(error));
//  },
// };
