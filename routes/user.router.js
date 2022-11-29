const { createUser, getUsers, getUserById, updateUser, deleteUser, login } = require("../middleware/user.controller");
const router = require("express").Router();
const { validateAccreditations } = require("../utils/auth/validateAccreditations");

router.post("/", createUser);
router.get("/", (req, res, next) => validateAccreditations(["ROLE_ADMIN"], req, res, next), getUsers);
router.get("/:id", (req, res, next) => validateAccreditations(["ROLE_ADMIN"], req, res, next), getUserById);
router.patch("/", (req, res, next) => validateAccreditations(["ROLE_ADMIN"], req, res, next), updateUser);
router.delete("/:id", (req, res, next) => validateAccreditations(["ROLE_ADMIN"], req, res, next), deleteUser);
router.post("/login", login);

module.exports = router;