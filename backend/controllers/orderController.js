const Order = require('../model/Order');
const sendEmail = require('../utlis/sendEmail');

// create a new order
const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, address, paymentId } = req.body;

        console.log("Items:", items);

        if (!items || items.length === 0 || !totalAmount || !address) {
            return res.status(400).json({
                message: "Invalid order data"
            });
        }

        const products = items.map(item => ({
            product: item.productId,
            quantity: item.qty
        }));

        const order = new Order({
            user: req.user._id,
            products,
            totalAmount,
            address,
            paymentId
        });

        await order.save();

        const message = `Dear ${req.user.name},

Thank you for your order! Your order has been successfully created.

Order ID: ${order._id}
Total Amount: ₹${totalAmount}

Shipping Address:
${address.fullName}
${address.street}
${address.city}
${address.postalCode}
${address.country}

We will notify you once your order is shipped.

Best regards,
ShopNest Team`;

        // Email failure should not make order creation fail
        try {
            await sendEmail(
                req.user.email,
                "Order Created",
                message
            );
        } catch (emailError) {
            console.error("EMAIL ERROR:", emailError);
        }

        res.status(201).json({
            message: "Order created successfully",
            order
        });

    } catch (error) {
        console.error("CREATE ORDER ERROR:", error);

        res.status(500).json({
            message: "Error creating order",
            error: error.message
        });
    }
};

const myOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user._id
        }).populate("products.product", "name price");

        res.json(orders);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching orders",
            error: error.message
        });
    }
};

const getOrders = async (req,res)=>{
    try{
        const orders = await Order.find({}).populate("user", "name email")
        res.json(orders);
    }catch(error){
        res.status(500).json({message:'Error fetching orders',error});
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findById(req.params.id);

        if (order) {
            order.status = status;
            await order.save();

            res.json({
                message: 'Order status updated',
                order
            });
        } else {
            res.status(404).json({
                message: 'Order not Found'
            });
        }

    } catch (error) {
        res.status(500).json({
            message: 'Error updating order status',
            error: error.message
        });
    }
};

module.exports = {
    createOrder,
    myOrders,
    getOrders,
    updateOrderStatus
};