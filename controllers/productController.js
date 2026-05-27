const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");

const showAddProductPage = (req, res) => {
    res.render("pages/addProduct");
}
const addProduct = async (req, res) => {
    try {
        const userId = req.session.user;
        const { title, description, price, image } = req.body;
        const product = new Product({
            user: userId,
            title,
            description,
            price,
            image
        });
        await product.save();
        res.redirect("/products");
    } catch (error) {
        res.json({ message: "Add Product Failed" });
    }
}
const showProducts = async (req, res) => {
    try {
        const userId = req.session.user;
        const search = req.query.search || "";
        const regex = new RegExp(search, "i");
        let products;
        if (search.trim() === "" || !search) {
            products = await Product.find().populate("user");
            products.forEach(product => {
                if (product.user._id.toString() === userId) {
                    product.user.isAdmin = true;
                }
            });
        }
        else {
            products = await Product.find({
                title: regex
            });
        }

        res.render("pages/products", { products });
    } catch (error) {
        console.log(error.message);
        res.json({ Error_message: "cannot fetch products" });
    }
}
const showSingleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.json({ message: "product not found" });
        }
        res.render("pages/productDetails", { product });
    } catch (error) {
        res.json({ message: "Failed to fetch product details" });
    }
}
const showCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.session.user
        }).populate("items.product");
        let totalPrice = 0;
        if (cart) {
            cart.items.forEach(item => {
                totalPrice += (item.product.price * item.quantity);
            })
        }
        res.render("pages/cart", { cart, totalPrice })

    } catch (error) {
        res.json({ message: "Cannot Load Cart" })
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
        res.json({ message: "Failed to Add product to Cart" })
    }
}
const removeFromCart = async (req, res) => {
    try {
        const userId = req.session.user;
        const productId = req.params.id;
        let cart = await Cart.findOne({
            user: userId
        })
        if (!cart) {
            return res.redirect("/cart");
        }
        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        await cart.save();
        res.redirect("/cart");
    } catch (error) {
        res.json({ message: "Failed to remove from Product" });
    }
}
const increaseQuantity = async (req, res) => {
    try {
        let cart = await Cart.findOne({
            user: req.session.user
        });
        if (!cart) {
            return res.redirect("/cart");
        }
        const item = cart.items.find(item => item.product.toString() === req.params.id);
        if (item) {
            item.quantity += 1;
        }
        await cart.save();
        res.redirect("/cart");
    } catch (error) {
        res.json({ message: "Failed to increase quantity of product" });
    }
}
const decreaseQuantity = async (req, res) => {
    try {
        let cart = await Cart.findOne({
            user: req.session.user
        });
        if (!cart) {
            return res.redirect("/cart");
        }
        const item = cart.items.find(item => item.product.toString() === req.params.id);
        if (item && item.quantity > 1) {
            item.quantity -= 1;
        }
        await cart.save();
        res.redirect("/cart");
    } catch (error) {
        res.json({ message: "Failed to decrease quantity of product" });
    }
}
const checkout = async (req, res) => {
    try {
        let cart = await Cart.findOne({
            user: req.session.user
        }).populate("items.product");
        if (!cart || cart.items.length === 0) {
            return res.json({ message: "Cart is Empty" });
        }
        let totalPrice = 0;
        cart.items.forEach(item => totalPrice += (item.product.price * item.quantity));
        const order = new Order({
            user: req.session.user,
            items: cart.items.map(item => ({
                product: item.product._id,
                quantity: item.quantity
            })),
            totalPrice
        });
        await order.save();
        cart.items = [];
        await cart.save();
        res.redirect("/orders")

    } catch (error) {
        res.json({ message: "Failed to Checkout" })
    }
}
const showOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.session.user
        }).populate("items.product");
        res.render("pages/orders", { orders })

    } catch (error) {
        res.json({ message: "Failed to load Orders" })
    }
}
const removeProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        await Product.findByIdAndDelete(productId);
        res.redirect("/products")
    }
    catch (error) {
        res.json({ message: "Cannot Delete Product" })
    }
}
const showEditPage = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.json({ message: "Product Not Found" });
        }
        res.render("pages/editProduct", { product });
    } catch (error) {
        res.json({ message: "Failed to Load Edit Product Page" });
    }
}
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { title, description, image, price } = req.body;
        await Product.findByIdAndUpdate(productId, {
            title,
            description,
            image,
            price
        });
        res.redirect("/products");
    } catch (error) {
        res.json({ message: "Failed to Edit Product" });
    }
}
module.exports = {
    showAddProductPage,
    addProduct,
    showProducts,
    showSingleProduct,
    showCart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    checkout,
    showOrders,
    removeProduct,
    showEditPage,
    updateProduct
}