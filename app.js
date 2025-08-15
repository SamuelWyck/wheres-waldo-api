const express = require("express");
const cors = require("cors");
require("dotenv").config();
const iconsRoute = require("./routes/iconsRoute.js");



const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/", function(req, res) {
    return res.send("hello");
});
app.use("/icons", iconsRoute);



const PORT = process.env.PORT;

app.listen(PORT, function() {
    console.log(`Server running on port ${PORT}!`);
});
