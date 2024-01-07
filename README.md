# COMP3006

## Installation

A build script has been provided for easy building of each project/autogenerated code. Note: The project was built using the build all script before submission so all autogenrated files are already in place and have been commit to the repository. If prefered the project can be run after running `npm install` on both COMP3006-Backend and COMP3006-Frontend 


```bash
./build-all-sh
```
Connecting to the mongo database requires a username and password. These have been provided at the very top of the attached report to the coursework submission. Place these in the .env file located in COMP3006-Backend.

## Usage
Data has been pre-created in an externally hosted Mongo database (Atlas). In the event that data is not in the database pre created data can be added by running  `node mongosetup.js` in the COMP3006-db folder.

A login system is used. Creating new account is suported however, multiple accounts have been pre-generated. Login details of these account can be found in the table below.

| Username  |  Password |
|---|---|
| userOne  | passwordOne  |
|  userTwo |  passwordTwo |
| restaurantOne  | passwordOne  |
| restaurantTwo  | passwordTwo  |

RestaurantOne is linked to the McRonalds restaurant and restaurantTwo is linked to the Plymouth Fried Chicken restaurant. Orders sent to these two restaurants will go to these two users respectively.