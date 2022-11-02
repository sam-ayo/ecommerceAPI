const userModule = require("../models/User.js");
const dotenv = require("dotenv");
var cryptoJS = require("crypto-js");
const jwt  = require("jsonwebtoken");
const User = userModule.User;
dotenv.config();


// Create user 
async function createUser(username=null, email=null, password=null,isAdmin=false) {
    // Create new user and save into database
    const newUser = new User({
        username:username,
        email:email,
        password:cryptoJS.AES.encrypt(password, process.env.PASSKEY).toString(),
        isAdmin:isAdmin
    })
    return await newUser.save();
}

// Get User 
async function getUser(username=null, password=null) {
    // get user from database
    try{
        const foundUser = await User.findOne({username:username});

        if (!foundUser) return "Wrong credentials";

        const db_password = cryptoJS.AES.decrypt(foundUser.password, process.env.PASSKEY).toString(cryptoJS.enc.Utf8);
        if (db_password == password){
            const accessToken = jwt.sign({
                id: foundUser.id,
                isAdmin:foundUser.isAdmin
            }, process.env.JWTKEY,{expiresIn:"3d"});
            const {password, ...others } = foundUser._doc;  // send user info without password
            return {others, accessToken};
        }else{
            return "Wrong credentials";
        }
    } catch (err) {
        return err
    }
}


module.exports = {createUser, getUser}