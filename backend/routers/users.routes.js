const express = require('express');
const User_Controller = require('../controllers/users.controller');
const authentication = require('../middleware/authentication.middleware');

class User_Router {
    constructor() {
        this.router = express.Router();

        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/', authentication, User_Controller.fetchingOtherUsers);
        this.router.get('/my-account', authentication, User_Controller.fetchingMyAccountDetails);
        this.router.post('/register', User_Controller.registeringUser);
        this.router.post('/login', User_Controller.loggingUser);
        this.router.post('/reset-password', authentication, User_Controller.passwordReset);
        this.router.patch('/update', authentication, User_Controller.updateUserDetails);
        this.router.patch('/update-users/:id', authentication, User_Controller.updateUserDetailsByAdmin);
        this.router.delete('/delete', authentication, User_Controller.deleteUser);
        this.router.delete('/delete-users/:id', authentication, User_Controller.deleteUserByAdmin);
    }

    getRouter() {
        return this.router;
    }
}


module.exports = new User_Router().getRouter();