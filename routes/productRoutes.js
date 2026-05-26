const express= require("express");
const router=express.Router();
const isAuthenticated= require("../middleware/authMiddleware");

const {
    showAddProductPage,
    addProduct,
    showProducts,
    showSingleProduct,
    addToCart,
    showCart 
}= require("../controllers/productController");

router.get("/add-product",showAddProductPage);

router.post("/add-product",addProduct);

router.get("/products",showProducts);

router.get("/products/:id",showSingleProduct);

router.get("/cart",isAuthenticated,showCart);

router.post("/add-to-cart/:id",isAuthenticated,addToCart);

module.exports=router;