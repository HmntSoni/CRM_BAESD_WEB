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

    // Self Update 
    static async updateUserDetails(req, res) {
        try {
            const id = req.userID;
            const { firstName, lastName, email, phoneNumber, address } = req.body;

            const userDetails = await usersModel.findById(id);

            // Update user details if the fields are provided
            if (firstName) {
                userDetails.firstName = firstName;
            }
            if (lastName) {
                userDetails.lastName = lastName;
            }
            if (email) {
                userDetails.email = email;
            }
            if (phoneNumber) {
                userDetails.phoneNumber = phoneNumber;
            }
            if (address) {
                userDetails.address = address;
            }

            // Save the updated user details
            await userDetails.save();

            return res.status(200).json({
                status: true,
                message: 'User details updated successfully',
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Error: ' + error.message,
            });
        }
    }

    // Self Delete
    static async deleteUser(req, res) {
        try {
            await usersModel.findByIdAndDelete(req.userID);
            res.clearCookie('token');

            return res.status(200).json({
                status: true,
                message: 'User deleted successfully',
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Error: ' + error.message,
            });
        }
    }

    // Admin Removes a User
    static async deleteUserByAdmin(req, res) {
        try {
            const id = req.params.id;
            await usersModel.findByIdAndDelete(id);

            return res.status(200).json({
                status: true,
                message: 'User deleted successfully',
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Error: ' + error.message,
            });
        }
    }

    //Update user details by Admin
    static async updateUserDetailsByAdmin(req, res) {
        try {
            const id = req.params.id;
            const { firstName, lastName, email, password, role, designation, phoneNumber, address } = req.body;

            const userDetails = await usersModel.findById(id);

            // Update user details if the fields are provided
            if (firstName) {
                userDetails.firstName = firstName;
            }

            if (lastName) {
                userDetails.lastName = lastName;
            }

            if (email) {
                userDetails.email = email;
            }

            if (password) {
                userDetails.password = await bcrypt.hash(password, 6);
            }

            if (role) {
                userDetails.role = role;
            }

            if (designation) {
                userDetails.designation = designation;
            }

            if (phoneNumber) {
                userDetails.phoneNumber = phoneNumber;
            }

            if (address) {
                userDetails.address = address;
            }

            // Save the updated user details
            await userDetails.save();

            return res.status(200).json({
                status: true,
                message: 'User details updated successfully',
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Error: ' + error.message,
            });
        }
    }

    static async fetchingOtherUsers(req, res) {
        try {
            const userDetails = await usersModel.findById(req.userID);

            if (userDetails.role === 'super-admin') {
                // Super-admin can see all users except other super-admins
                const data = await usersModel.find({ role: { $ne: 'super-admin' } });
                return res.status(200).json({
                    data: data,
                    count: data.length,
                });
            } else if (userDetails.role === 'admin') {
                // Admins can see all users except super-admins and other admins
                const data = await usersModel.find({ role: { $nin: ['super-admin', 'admin'] } });
                return res.status(200).json({
                    data: data,
                    count: data.length,
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Error: ' + error.message,
            });
        }
    }

    static async fetchingMyAccountDetails(req, res) {
        try {
            return res.status(200).json({
                message: 'Your account details',
                data: await usersModel.findById(req.userID),
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
