require('dotenv').config();  // Load environment variables from a .env file if present
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connection = require('./configs/connection');  // Import your database connection setup
const usersRoutes = require('./routers/users.routes');

class Server {
    constructor() {
        this.PORT = process.env.PORT || 7001;
        this.app = express();

        this.setMiddleware();  // Set up middleware
        this.startServer();  // Start the server
        this.handleRouters(); // Handle routes
    }

    setMiddleware() {
        this.app.use(express.json());  // Parse JSON request bodies
        this.app.use(cors());  // Enable CORS
        this.app.use(cookieParser());  // Parse cookies in the request
    }

    async handleWelcome(req, res) {
        try {
            return res.status(200).json({
                status: true,
                message: "Welcome to the Companies CRM."
            })
        } catch (err) {
            return res.status(500).json({
                status: false,
                message: 'Error: ' + err.message
            })
        }
    }

    handleRouters() {
        this.app.get('/', this.handleWelcome.bind(this));
        this.app.use('/users', usersRoutes)
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
