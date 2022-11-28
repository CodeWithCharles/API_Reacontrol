const { createUser } = require("../middleware/users/create");
const router = require("express").Router();

router.post("/", createUser);

module.exports = router;