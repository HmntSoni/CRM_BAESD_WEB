const mongoose = require('mongoose');

class Customer_Model {
    constructor() {
        this.schema = new mongoose.Schema({
            nameOfCustomer: {
                type: String,
                nullable: true
            },
            companyName: {
                type: String,
                nullable: true
            },
            vatNumber: {
                type: String,
                nullable: true
            },
            phoneNumber: {
                type: String,
                nullable: true
            },
            website: {
                type: String,
                nullable: true
            },
            address: {
                street: String,
                city: String,
                state: String,
                country: String
            }
        }, {
            versionKey: false,
            timestamps: true
        })

        this.model = mongoose.model('customers', this.schema);
    }

    getModel(){
        return this.model;
    }
}

module.exports = new Customer_Model().getModel();