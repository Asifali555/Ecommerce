const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const User = require('../../models/User')

const registerUser = async(req, res) => {

    const {userName, email, password, role } = req.body;

    try{
        const checkUser = await User.findOne({email});
        if(checkUser){
            return res.json({
                success: false,
                message: "User Already exists with the same emaill! Please use another emal"
            });
        };
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            userName, email, password: hashPassword, role,
        });

        await newUser.save();
        res.status(200).json({
            success: true,
            message: "Registration Success"
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : 'some error occured'
        })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return res.status(404).json({
                success: false,
                message: "User doesn't exist! Please register first"
            });
        }

        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
        if (!checkPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password! Please try again",
            });
        }

        const token = jwt.sign(
            {
                id: checkUser._id,
                role: checkUser.role,
                email: checkUser.email,
                userName: checkUser.userName,
            },
            process.env.CLIENT_SECRET_KEY || "CLIENT_SECRET_KEY",
            { expiresIn: "60m" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict", 
        }).status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                id: checkUser._id,
                email: checkUser.email,
                role: checkUser.role,
                userName: checkUser.userName 
            }
        });

    } catch (e) {
        console.error("Login error:", e);
        res.status(500).json({
            success: false,
            message: "Some error occurred",
        });
    }
};

const logoutUser = (req, res) => {
    res.clearCookie("token").json({
        success: true,
        message: "Logged out successfully",
    });
};

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized user!",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.CLIENT_SECRET_KEY || "CLIENT_SECRET_KEY");
        req.user = decoded; 
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        res.status(401).json({
            success: false,
            message: "Invalid token! Please log in again.",
        });
    }
};

   
module.exports = {registerUser, loginUser, logoutUser, authMiddleware}