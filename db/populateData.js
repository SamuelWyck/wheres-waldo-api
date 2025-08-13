const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const {PrismaClient} = require("../generated/prisma");
const characterCoords = require("./characterCoords.js");



const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.argv[2]
        }
    }
});


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


function cleanData(images, icons) {
    for (let i = 0; i < images.resources.length; i += 1) {
        const image = images.resources[i];
        const newImageData = {
            url: image.secure_url,
            name: parseName(image.display_name),
            width: image.width,
            height: image.height
        };
        images.resources[i] = newImageData;
    }

    for (let i = 0; i < icons.resources.length; i += 1) {
        const icon = icons.resources[i];
        const newIconData = {
            url: icon.secure_url,
            name: parseName(icon.display_name)
        };
        icons.resources[i] = newIconData;
    }
    
    return [images.resources, icons.resources];
};


function parseName(name) {
    const nameParts = name.split("_");
    const nameIndex = 0;
    return nameParts[nameIndex];
};


function addIconToImageData(images, icons) {
    for (let image of images) {
        for (let icon of icons) {
            if (image.name !== icon.name) {
                continue;
            }

            image.iconUrl = icon.url;
            break;
        }
    }
};


function addIdsToCharacterCoords(images, characters) {
    for (let coordSet of characterCoords) {
        for (let image of images) {
            if (image.name !== coordSet.image) {
                continue;
            }

            coordSet.imageId = image.id;
            delete coordSet.image;
            break;
        }

        for (let character of characters) {
            if (character.name !== coordSet.character) {
                continue;
            }

            coordSet.characterId = character.id;
            delete coordSet.character;
            break;
        }
    }
};


async function main() {
    try {
        console.log("seeding...");
        
        let [images, icons] = await Promise.all([
            cloudinary.api
            .resources_by_asset_folder("waldo-images/game-images"),
            cloudinary.api
            .resources_by_asset_folder("waldo-images/game-icons")
        ]);

        [images, icons] = cleanData(images, icons);
        addIconToImageData(images, icons);

        const [savedImages, characters] = await Promise.all([
            prisma.image.createManyAndReturn({
                data: images
            }),
            prisma.character.createManyAndReturn({
                data: [
                    {name: "waldo"},
                    {name: "wilma"},
                    {name: "wizard"}
                ]
            })
        ]);
        
        addIdsToCharacterCoords(savedImages, characters);
        
        await prisma.characterCoords.createMany({
            data: characterCoords
        });

        console.log("done");
    } catch (err) {
        console.log(err)
    }
};


main();