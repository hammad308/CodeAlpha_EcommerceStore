const express= require ("express");
const router=express.Router();


const {
    registerUser,
    showRegisterPage,
    loginUser,
    showLoginPage,
    logoutUser
}=require("../controllers/authController");

router.get("/register",showRegisterPage);

router.post("/register",registerUser);

router.get("/login",showLoginPage);

router.post("/login",loginUser);

router.get("/logout",logoutUser)

module.exports= router;