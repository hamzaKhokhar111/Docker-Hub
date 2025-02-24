// const mongoose =require("mongoose");
const mongoose=require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database is connected");
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Process ko exit kar do agar DB connect nahi hoti
    }
};

module.exports = connectDB; // ✅ CommonJS export
