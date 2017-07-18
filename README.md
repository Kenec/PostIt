![alt text](https://travis-ci.org/Kenec/PostIt.svg?branch=master)  [![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/codeclimate/codeclimate) [![Test Coverage](https://codeclimate.com/github/codeclimate/codeclimate/badges/coverage.svg)](https://codeclimate.com/github/codeclimate/codeclimate/coverage)


# PostIt

Postit is a simple application that allows friends and colleagues create groups for notifications. This application allows a user to signup to be able 
to use its features. When signed in, the user can create groups, add members to the group, send messages as well as receive messages from groups. The messages
sent have three priority levels:

- Normal: This shows that the message is not very urgent. The members in the group will only get in-app notifications
- Urgent: This shows that the message should be treated with urgency. For this reason, the members in the group will get in-app and email notifications
- Critical: This priority level of the message shows that it is extremely urgent and immediate action is needed. The members in the group will get in-app, email and SMS
notifcations


## FEATURES
- User should be able to signup through POST: /api/user/signup with the fields username, email, password
- User should be able to Login through POST: /api/user/signin with the fields usename and password
- User should be able to create a group POST: POST: /api/group
- User should be able to add other users to a group POST: /api/group/<group id>/user
- User should be able to send message to the created group POST: /api/group/<group id>/message
- User should be able to retrieve message from the group GET: /api/group/<group id>/messages


## STRUCTURE

The application is structured into the server and the client sides


### Server
This houses the server code for the applications. The api routes, the controller, the models are all residing in this part of the 

### Client
This houses the client code for the applications. This is yet to be implemented. React and Redux is the choice front-end framework for this app


## Authentication
This application uses Authentication in order to protect the routes from unauthorized users. Though this is yet to be implemented in the current version, JWT is a choice
authentication to be used.


## Motivation
This application is created to enable group messaging with the appropriate attention it required. The conventional messaging app only delivers message when
a user is on the app but PostIt will enable very urgent message get prompt attention even when the user is yet to open the app.


## Installation
To install this application, clone the app and run the command `npm init` to install the dependencies.
The installed dependencies will enable the application to run from your local system


## API Reference



## Tests
To test this app, visit https://sheltered-bastion-21002.herokuapp.com/ and check the api documentation for the route addresses.


## Contributors
To contribute to this app, kindly raise a pull request with the updated 

## License
Andela
