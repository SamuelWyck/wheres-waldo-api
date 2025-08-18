const {header, body} = require("express-validator");
const db = require("../db/querys.js");



function isValidCharacter(character) {
    const characters = new Set([
        "waldo",
        "wizard",
        "wilma"
    ]);

    return characters.has(character);
};


async function isUniqueName(name) {
    const entry = await db.findUniqueLeaderboardEntry({
        where: {
            username: name
        }
    });

    if (entry) {
        throw new Error("Name already taken");
    }

    return true;
};


const guessVal = [
    header("gameid").trim()
        .notEmpty().withMessage("Missing game id"),
    body("xCoord").trim()
        .notEmpty().withMessage("Missing x coordinate")
        .isNumeric().withMessage("Invalid x coordinate"),
    body("yCoord").trim()
        .notEmpty().withMessage("Missing y coordinate")
        .isNumeric().withMessage("Invalid y coordinate"),
    body("character").trim()
        .notEmpty().withMessage("Missing character field")
        .custom(isValidCharacter).withMessage("Invalid character"),
    body("imageWidth").trim()
        .notEmpty().withMessage("Missing image width")
        .isNumeric().withMessage("Invalid image width"),
    body("imageHeight").trim()
        .notEmpty().withMessage("Missing image height")
        .isNumeric().withMessage("Invalid image height")
];



const leaderboardVal = [
    header("gameid").trim()
        .notEmpty().withMessage("Missing game id"),
    body("name").trim()
        .notEmpty().withMessage("Name required")
        .isLength({max: 100}).withMessage("Name must be less than 100 characters")
        .custom(isUniqueName).withMessage("Name already taken")
];



module.exports = {
    guessVal,
    leaderboardVal
};