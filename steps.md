# Structure for every NPM project

[ ] Create folder structure.
[ ] Initialize NPM project.
[ ] Install libraries.
[ ] Include resources (Html & CSS, etc.)
[ ] Arrange templates (without editing)
[ ] Create initialization files
[ ] - index- create and start (Express) application
[ ] - config files- database connect (Mongoose), Express middle-wares(Body-parser, static ),
 external middle-wares(cookie-parser, bcrypt, jsonwebtoken)
[ ] Create generic User model
[ ] Create user service and auth middle-ware
-user service has to create user, find user by username, find user by email if project requires that
-in service we accept already valid data, here we don't have to do any validation
-the role of this service will be only to create instance of the model and save it
[ ] Create mock routes for register, login and logout
[ ] Create route guards
[ ] Create generic storage middleware
[ ] 


# Requirements for Booking-Uni Project

[ ] Adapt User model and user service, auth middle-wares to project requirements
[ ] Implement register and login page actions, register, login, logout actions
[ ] Update config, index.js-database name project
[ ] Create models for project-specific data
[ ] Create data services and middle-wares for project-specific data
[ ] Implements page action for project-specific functionality(validations, errors for the user)