[![Build Status](https://travis-ci.org/Kenec/PostIt.svg?branch=master)](https://travis-ci.org/Kenec/PostIt)
[![Coverage Status](https://coveralls.io/repos/github/Kenec/PostIt/badge.svg?branch=master)](https://coveralls.io/github/Kenec/PostIt?branch=master)
[![Code Climate](https://codeclimate.com/github/Kenec/PostIt/badges/gpa.svg)](https://codeclimate.com/github/Kenec/PostIt)

# PostIt

PostIt is an application that allows an authenticated user create a broadcast group and add members to that group for notifications. A user can post messages to the group belonged to. Messages have priority level of Normal, Urgent and Critical. When a user post a message with priority level of Critical, all users in that group gets in-app, email and SMS notifications. When the message has the priority level of Urgent, all users in the group receive both the in-app and email notification only. Messages posted with priority level of Normal only sends in-app notification to all the users in that group.

## TECHNOLOGIES
* #### Front-end: 
        React/Redux + SASS + Boostrap + Materialize CSS 
* #### System Dependencies: 
        node, axios, moment, express, express-validator, super-test, jsonwebtoken, babel, bcrypt, dotenv, lodash, nexmo, react, redux, sequelize, postgress, underscore, validator, webpack

### INSTALLATION
  * Clone the repo
  * Navigate to the location in your terminal
  * Run $ npm install to install dependencies
  * Setup Postgres, create a database postit and set it to port 5000 [Setup postgress](http://certek.com/kb4/install-server-postgresql-and-pgadmin-on-windows/)
  * Install sequelize-cli, Run $ npm install -g sequelize-cli (note: sudo install on ubuntu or MAC)
  * In terminal run $ sequelize db:migrate
  * Run $ npm start to get the app started on your local machine
  * To run server test run $ npm test
  * To run client test run $ npm jest

### Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Deployment

* Run  `npm run build` to build the project
* Create an account on heroku
* Create a db with ElephantSQL
* Push the file to heroku and set up the enviroment variables in the .env file

### Documentation
The Documentation for the PostIt Restful API: 
[PostIt Restful API Documentation](http://docs.postit4.apiary.io)


## Authors

#### * Nnamani Kenechukwu Charles 

## Acknowledgments

* Andela Talent Accelerator Team

