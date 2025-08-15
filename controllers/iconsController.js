const asyncHandler = require("express-async-handler");
const db = require("../db/querys.js");



const getIconsGet = asyncHandler(async function(req, res) {
    const images = await db.getManyImages({
        select: {
            iconUrl: true,
            id: true
        }
    });

    if (!images) {
        return res.json({error: "Icons not found"});
    }

    for (let image of images) {
        image.imageId = image.id;
        delete image.id;
    }

    return res.json({icons: images});
});



module.exports = {
    getIconsGet
};