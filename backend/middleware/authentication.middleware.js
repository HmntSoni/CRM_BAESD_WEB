require('dotenv').config();
const jwt = require('jsonwebtoken');
const usersModel = require('../models/users.model');

async function authentication(req, res, next) {
    try {
        const token = req.cookies.token;

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
                if (err) {
                    return res.status(401).json({
                        status: false,
                        message: 'Unauthorized',
                    });
                }
                // If verification succeeds, you can access the decoded payload
                req.userID = decode.userID;
                const userDetails = await usersModel.findById(req.userID)
                req.user = userDetails;
                console.log(req);
                next(); // Call next to proceed to the next middleware or route handler
            });
        } else {
            return res.status(401).json({
                status: false,
                message: 'Unauthorized',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'Error: ' + error.message,
        });
    }
}


module.exports = authentication;