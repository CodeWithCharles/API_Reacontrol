const { genSalt, hash } = require("bcrypt");

module.exports = {
    generatePassword: async (data, callBack) => {
        try {
            const salt = await genSalt(10);
            const password = await hash(data.password, salt);
            return callBack(null, password);
        } catch(error) {
            return callBack(error);
        }
    }
}