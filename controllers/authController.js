const {createUser, getUser} = require("../persistance/userPersistance");

// Register new User
const registerUser = async (req,res) => {
    try {
        const savedUser = await createUser(req.body.username, req.body.email, req.body.password);
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Login User
const loginUser = async (req,res) => {
    try {
        const findUser = await getUser(req.body.username, req.body.password);

        // show a success (201) message if findUser is a User object else error message(401)
        if (typeof findUser === 'object' && findUser !== null && !Array.isArray(findUser)){
            res.status(200).json(findUser);
        }
        else{
            res.status(401).json(findUser);
        }
        
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {registerUser,loginUser};
