const {Router} = require("express");
const gameController = require("../controllers/gameController.js");
const cleanGameRecords = require("../utils/cleanGameRecords.js");



const gameRoute = Router();

gameRoute.get("/start/:imageId", cleanGameRecords, gameController.gameStartGet);



module.exports = gameRoute;