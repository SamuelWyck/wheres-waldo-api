const {Router} = require("express");
const gameController = require("../controllers/gameController.js");
const cleanGameRecords = require("../utils/cleanGameRecords.js");



const gameRoute = Router();


gameRoute.use(cleanGameRecords);

gameRoute.get("/start/:imageId", gameController.gameStartGet);
gameRoute.post("/guess", gameController.makeGuessPost);



module.exports = gameRoute;