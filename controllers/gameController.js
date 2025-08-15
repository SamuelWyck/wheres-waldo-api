const asyncHandler = require("express-async-handler");
const db = require("../db/querys.js");



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



module.exports = {
    gameStartGet
};