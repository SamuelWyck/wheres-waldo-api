const {header, body} = require("express-validator");



function isValidCharacter(character) {
    const characters = new Set([
        "waldo",
        "wizard",
        "wilma"
    ]);

    return characters.has(character);
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




module.exports = {
    guessVal
};