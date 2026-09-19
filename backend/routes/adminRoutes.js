const express = require("express");

const {
    adminLogin,
    getUsers
} = require("../controllers/adminController");

const router = express.Router();

router.post("/login", adminLogin);
router.get("/users", getUsers);

module.exports = router;