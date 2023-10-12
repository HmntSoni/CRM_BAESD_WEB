require('dotenv').config();  // Load environment variables from a .env file if present
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connection = require('./configs/connection');  // Import your database connection setup

class Server {
    constructor() {
        this.PORT = process.env.PORT || 7001;
        this.app = express();

        this.setMiddleware();  // Set up middleware
        this.startServer();  // Start the server
    }

    setMiddleware() {
        this.app.use(express.json());  // Parse JSON request bodies
        this.app.use(cors());  // Enable CORS
        this.app.use(cookieParser());  // Parse cookies in the request
    }

    async startServer() {
        try {
            await connection;  // Connect to the database
            console.log('Server is connected to the DB.');
            this.app.listen(this.PORT, () => {
                console.log(`Server is running on port ${this.PORT}`);
            });
        } catch (error) {
            console.error('Server could not get connected to the DB.');
            process.exit(1); // Exit the application on database connection failure
        }
    }
}

new Server();  // Create an instance of the Server class to start the server
