const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      process.env.FRONTEND_URL,
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes.js"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes.js"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));

// Serve React frontend in production
app.use(express.static(path.join(__dirname, "../frontend/build")));

// React Router fallback
// app.get("*", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "../frontend/build", "index.html")
//   );
// });

app.use((req, res) => {
  res.sendFile(
    path.join(__dirname, "../frontend/build", "index.html")
  );
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});














// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");

// dotenv.config();

// connectDB();

// const app = express();

// // CORS
// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//       "http://127.0.0.1:3000",
//       process.env.FRONTEND_URL,
//     ],
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Backend test route
// app.get("/", (req, res) => {
//   res.send("ShopNest Backend is running");
// });

// // API routes
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/products", require("./routes/productRoutes.js"));
// app.use("/api/orders", require("./routes/orderRoutes"));
// app.use("/api/payment", require("./routes/paymentRoutes.js"));
// app.use("/api/analytics", require("./routes/analyticsRoutes"));

// // Start server
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });









// const path = require("path");
// const express= require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectDB = require('./config/db'); // function declaration
// dotenv.config();

// connectDB(); // function call

// const app = express();
// app.use(cors(
//     {
//         origin:['http://localhost:3000','http://127.0.0.1:3000',process.env.FRONTEND_URL],
//         credentials:true
//     }
// ));
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// app.get("/",(req,res)=>{
//     res.send("Shopnet Backend is working properly");
// });
 
// app.use('/api/auth',require('./routes/authRoutes'));
// app.use('/api/products',require('./routes/productRoutes.js'));
// app.use('/api/orders',require('./routes/orderRoutes'));
// app.use('/api/payment',require('./routes/paymentRoutes.js'));
// app.use('/api/analytics',require('./routes/analyticsRoutes'));

// // Serve frontend in production
// // if (process.env.NODE_ENV === 'production') {
// //   app.use(express.static(path.join(__dirname, '../frontend/build')));
  
// //   app.use((req, res) => {
// //     res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
// //   });
// // } else {
// //   app.get('/', (req, res) => {
// //     res.send('ShopNest API is running in Development mode...');
// //   });
// // }

// // app.get("/", (req, res) => {
// //   res.send("ShopNest Backend is running");
// // });




//  const PORT = process.env.PORT || 5000;
//  app.listen(PORT,()=>{
//     console.log(`server is running on port ${PORT}`);
//  });




