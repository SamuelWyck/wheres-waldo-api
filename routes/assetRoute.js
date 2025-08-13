const {Router} = require("express");
const assetController = require("../controllers/assetController.js");



const assetRoute = Router();


assetRoute.get("/icons", assetController.getIconsGet);



module.exports = assetRoute;