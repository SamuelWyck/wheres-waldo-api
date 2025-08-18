const {PrismaClient} = require("../generated/prisma");



const prisma = new PrismaClient();


async function getManyImages(options) {
    const images = await prisma.image.findMany(options);
    return images;
};


async function findUniqueImage(options) {
    const image = await prisma.image.findUnique(options);
    return image;
};


async function createGameLog(options) {
    const gameLog = await prisma.gameRound.create(options);
    return gameLog;
};


async function deleteManyGameLogs(options) {
    await prisma.gameRound.deleteMany(options);
};


async function findUniqueGameLog(options) {
    const gameLog = await prisma.gameRound.findUnique(options);
    return gameLog;
};


async function findCharCoordsForImg(options) {
    const coordSets = await prisma.characterCoords.findMany(
        options
    );
    return coordSets;
};


async function updateGameLog(options) {
    const gameLog = await prisma.gameRound.update(options);
    return gameLog;
};



module.exports = {
    getManyImages,
    createGameLog,
    findUniqueImage,
    deleteManyGameLogs,
    findUniqueGameLog,
    findCharCoordsForImg,
    updateGameLog
};