const { generatePassword } = require("../utils/auth/generatePassword");
const { comparePassword } = require("../utils/auth/comparePassword");
const { insertUser, getUserById, getUsers, updateUser, deleteUser, getUserByEmail } = require("../models/user.service");
const { errorResponse } = require("../utils/errorResponse");
const { sign } = require("jsonwebtoken")

module.exports = {
    createUser: async (req, res) => {
        const body = req.body;
        
        await generatePassword(body, (error, password) => {
            if(error) {
                return errorResponse(error, res);
            } else {
                body.password = password
            }
        })

        insertUser(body, (error, results) => {
            if(error) {
                return errorResponse(error, res);
            } else {
                return res.status(200).json({
                    success: 1,
                    data: results
                })
            }
        });
    },
    getUserById: async (req, res) => {
        const id = req.params.id;
        getUserById(id, (error, results) => {
            if(error) {
                return errorResponse(error, res);
            }
            if(!results) {
                return res.json({
                    success: 0,
                    message: "User not found."
                })
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getUsers: async (req, res) => {
        getUsers((error, results) => {
            if(error) {
                return errorResponse(error, res)
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateUser: async (req, res) => {
        const body = req.body;

        await generatePassword(body, (error, password) => {
            if(error) {
                return errorResponse(error, res);
            } else {
                body.password = password
            }
        });

        updateUser(body, (error, results) => {
            if(error) {
                return errorResponse(error, res);
            }
            if(!results) {
                return errorResponse(error, res);
            }
            return res.json({
                success: 1,
                message: "Successfully updated user."
            });
        });
    },
    deleteUser: async (req, res) => {
        const id = req.params.id;
        deleteUser(id, (error, results) => {
            if(error) {
                return errorResponse(error, res);
            }
            if(!results) {
                return res.json({
                    success: 0,
                    message: "User not found."
                });
            }
            return res.json({
                success: 1,
                message: "Successfully deleted user."
            })
        })
    },
    login: async (req, res) => {
        const body = req.body;
        let passwordCheck = false;
        getUserByEmail(body.email, (error, results) => {
            if(error) {
                return errorResponse(error, res);
            }
            if(!results) {
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                })
            }
            comparePassword(body.password, results.password, (error, result) => {
                if(error) {
                    return errorResponse(error, res)
                } else {
                    passwordCheck = result;
                    if(passwordCheck) {
                        results.password = undefined;
                        const jwToken = sign({ result: results }, process.env.APP_SECRET, {
                            expiresIn: "30d"
                        });
                        return res.json({
                            success: 1,
                            message: "Successfully logged in.",
                            token: jwToken
                        });
                    } else {
                        return res.json({
                            success: 0,
                            message: "Invalid email or password"
                        });
                    }
                }
            });
        });
    }
};