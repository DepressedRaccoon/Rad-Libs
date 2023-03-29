# Rad-Libs
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Description
RadLibs is a full stack application utilizing a responsive front end and an express.js back end. RadLibs allows a user to sign up, log in, and create silly stories called RadLibs. The RadLibs can be saved, and the user may go back and read their previously created RadLibs to entertain the masses. 

Technoligies used:
- Bootstrap
- Node 
- MySQL
- Sequelize
- Express
- Express-Handlebars
- Nodemon (new to us)
- Express-Validator (new to us)
 
## Installation
The app includes a package.json file. Use the steps below to prepare your machine for the app:
- ```set up a dotenv file / copy the .env.EXAMPLE```
- ```npm install```
- ```mysql -u root -p```
- ```SOURCE db/schame.sql```
- ```npm run seed```
- ```npm run watch```

## Usage
Upon page load, the user will sign in or sign up to the app and create RadLibs, our version of ad-libs. The user will input words/designated parts of speech through a form into a database. The user will submit their words (POST request), and GET request will retrieve their completed RadLib based on the template chosen.

## Support Documentation
- [Wireframe](https://docs.google.com/presentation/d/1p85Mem2GVpNCIsrWFuEKMGp7R_b7PnW1oEGkWgsKe-E/edit?usp=sharing)
- [User Story](https://docs.google.com/document/d/1wdFSLSm2UdIUqSKtJf7X4xEJtY0F_Edoyj9FBBVCezU/edit?usp=sharing)
- [Presentation](https://docs.google.com/presentation/d/1Z-ebyzibI_ibEakBGLJKuPitFa_E5qMQyyUplaB3_ac/edit#slide=id.p)

## Ideas for Future Development
- Create a user profile page
- Allow users to create teams
- Allow teams to see all RadLibs created
- Offer a delete button if a user does not like their RadLib

## Credits
KU Coding Boot Camp collaboration project. Team members include:
- [Chris Rathmel](https://github.com/kitrath)
- [Cole Hartkop](https://github.com/zencoh)
- [Rebecca Lehew](https://github.com/rebeccalehew)
- [Steven Chafin](https://github.com/SChafinIII)

## License
Licensed under the [MIT](https://opensource.org/licenses/MIT) license.