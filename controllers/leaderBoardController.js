const asyncHandler = require("express-async-handler");
const db = require("../db/querys.js");
const {leaderboardVal} = require("../utils/validators.js");
const {validationResult} = require("express-validator");



const leaderboardPost = asyncHandler(async function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const gameId = req.headers["gameid"];
    const gameSession = await db.deleteGameLog({
        where: {
            id: gameId
        }
    });
    if (!gameSession) {
        return res.status(400).json(
            {errors: [{msg: "Invalid game id"}]}
        );
    }
    if (!gameSession.endTime) {
        return res.status(400).json(
            {errors: [{msg: "Game not done"}]}
        );
    }

    const timeInterval = gameSession.endTime - gameSession.startTime;
    const lowestEntry = await db.findLeaderboardEntry({
        orderBy: {
            time: "desc"
        }
    });
    if (timeInterval > lowestEntry.time) {
        return res.json({result: "success"});
    }
    
    await Promise.all([
        db.createLeaderboardEntry({
            data: {
                time: timeInterval,
                username: req.body.name
            }
        }),
        db.deleteLeaderboardEntry({
            where: {
                id: lowestEntry.id
            }
        })
    ]);

    return res.json({result: "success"});
});


const leaderboardGet = asyncHandler(async function(req, res) {
    const entries = await db.findManyLeaderboardEntries({
        orderBy: {
            time: "asc"
        }
    });
    return res.json({leaderboard: entries});
});



module.exports = {
    leaderboardPost: [
        leaderboardVal,
        leaderboardPost
    ],
    leaderboardGet
};