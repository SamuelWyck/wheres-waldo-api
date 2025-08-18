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


async function deleteGameLog(options) {
    const gameLog = await prisma.gameRound.delete(options);
    return gameLog;
};


async function findUniqueLeaderboardEntry(options) {
    const entry = await prisma.leaderboard.findUnique(options);
    return entry;
};


async function createLeaderboardEntry(options) {
    const entry = await prisma.leaderboard.create(options);
    return entry;
};


async function findLeaderboardEntry(options) {
    const entry = await prisma.leaderboard.findFirst(options);
    return entry;
};


async function deleteLeaderboardEntry(options) {
    const entry = await prisma.leaderboard.delete(options);
    return entry;
};


async function findManyLeaderboardEntries(options) {
    const entries = await prisma.leaderboard.findMany(options);
    return entries;
};



module.exports = {
    getManyImages,
    createGameLog,
    findUniqueImage,
    deleteManyGameLogs,
    findUniqueGameLog,
    findCharCoordsForImg,
    updateGameLog,
    deleteGameLog,
    findUniqueLeaderboardEntry,
    createLeaderboardEntry,
    findLeaderboardEntry,
    deleteLeaderboardEntry,
    findManyLeaderboardEntries
};