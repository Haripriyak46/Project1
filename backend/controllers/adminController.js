const Admin = require("../model/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const admin = await Admin.findOne({
            email: email.toLowerCase()
        });
        

        if (!admin) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        
        const isPasswordCorrect = await bcrypt.compare(
            password,
            admin.password
        );
        


        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

       
        const token = jwt.sign(
            {
                adminId: admin._id,
                role: "admin"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            message: "Admin login successful",
            token,
            admin: {
                id: admin._id,
                email: admin.email
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};
const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.status(200).json({
            users
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to fetch users"
        });
    }
};

module.exports = {
    adminLogin,
    getUsers
};