const asyncHandler = require("express-async-handler");
const db = require("../db/querys.js");
const {guessVal} = require("../utils/validators.js");
const {validationResult} = require("express-validator");
const remapValue = require("../utils/remapValue.js");
const getCharacterRect = require("../utils/getCharacterRect.js");
const checkRectCollsion = require("../utils/checkRectCollsion.js");
const countFoundCharacters = require("../utils/countFoundCharacters.js");



const gameStartGet = asyncHandler(async function(req, res) {
    const imageId = req.params.imageId;
    if (!imageId) {
        return res.status(400).json({error: "Missing imageId param"});
    }

    const image = await db.findUniqueImage({
        where: {
            id: imageId
        }
    });
    if (!image) {
        return res.status(400).json({error: "Image not found"});
    }

    const gameLog = await db.createGameLog({
        data: {
            imageId: imageId
        }
    });

    return res.json({image: image.url, gameId: gameLog.id});
});



const makeGuessPost = asyncHandler(async function(req, res) {
    const clientTargetBoxWidth = 30;
    const clientTargetBoxHeight = 30;
    const lastCharThreshold = 2;
    const maxCharacters = 3;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const gameId = req.headers["gameid"];
    const gameSession = await db.findUniqueGameLog({
        where: {
            id: gameId
        },
        include: {
            image: true
        }
    });
    if (!gameSession) {
        return res.status(400).json({error: "Game not found"});
    }
    if (countFoundCharacters(gameSession) === maxCharacters) {
        return res.status(400).json({error: "Game already done"});
    }

    const xCoord = Number(req.body.xCoord);
    const yCoord = Number(req.body.yCoord);
    const imageWidth = Number(req.body.imageWidth);
    const imageHeight = Number(req.body.imageHeight);
    const originalImgWidth = gameSession.image.width;
    const originalImgHeight = gameSession.image.height;
    const imageId = gameSession.imageId;
    const character = req.body.character;
    
    const remappedX = remapValue(
        0, imageWidth, 0, originalImgWidth, xCoord
    );
    const remappedY = remapValue(
        0, imageHeight, 0, originalImgHeight, yCoord
    );
    const boxWidth = clientTargetBoxWidth;
    const boxHeight = clientTargetBoxHeight;
    const characterRect = await getCharacterRect(
        imageId, character
    );

    const collide = checkRectCollsion(
        {
            xCoord: remappedX,
            yCoord: remappedY,
            width: boxWidth,
            height: boxHeight
        },
        characterRect
    );

    if (collide && gameSession[character]) {
        return res.json({found: 0, done: false});
    }
    if (!collide) {
        return res.json({found: -1, done: false});
    }

    const lastCharacter = (
        countFoundCharacters(gameSession) == lastCharThreshold
    );
    const query = {
        where: {
            id: gameId
        },
        data: {
        }
    };
    query.data[character] = true;
    if (lastCharacter) {
        query.data.endTime = new Date();
    }
    await db.updateGameLog(query);

    return res.json({found: 1, done: lastCharacter});
});



module.exports = {
    gameStartGet,
    makeGuessPost: [
        guessVal,
        makeGuessPost
    ]
};