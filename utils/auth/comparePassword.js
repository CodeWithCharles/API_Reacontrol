const { compare } = require("bcrypt");

module.exports = {
    comparePassword: async (passwordA, passwordB, callBack) => {
        try {
            const result = await compare(passwordA.toString(), passwordB.toString())
            return callBack(null, result);
        } catch(error) {
            return callBack(error);
        }
    }
}