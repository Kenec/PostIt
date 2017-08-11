# PostIt

PostIt is a messenger app that allow users to create groups and send messages to the created groups. 
The messages sent to the groups have the priority of Normal, Urgent and Critical. Based on the message priority, 
each user will get SMS, Email and in App notifications. Logged in users can create new group, add members to groups,
and send messages. User can also recover password when lost.

## TECHNOLOGIES
* #### Front-end: 
        React/Redux + SASS + Boostrap + Materialize CSS 
* #### Back-end: 
        Node/Expressjs + Sequelize/Postgres + 
* #### Libraries: 
        axios, moment, express-validator, super-test, jsonwebtoken, es6, Babel-Node, Gulp, eslint, Mocha/Chai + chai-http

## Folder Structure
* ### client
  * actions -- this folder contains the all the redux actions
  * components -- this contains the react components
  * dist -- this folder contains the webpack build file
  * images -- contains the images used in the application
  * js -- contains the react routes and the main js file
  * reducer -- contains all the reducers for the app
  * scss -- folder that contains project SASS file
  * store -- folder that has store creator file
  * utils -- contains files that are commonly required in client folder

* ### server
  * controller -- contains the route controllers
  * migrations -- contains the sequelize migration files
  * models -- contain the database models and associations
  * routes -- contains the server routes
  * shared -- contains file that are shared between the client and the server
  * test -- contain test files

* ### template
  * contains HTML, CSS, BOOTSTRAP Files

### INSTALLATION
  * Clone the repo
  * Navigate to the location in your terminal
  * Run $ npm install && bower install to install dependencies
  * Setup Postgres, create a database postit and set it to port 5000
  * Install sequelize-cli, Run $ npm install -g sequelize-cli (note: sudo install on ubuntu or MAC)
  * In terminal run $ sequelize db:migrate

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
* Push the file to heroku and set up the enviroment variables 

## Authors

#### Nnamani Kenechukwu Charles 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Andela Talent Accelerator Team

