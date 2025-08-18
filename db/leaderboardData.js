const leaderboardEntries = [];

const fiveHours = 3600000 * 5;

for (let i = 0; i < 20; i += 1) {
    const entry = {
        time: fiveHours
    }
    entry.username = `Player-${i + 1}`;
    leaderboardEntries.push(entry);
}



module.exports = leaderboardEntries;