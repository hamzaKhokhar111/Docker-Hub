const mongoose=require('mongoose');
const express=require('express');
const User = require('../models/user.model');
const router=express.Router();
const bcryptjs=require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const stripe=require('stripe')("use secret key")

router.post('/signup',async(req,resp,next)=>{
    const {username,email,password}=req.body;
    const hashedPassword=bcryptjs.hashSync(password,10);
    const newUser=new User({username,email,password:hashedPassword});
    try {
        await newUser.save();
        resp.status(201).json("USer created successufully");
    } catch(error) {
        next(error)
        
    }
});

router.post('/signin',async(req,resp)=>{
    const {username,password}=req.body;
    try {
        const existinguser=await User.findOne({username});
        if(!existinguser){
            return resp.status(404).json({message:'User not find'})
        }

        const isPasswordCorrect=bcryptjs.compareSync(password,existinguser.password);
        if(!isPasswordCorrect){
            return resp .status(401).json({message:"Invalid Credentials"});
        }
        resp.status(201).json("USer successufully login");

    } catch(error) {
        next(error)
        
    }
})

router.get('/test',(req,resp)=>{
    resp.send("Welcome to My life My namwe is Hamza Ashraf khokhar")
})


router.post("/create-checkout-session", async (req, res) => {
    try {
        const { product } = req.body;

        // Validate the product
        if (!product || !product.name || !product.price) {
            return res.status(400).json({ error: "Invalid product data" });
        }

        // Create a Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: product.name,
                        },
                        unit_amount: product.price * 100, // Amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: "http://localhost:5173/success", // Redirect URL after successful payment
            cancel_url: "http://localhost:5173/cancel", // Redirect URL after canceled payment
        });

        res.json({ id: session.id }); // Send the session ID to the frontend
    } catch (err) {
        console.error("Error creating checkout session:", err);
        res.status(500).json({ error: err.message });
    }
});

// router.post("/create-checkout-session", async (req, res) => {
//     try {
//         const { product, token } = req.body;
//         console.log("PRODUCT:", product);
//         console.log("PRICE:", product.price);

//         const idempotencyKey = uuidv4();

//         // Create a customer
//         const customer = await stripe.customers.create({
//             email: token.email,
//             source: token.id
//         });

//         // Create a charge
//         const charge = await stripe.charges.create({
//             amount: product.price * 100,
//             currency: "usd",
//             customer: customer.id,
//             receipt_email: token.email,
//             description: `Purchase of ${product.name}`,
//             shipping: {
//                 name: token.card.name,
//                 address: {
//                     country: token.card.address_country
//                 }
//             }
//         }, { idempotencyKey });

//         res.status(200).json(charge);

//     } catch (err) {
//         console.error("Error:", err);
//         res.status(500).json({ error: err.message });
//     }
// });


// router.post("/create-checkout-session",(req,resp)=>{
//     const {product, token}=req.body;
//     console.log("PRODUCT ", product);
//     console.log("PRICE",product.price);
//     const   idempotency=uuid();
//     return stripe.customers.create({
//         email: token.email,
//         source:token.id
//     }).then(customer=>{ 
//         stripe.charges.create({
//             amount:product.price * 100,
//             currency:'usd',
//             customer: customer.id,
//             receipt_email:token.email,
//             description:`purchase of product.name`,
//             shipping:{
//                 name:token.card.name,
//                 address:{
//                     country:token.card.address_country
//                 }
//             }

//         },{idempotency})
//     }).then(result=>res.status(200).json(result)).catch(err=>console.log(err))
// })

// router.post("/create-checkout-session", async (req, res) => {
//     try {
//         // Ensure request body contains products
//         const { products } = req.body;
//         if (!products || !Array.isArray(products) || products.length === 0) {
//             return res.status(400).json({ error: "Invalid products data" });
//         }

//         const lineItems = products.map(product => ({
//             price_data: {
//                 currency: "usd",
//                 product_data: {
//                     name: product.name, // Ensure this exists
//                     images: product.images ? [product.images] : [],
//                 },
//                 unit_amount: product.price * 100,
//             },
//             quantity: product.quantity || 1,
//         }));

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             line_items: lineItems,
//             mode: "payment",
//             success_url: "http://localhost:3000/success",
//             cancel_url: "http://localhost:3000/cancel",
//         });

//         res.json({ id: session.id });
//     } catch (error) {
//         console.error("Error creating checkout session:", error);
//         res.status(500).json({ error: error.message });
//     }
// });



module.exports=router;