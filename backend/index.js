require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

class Server {
    constructor() {
        this.PORT = process.env.PORT || 7001;
        this.app = express();

        this.setMiddleware();
        this.startServer();
    }

    setMiddleware() {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(cookieParser());
    }

    startServer() {
        this.app.listen(this.PORT, () => {
            console.log(`Server is running on port ${this.PORT}`);
        });
    }
}

new Server();