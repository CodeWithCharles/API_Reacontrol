const { verify } = require("jsonwebtoken");
const errorResponse = require("../errorResponse");

module.exports = {
    validateAccreditations: (role, req, res, next) => {
        if(role) {
            role.push("ROLE_SUPERADMIN");
        } else {
            role = ["ROLE_SUPERADMIN"];
        }
        let token = req.get("authorization");
        if(token) {
            token = token.slice(7);
            verify(token, process.env.APP_SECRET, (error, decoded) => {
                if(error) {
                    return errorResponse(error, res);
                } else {
                    if(!role.includes(decoded.result.roles[0]))
                    {
                        return res.json({
                            success: 0,
                            message: "Access denied, not enough permissions."
                        });
                    } else {
                        next();
                    }
                }
            })
        } else {
            return res.json({
                success: 0,
                message: "Access denied. Invalid token."
            })
        }
    }
}