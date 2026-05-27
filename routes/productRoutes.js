const express= require("express");
const router=express.Router();
const isAuthenticated= require("../middleware/authMiddleware");

const {
    showAddProductPage,
    addProduct,
    showProducts,
    showSingleProduct,
    addToCart,
    showCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    checkout,
    showOrders,
    removeProduct,
    showEditPage,
    updateProduct 
}= require("../controllers/productController");

router.get("/add-product",isAuthenticated,showAddProductPage);

router.post("/add-product",addProduct);

router.get("/products",showProducts);

router.get("/products/:id",showSingleProduct);

router.get("/cart",isAuthenticated,showCart);

router.post("/add-to-cart/:id",isAuthenticated,addToCart);

router.post("/remove-from-cart/:id",isAuthenticated,removeFromCart);

router.post("/increase/:id",isAuthenticated,increaseQuantity);

router.post("/decrease/:id",isAuthenticated,decreaseQuantity);

router.post("/checkout",isAuthenticated,checkout);

router.get("/orders",isAuthenticated,showOrders);

router.post("/delete-product/:id",isAuthenticated,removeProduct);

router.get("/edit-product/:id",isAuthenticated,showEditPage);

router.post("/edit-product/:id",isAuthenticated,updateProduct);

module.exports=router;