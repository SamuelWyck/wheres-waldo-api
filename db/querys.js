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



module.exports = {
    getManyImages,
    createGameLog,
    findUniqueImage,
    deleteManyGameLogs
};