const mongoose = require('mongoose');

class UserModel {
    constructor() {
        this.schema = new mongoose.Schema({
            firstName: {
                type: String
            },
            lastName: {
                type: String
            },
            email: {
                type: String
            },
            password: {
                type: String
            },
            role: {
                type: String,
                enum: ['admin', 'super-admin', 'employee'],
                default: 'employee',
            },
            designation: {
                type: String,
                enum: ['Sales', 'Developer', 'Designer', 'Manager', 'HR']
            },
            phoneNumber: {
                type: String
            },
            address: {
                street: String,
                city: String,
                state: String,
                postalCode: String,
                country: String,
            },
        }, {
            timestamps: true, // Adds createdAt and updatedAt timestamps
            versionKey: false
        });

        this.model = mongoose.model('users', this.schema);
    }

    getModel() {
        return this.model;
    }
}

module.exports = new UserModel().getModel();
