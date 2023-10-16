const express = require('express');
const User_Controller = require('../controllers/users.controller');
const authentication = require('../middleware/authentication.middleware');

class User_Router {
    constructor() {
        this.router = express.Router();

        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post('/register', User_Controller.registeringUser);
        this.router.post('/login', User_Controller.loggingUser);
        this.router.post('/reset-password', authentication, User_Controller.passwordReset);
    }

    getRouter() {
        return this.router;
    }
}


module.exports = new User_Router().getRouter();