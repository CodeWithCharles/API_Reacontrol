const pool = require("../database");

module.exports = {
    insertUser: (data, callBack) => {
        pool.query(
            `INSERT INTO users(firstName, lastName, username, email, password)
                VALUES (?,?,?,?,?)`,
            [
                data.firstName,
                data.lastName,
                data.username,
                data.email,
                data.password
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                } else {
                    return callBack(null, results)
                }
            }
        );
    }
};