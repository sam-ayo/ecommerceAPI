const express = require("express");
const router = express.Router()
const {user,postUserTest} = require("../controllers/userController.js");

router.get("/user",user);
router.post("/user",postUserTest);

module.exports = router