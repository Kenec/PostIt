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


### API Documentation
The Documentation for the PostIt Restful API: 
[PostIt Restful API Documentation](https://app.swaggerhub.com/apis/Kenec/PostIt/1.0.0)

## TECHNOLOGIES
#### Client Side: 
The frontend was implemented using:
 * [React](https://reactjs.org/) A JavaScript library for building user interfaces
 * [Redux](https://redux.js.org/) Redux is a predictable state container for JavaScript apps.
 * [Bootstrap](http://getbootstrap.com/) Build responsive, mobile-first projects on the web.
 
#### Backend
The Backend was implemented using: 
 * [Node](https://nodejs.org/en/) Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine
 * [Express](https://expressjs.com/) Express is a minimal and flexible Node.js web application framework 
 * [Sequelize](http://docs.sequelizejs.com/) Sequelize is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL
 * [Postgres](https://www.postgresql.org/) A powerful, open source object-relational database system.

### INSTALLATION
  * install [Node js](https://nodejs.org/en/) and [Postgress](https://www.postgresql.org/)
  * Clone the repository `git clone https://github.com/Kenec/PostIt.git`
  * Navigate to the location in your terminal
  * Run $ npm install to install dependencies
  * Setup Postgres, create a database postit and set it to port 5000 [Setup postgress](http://certek.com/kb4/install-server-postgresql-and-pgadmin-on-windows/)
  * Install sequelize-cli, Run $ npm install -g sequelize-cli (note: sudo install on ubuntu or MAC)
  * In terminal run $ sequelize db:migrate
  * Create a .env file in your root directory and follow the pattern in the [.env.sample](https://github.com/Kenec/PostIt/blob/master/sample%20env%20file) file to create environmental variables
  * Run $ npm start to get the app started on your local machine
  
## TESTING
#### Client side:
To run tests for the client side:
* Naviagate to the project location in your terminal
* Run `jest -u`
#### Server side
To run tests for the server side
* Navigate to the project location in your terminal
* Run `npm run test`

### Contributing
1. Fork this [repository](https://github.com/Kenec/PostIt.git) 
2. Clone to your local environment: `https://github.com/Kenec/PostIt.git`
3. Create your feature branch: `git checkout -b my-new-feature`
4. Commit your changes: `git commit -am 'Add some feature'`
5. Write test for the new features
6. Push to the branch: `git push origin my-new-feature`
7. Submit a pull request against the `staging` branch

## Limitations
* Different users cannot create a group with the same name
* Users cannot delete the groups they created
* A user cannot join a group unless added to by another user
* When a user is added to a group, he/she cannot remove him/her self from the group unless by the group Admin
* Message cannot be edited or deleted

## FAQ
* Is this project an open source?
   * Yes it is
* Can I use this app for commercial purpose
   * This project is license under the MIT licence, hence it can use it for commercial purpose
* How do I test the online version of the project
   * Create account on the [online version](https://postit-lite.herokuapp.com/) of the app so that you can have access to the app
* When I am logged in to the app, can I create my own group
   * Yes you can
* How do I add people to the group
   * Select on any group from the dashboard, then enter the username of a user you want to add to the group on the search box by the right. Then click `Add`
* Can I remove a user from the group I created
   * Yes
* Can I remove a user from the group I did not create
   * No. Only the group admin can remove a user
* Can I change my password
   * Yes you can.
       - Enter your email address in the `/forgotPassword` page,
       - An email containing the reset password URL will be sent to your email address
       - Click on the `RESET PASSWORD` button to reset password
       - Enter your new password and confirm password
       - Click change password button and your password will reset

## ISSUES
To report an issue or give feedback, Click link
[Issues and Feedback](https://github.com/Kenec/PostIt/issues)

## Authors
* Nnamani Kenechukwu Charles

## Licence 
[MIT License](https://github.com/Kenec/PostIt/blob/master/LICENSE)

## Acknowledgments
* Andela Talent Accelerator Team

