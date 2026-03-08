// Import mongoose (MongoDB ke liye)
const mongoose = require('mongoose');

// Import bcrypt (password hash karne ke liye)
const bcrypt = require('bcrypt');

// Create user schema (database ka structure define kar rahe hain)
const userSchema = new mongoose.Schema({

    // Username field
    username: {
        type: String, // string type hoga
        required: [true, "user name is required"] // agar empty hua to error message
    },

    // Email field
    email: {
        type: String,
        required: [true, "email is required"], // email required hai
        unique: [true, "email is already exists with this"] // duplicate email allow nahi karega
    },

    // Password field
    password: {
        type: String,
        required: [true, "Password is required"], // password required hai
        select: false // jab data fetch karenge to password by default nahi aayega
    },
    // Role field (user ya admin)


}, {
    timestamps: true // automatically createdAt & updatedAt add karega
});


// 🔐 Password hash karne ke liye middleware (save hone se pehle chalega)
userSchema.pre("save", async function () {

    // Agar password modify nahi hua to hash mat karo
    if (!this.isModified("password")) {
        return;
    }

    // Password ko hash karo (10 = salt rounds)
    const hash = await bcrypt.hash(this.password, 10);

    // Original password ko hashed password se replace karo
    this.password = hash;

    return;
});


// 🔑 Custom method to compare entered password with hashed password
userSchema.methods.comparePassword = async function (password) {

    // bcrypt compare karega plain password ko hashed password se
    return await bcrypt.compare(password, this.password);
};


// Model create kar rahe hain (UserData collection banegi MongoDB me)
const userModel = mongoose.model("UserData", userSchema);

// Export model
module.exports = userModel;