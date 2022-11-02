const {getUser} = require("../persistance/userPersistance");

const user = async (req,res) => {
    
    try {
        const foundUser = await getUser(req.body.username, req.body.email);
        res.status(200).json(foundUser);
    } catch (error) {
        res.status(500).json(error);
    }
};

const postUserTest = (req,res) => {
    const username = req.body.username;
    res.send("Your username is: "+username);
};

module.exports = {user, postUserTest};
