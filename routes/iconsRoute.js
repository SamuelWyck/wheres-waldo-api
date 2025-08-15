const {Router} = require("express");
const iconsController = require("../controllers/iconsController.js");



const iconsRoute = Router();


iconsRoute.get("/", iconsController.getIconsGet);



module.exports = iconsRoute;