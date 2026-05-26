const Cart = require("../models/Cart");
const Product = require("../models/Product");

const showAddProductPage = (req, res) => {
    res.render("pages/addProduct");
}
const addProduct = async (req, res) => {
    try {
        const { title, description, price, image } = req.body;
        const product = new Product({
            title,
            description,
            price,
            image
        });
        await product.save();
        res.redirect("/products");
    } catch (error) {
        console.log(error);
        res.send("Add Product Failed");
    }
}
const showProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.render("pages/products", { products });
    } catch (error) {
        console.log(error);
        res.send("cannot fetch products");
    }
}
const showSingleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.send("product not found");
        }
        res.render("pages/productDetails", { product });
    } catch (error) {
        console.log(error);
        res.send("Failed to fetch product details");
    }
}
const showCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.session.user
        }).populate("items.product");
        let totalPrice=0;
        if(cart){
            cart.items.forEach(item=>{
                totalPrice+=(item.product.price*item.quantity);
            })
        }
        res.render("pages/cart", { cart ,totalPrice})

    } catch (error) {
        console.log(error.message);
        res.render("Cannot Load Cart")
    }
}
const addToCart = async (req, res) => {
    try {
        const productId = req.params.id;
        const userId = req.session.user;
        let cart = await Cart.findOne({
            user: userId
        });
        if (!cart) {
            cart = new Cart({
                user: userId,
                items: [{
                    product: productId,
                    quantity: 1
                }
                ]
            })
        }
        else {
            const existingItem = cart.items.find(item => item.product.toString() === productId);
            if (!existingItem) {
                cart.items.push({
                    product: productId,
                    quantity: 1
                });
            } else {
                existingItem.quantity += 1;
            }
        }
        await cart.save();
        res.redirect("/cart")
    } catch (error) {
        console.log(error.message);
        res.send("Failed to Add product to Cart")
    }
}
module.exports = {
    showAddProductPage,
    addProduct,
    showProducts,
    showSingleProduct,
    showCart,
    addToCart
}