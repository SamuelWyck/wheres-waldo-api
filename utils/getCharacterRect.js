const db = require("../db/querys.js");



async function getCharacterRect(imageId, character) {
    const characterLocals = await db.findCharCoordsForImg({
        where: {
            imageId: imageId
        },
        include: {
            character: true
        }
    });

    for (let characterLocal of characterLocals) {
        const characterName = characterLocal.character.name;
        if (characterName === character) {
            return characterLocal;
        }
    }

    return null;
};



module.exports = getCharacterRect;