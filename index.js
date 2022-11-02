const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require("./routes/user.js");
const authRoute = require("./routes/auth.js")

const app = express();

dotenv.config();

mongoose
    .connect(
        process.env.MONGO_PASS
    )
    .then(() => {
        console.log("DB connection successful");
    })
    .catch((error) => {
        console.log(error);
    });

app.use(express.json());
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);



port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log("server started on port "+port);
})