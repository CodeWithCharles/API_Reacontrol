const { genSalt, hash } = require("bcrypt");
const { insertUser } = require("../../models/users/create");
const { errorResponse } = require("../../utils/errorResponse");

module.exports = {
    createUser: async (req, res) => {
        const body = req.body;
        try {
            const salt = await genSalt(10);
            body.password = await hash(body.password, salt)
        } catch(error) {
            return errorResponse(error, res);
        }

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
    }
}