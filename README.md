[![Build Status](https://travis-ci.org/Kenec/PostIt.svg?branch=master)](https://travis-ci.org/Kenec/PostIt)
[![Coverage Status](https://coveralls.io/repos/github/Kenec/PostIt/badge.svg?branch=master)](https://coveralls.io/github/Kenec/PostIt?branch=master)
[![Code Climate](https://codeclimate.com/github/Kenec/PostIt/badges/gpa.svg)](https://codeclimate.com/github/Kenec/PostIt)

# PostIt

PostIt is an application that allows an authenticated user create a broadcast group and add members to that group for notifications. 

Features:
- User can signup and signin to the application
- User can create a new group and be added to other groups
- User can post messages to groups belonged to
- Messages have priority of `Normal`, `Urgent`, `Critical`
- User will receive notifications for messages posted to the groups belonged to 
- Notification can be in-app notification, email and/or SMS based on the message priority

## TECHNOLOGIES
* #### Front-end: 
        React/Redux + SASS + Boostrap + Materialize CSS
* #### Back-end:
        node, axios, moment, express, express-validator, jsonwebtoken, bcrypt, dotenv, lodash, nexmo sequelize
* #### System Dependencies: 
        Postgress

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
* Create an account on heroku [Create heroku account](https://www.heroku.com/)
* Create a db with ElephantSQL [Create Account with ELephantSQL](https://www.elephantsql.com/docs/)
* Push the file to heroku and set up the enviroment variables in the .env file eg: `DATABASE_URL=your_database_url`

### Documentation
The Documentation for the PostIt Restful API: 
[PostIt Restful API Documentation](http://docs.postit4.apiary.io)


## Authors

#### * Nnamani Kenechukwu Charles 

### Licence [Licence]()

## Acknowledgments

* Andela Talent Accelerator Team

