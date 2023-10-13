const express = require('express');
const User_Controller = require('../controllers/users.controller');

class User_Router {
    constructor() {
        this.router = express.Router();

        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post('/register', User_Controller.registeringUser);
        this.router.post('/login', User_Controller.loggingUser);
    }

    getRouter() {
        return this.router;
    }
}


module.exports = new User_Router().getRouter();