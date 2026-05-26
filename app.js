const express= require("express");
const dotenv= require("dotenv");
const path= require("path");
const connectDB= require('./config/db')
const app= express();
const session=require("express-session");
const authRoutes= require("./routes/authRoutes");
const isAuthenticated= require("./middleware/authMiddleware");
const productRoutes=require("./routes/productRoutes");

//Middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//session
app.use(session({
secret:"mySecretKey",
resave:false,
saveUninitialized:false
}));

dotenv.config();
//View Engine
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

// Database connection
connectDB();

//Static files
app.use(express.static("public"));

//Authentication middleware
app.use(authRoutes);

//produt middleware
app.use(productRoutes);
//HomePage
app.get("/",(req,res)=>{
    res.render("pages/home")
});
//Profile page
app.get("/profile",isAuthenticated,(req,res)=>{
    res.send("Welcome to Profile Page")
})

const PORT= process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})