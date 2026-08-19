const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const User = require("./model/User");
const Product = require("./model/Product");
const Order = require("./model/Order");

dotenv.config();

connectDB();

const seedData = async () => {
    try {
        // Delete existing data
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        // Password for all users: 123456
        const hashedPassword = await bcrypt.hash("123456", 10);

        // Create Users
        const users = await User.insertMany([
            {
                name: "Admin",
                email: "admin@shopnest.com",
                password: hashedPassword,
                role: "admin",
                verified: true
            },
            {
                name: "Karan",
                email: "karan@gmail.com",
                password: hashedPassword,
                role: "user",
                verified: true
            },
            {
                name: "Rahul",
                email: "rahul@gmail.com",
                password: hashedPassword,
                role: "user",
                verified: true
            }
        ]);

        // Create Products
        const products = await Product.insertMany([
            {
                name: "iPhone 16",
                description: "Apple flagship phone",
                price: 89999,
                category: "Mobile",
                stock: 15,
                imageUrl:
                    "https://dummyimage.com/300x300/000/fff&text=iPhone+16"
            },
            {
                name: "Samsung S25",
                description: "Samsung flagship phone",
                price: 79999,
                category: "Mobile",
                stock: 10,
                imageUrl:
                    "https://dummyimage.com/300x300/000/fff&text=Samsung+S25"
            },
            {
                name: "Boat Headphones",
                description: "Wireless headphones",
                price: 2999,
                category: "Accessories",
                stock: 50,
               imageUrl:
                    "https://dummyimage.com/300x300/000/fff&text=Boat"
            }
        ]);

        // Create Orders
        await Order.insertMany([
            {
                user: users[1]._id,
                products: [
                    {
                        product: products[0]._id,
                        quantity: 1
                    },
                    {
                        product: products[2]._id,
                        quantity: 2
                    }
                ],
                totalAmount: 95997,
                address: {
                    fullName: "Karan Raj",
                    street: "Sector 15",
                    city: "Gurugram",
                    postalCode: "122001",
                    country: "India"
                },
                paymentId: "pay_demo_001",
                status: "pending"
            },
            {
                user: users[2]._id,
                products: [
                    {
                        product: products[1]._id,
                        quantity: 1
                    }
                ],
                totalAmount: 79999,
                address: {
                    fullName: "Rahul Sharma",
                    street: "MG Road",
                    city: "Delhi",
                    postalCode: "110001",
                    country: "India"
                },
                paymentId: "pay_demo_002",
                status: "shipped"
            }
        ]);

        console.log("✅ Dummy data inserted successfully!");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
8
seedData();
