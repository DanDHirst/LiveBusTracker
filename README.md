Live Bus Tracker Application Readme
This repository contains the source code for a Live Bus Tracker application that allows users to view live bus locations, receive alerts when buses are near their stops, and provides administrators with the ability to manage buses and routes. The application is built using Express.js and MongoDB, following a Model-View-Controller (MVC) architecture.

Table of Contents
Functional Requirements
Application Target Audience
Features Included
Design and Technologies Used
System Architecture
Testing
DevOps Pipeline
Personal Reflection
Functional Requirements
The Live Bus Tracker application fulfills the following functional requirements:

As a User, I want to be able to view the live bus locations.
As a User, I want to receive alerts when a bus is near my stop.
As an Admin, I want to be able to view, edit, add, and delete buses.
As an Admin, I want to be able to view, edit, add, and delete bus routes.
Application Target Audience
The Live Bus Tracker application is designed for individuals who regularly use public transport to locate buses they want to catch. It caters to users who require real-time bus tracking, which is not provided by Google Maps or other available applications.

Features Included
The Live Bus Tracker application includes the following features:

Ability to view a bus route with the active bus location.
Alert functionality for users when a bus is due to arrive using sockets.
Ability for administrators to add, edit, and remove buses.
Ability for administrators to add, edit, and remove bus routes.
Validation and sanitization of inputs to prevent incorrect information and security vulnerabilities.
Bus data output in JSON format, facilitating the development of other applications using the bus data.
Design and Technologies Used
The Live Bus Tracker application is built using the following technologies:

Express.js for server-side development.
MongoDB for the database, hosted on MongoDB Atlas.
HTML/EJS templates for the views.
MVC architecture with separate models, views, and controllers.
System Architecture
The application follows a Model-View-Controller (MVC) architecture:

Model: MongoDB serves as the database.
View: EJS templates, including bustracker.ejs.
Controller: Express.js handles business logic, data retrieval, and parsing.
Testing
The application has undergone comprehensive testing, including:

Integration Testing: Cypress is used for testing bus management, route management, and bus tracking pages.
Accessibility Testing: The application's accessibility was tested and improved based on the feedback received.
Unit Testing: Mocha and Chai are used for unit tests, ensuring proper template rendering and route functionality.
Usability Testing: User sessions were conducted to gather usability feedback and implement improvements.
DevOps Pipeline
The development process and pipeline include:

Development in Visual Studio Code.
GitHub for source control and version management.
GitHub Actions for continuous integration, running unit and integration tests.
Deployment to Heroku upon successful tests, making the application available at https://live-bustracker.herokuapp.com/.
