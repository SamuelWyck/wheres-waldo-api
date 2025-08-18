const {Router} = require("express");
const leaderboardController = require("../controllers/leaderBoardController.js");



const leaderboardRoute = Router();


leaderboardRoute.get("/", leaderboardController.leaderboardGet);
leaderboardRoute.post("/new", leaderboardController.leaderboardPost);



module.exports = leaderboardRoute;