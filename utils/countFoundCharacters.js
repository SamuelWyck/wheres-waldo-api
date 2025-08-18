function countFoundCharacters(gameLog) {
    const characterList = ["waldo", "wilma", "wizard"];
    let count = 0;
    for (let character of characterList) {
        if (gameLog[character]) {
            count += 1;
        }
    }

    return count;
};



module.exports = countFoundCharacters;