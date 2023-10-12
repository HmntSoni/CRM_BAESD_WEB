require('dotenv').config();
const mongoose = require('mongoose');


class Database {
    constructor() {
        this.connection = mongoose.connect(process.env.mongoURL)
    }
}

module.exports = new Database