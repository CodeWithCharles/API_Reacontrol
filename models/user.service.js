const pool = require("./database");

module.exports = {
    insertUser: (data, callBack) => {
        pool.query(
            `INSERT INTO users(firstName, lastName, username, email, password, roles)
                VALUES (?,?,?,?,?,?)`,
            [
                data.firstName,
                data.lastName,
                data.username,
                data.email,
                data.password,
                "[]"
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                } else {
                    return callBack(null, results)
                }
            }
        );
    },
    getUsers: callBack => {
        pool.query(
            `select id, firstName, lastName, username, email, roles from users`,
            [],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                } else {
                    return callBack(null, results);
                }
            }
        )
    },
    getUserById: (id, callBack) => {
        pool.query(
            `SELECT id, firstName, lastName, username, email, roles FROM users WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                } else {
                    return callBack(null, results[0]);
                }
            }
        )
    },
    updateUser: (data, callBack) => {
        pool.query(
            `UPDATE users set firstName = ?, lastName = ?, username = ?, email = ?, password = ?, roles = ? WHERE id = ?`,
            [
                data.firstName,
                data.lastName,
                data.username,
                data.email,
                data.password,
                data.roles,
                data.id
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    deleteUser: (id, callBack) => {
        pool.query(
            `DELETE FROM users WHERE id = ?`
            [id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                } else {
                    return callBack(null, results[0])
                }
            }
        )
    },
    getUserByEmail: (email, callBack) => {
        pool.query(
            `SELECT * FROM users WHERE email = ?`,
            [email],
            (error, results, fields) => {
                if(error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    }
};