const User = require('../model/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Otp = require("../model/Otp");
const sendEmail = require('../utlis/sendEmail');

const generateToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'})

};
// Register a new user
const registerUser = async(req,res)=>{
    const{name,email,password}=req.body;
    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:'User already exist'});
        }

        // TODOS:hash the password before saving to the database
        //TODOS:implement Jwt token generation for authication
        //TODOS: OTP sending and verfiaction for email confirmation 
        //TODOS:WELCOME
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const user = await User.create({
            name,
            email,
            password:hashedPassword});

        if(user){
const otp = Math.floor(100000 + Math.random() * 900000).toString();

// Remove any previous OTP for this email
await Otp.deleteMany({ email });

// Save the new OTP
await Otp.create({
    email,
    otp,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
});

    const message = `
    Welcome to ShopNest, ${name}!Your OTP for email verification is:
    ${otp}
    This OTP will expire in 10 minutes.
    `;
    await sendEmail(
        email,
        "ShopNest Email Verification OTP",
        message
    );
            // res.status(201).json({
            //     _id: user._id,
            //     name:user.name,
            //     email:user.email,
            //     role:user.role,
            //     token:generateToken(user._id)
            // });

            res.status(201).json({
                success: true,
                message: "User registered successfully. Please verify your email using the OTP sent to your email."
            });
        }
        else{
            res.status(500).json({message:'invlaid user data'});
        }

    }catch(error){
        res.status(500).json({message:'Server error'});
    }
};
// login user
const loginUser = async (req,res)=>{
    const {email,password}=req.body;
    try{
        const user = await User.findOne({email});
        if(user && (await bcrypt.compare(password,user.password))){

            if (!user.verified) {

                const otp = Math.floor(100000 + Math.random() * 900000).toString();

                await Otp.deleteMany({ email });

                await Otp.create({
                    email,
                    otp,
                    expiresAt: new Date(Date.now() + 10 * 60 * 1000)
                });

                await sendEmail(
                    email,
                    "ShopNest Email Verification OTP",
                    `Your OTP is ${otp}`
                );

                return res.status(401).json({
                    success: false,
                    verified: false,
                    email,
                    message: "Email not verified. A new OTP has been sent to your email."
                });
            }
            res.json({
                _id: user._id,
                name:user.name,
                email:user.email,
                role:user.role,
                token:generateToken(user._id)
            });
        }
        else{
         res.status(400).json({message:'invlaid user data'});   
        }
    }catch(error){
         res.status(500).json({message:'Server error'});
    }
}
 
// getUser

const getUsers=async(req,res)=>{
    try{
        const users = await User.find({}).select("-password");
        res.json(users);
    }catch(error){
        console.error(error);
        res.status(500).json({message:error.message});
    }
};

const sendOtp = async (req, res) => {

    try {

        const { email } = req.body;

       const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Prevent sending OTP if the email is already verified
        if (user.verified) {
            return res.status(400).json({
                success: false,
                message: "Email is already verified."
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        await Otp.deleteMany({ email });

        await Otp.create({
            email,
            otp,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000)
        });

        await sendEmail(
            email,
            "ShopNest Email Verification OTP",
            `Your OTP is ${otp}`
        );

        res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const verifyOtp = async (req, res) => {
    try {

        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required"
            });
        }

        const otpData = await Otp.findOne({ email });

        if (!otpData) {
            return res.status(400).json({
                message: "OTP not found"
            });
        }

        if (otpData.expiresAt < new Date()) {
            await Otp.deleteOne({ email });

            return res.status(400).json({
                message: "OTP has expired"
            });
        }

        if (otpData.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        await User.updateOne(
            { email },
            { verified: true }
        );

        await Otp.deleteOne({ email });

        res.status(200).json({
            success: true,
            message: "Email verified successfully. You can now login."
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
module.exports={
    registerUser,loginUser,getUsers,sendOtp, verifyOtp
   
};
 
