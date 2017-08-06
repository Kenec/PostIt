import { Users } from '../models';
import jwt from 'jsonwebtoken';
import md5 from 'md5';
import config from '../config';
import  validateInput  from '../shared/validations/signup';

export default {
  create(req, res) {
    const { errors, isValid } = validateInput(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    }
    return Users
      .create({
        username: req.body.username,
        phone: req.body.phone,
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
      Users
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
              id: user[0].id,
              username: user[0].username
            }, config.jwtSecret, { expiresIn: "2h" });

            res
              .status(202)
              .send({
                token,
                message: 'Successfully logged in',
                username: `${user[0].username}`,
                success:true,
              });
            return;
          }

          res.status(401)
            .send({
              message: "Username not found, please register"
            });
        });
    },
    //Fetch Member by username and return its id
    FetchMemberByName(req, res) {
      return Users
        .findAll({ where: {username : req.body.username } })
        .then((user) => {
          if(user[0]){
            res
              .status(202)
              .send({
                userid: `${user[0].id}`,
                username: `${user[0].username}`,
                phone: `${user[0].phone}`,
                email: `${user[0].email}`,
              });
            return;
          }
          res.status(400).send({
            message: 'User not found',
          });
        })
        .catch((error) => {
          res.status(400).send({
            message: 'User does not exist'
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
