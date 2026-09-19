const express = require("express");

const {
    register,
    login,
    forgotPassword,
    resetPassword,
    updateProfile
} = require("../controllers/userController");
const userMiddleware=require('../middleware/userMiddleware')

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:token", resetPassword);
router.put("/userDashboard", userMiddleware, updateProfile);

module.exports = router;