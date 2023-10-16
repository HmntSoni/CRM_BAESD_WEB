require('dotenv').config();
const usersModel = require("../models/users.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class User_Controller {
    static async registeringUser(req, res) {
        try {
            const { firstName, lastName, email, password, role, designation, phoneNumber, address } = req.body;

            // Check if the user already exists by email
            const existingUser = await usersModel.findOne({ email });

            if (existingUser) {
                return res.status(400).json({
                    status: false,
                    message: 'User is already registered.'
                });
            }

            // Hash the password before storing it
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Create a new user
            const newUser = new usersModel({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role,
                designation,
                phoneNumber,
                address,
            });

            // Save the new user to the database
            await newUser.save();

            return res.status(201).json({
                status: true,
                message: 'User registered successfully.'
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Error: ' + error.message
            });
        }
    }

    static async loggingUser(req, res) {
        try {
            const { email, password } = req.body;
            const isUser = await usersModel.findOne({ email });

            if (isUser) {
                bcrypt.compare(password, isUser.password, async (err, match) => {
                    if (match) {
                        // Passwords match, generate a JWT token
                        const token = jwt.sign({ userID: isUser._id }, process.env.JWT_SECRET);
                        res.cookie('token', token);
                        return res.status(200).json({
                            status: true,
                            message: 'Login successful',
                            token: token,
                        });
                    } else {
                        // Passwords do not match
                        return res.status(401).json({
                            status: false,
                            message: 'Invalid password!',
                        });
                    }
                });
            } else {
                // User not found
                return res.status(401).json({
                    status: false,
                    message: 'User not found',
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Error: ' + error.message,
            });
        }
    }
    static async passwordReset(req, res) {
        try {
            const { oldPassword, newPassword, rewritePassword } = req.body;

            const userDetails = await usersModel.findById(req.userID);

            bcrypt.compare(oldPassword, userDetails.password, async (err, result) => {

                if (result) {
                    if (newPassword === rewritePassword) {
                        const hashedPassword = await bcrypt.hash(newPassword, 10);
                        userDetails.password = hashedPassword;
                        await userDetails.save();

                        return res.status(200).json({
                            status: true,
                            message: 'Password updated successfully',
                        });
                    } else {
                        return res.status(400).json({
                            status: false,
                            message: 'New password and rewrite password do not match',
                        });
                    }
                } else {
                    return res.status(401).json({
                        status: false,
                        message: 'Old password is incorrect',
                    });
                }
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Error: ' + error.message,
            });
        }
    }

}

module.exports = User_Controller;
