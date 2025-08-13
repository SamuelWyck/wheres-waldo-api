const {PrismaClient} = require("../generated/prisma");



const prisma = new PrismaClient();


async function getManyImages(options) {
    const images = await prisma.image.findMany(options);
    return images;
};



module.exports = {
    getManyImages
};