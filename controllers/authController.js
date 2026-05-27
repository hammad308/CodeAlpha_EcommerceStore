const User=require("../models/User");
const bcrypt= require("bcryptjs");

const showRegisterPage= (req,res)=>{
    res.render("pages/register");
}
const showLoginPage=(req,res)=>{
    res.render("pages/login");
}
const registerUser = async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.json({message:"User already exists"});
        }
        const hashedPassowrd= await bcrypt.hash(password,10);
        const user = new User({
            name,
            email,
            password:hashedPassowrd
        });
        await user.save();
        req.session.user=user._id;
        res.redirect("/");
    }catch(error){
        console.log(error);
        res.json({message:"Registration Failed"});
    }
};
const loginUser=async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
           return res.json({message:"User not Found"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({message:"Email or Password Incorrect"});
        }
        req.session.user=user._id;
        res.redirect("/products");
    }catch(error){
        console.log(error);
        res.json({message:"Login Failed"});
    }
}
const logoutUser= (req,res)=>{
    req.session.destroy((error)=>{
        if(error){
            return res.json({message:"Logout Failed"});
        }
        res.redirect("/login");
    });

}
module.exports= {
    registerUser,
    showRegisterPage,
    showLoginPage,
    loginUser,
    logoutUser
}
