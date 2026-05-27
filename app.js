const express= require("express");
const MongoStore = require("connect-mongo");
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

dotenv.config();

//session
app.use(session({
secret:process.env.SESSION_SECRET,
resave:false,
saveUninitialized:false,
store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

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