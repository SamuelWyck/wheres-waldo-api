const {Client} = require("pg");



let SQL = [
    "CREATE OR REPLACE FUNCTION delete_old_record() RETURNS TRIGGER AS $$ ",
    "BEGIN ",
    "IF NOW() - NEW.startTime > '1 minute' THEN ",
    'DELETE FROM "GameRound" WHERE id = NEW.id; ',
    "END IF; ",
    "END; ",
    "$$ LANGUAGE plpgsql; ",
    " ",
    "CREATE OR REPLACE TRIGGER clean_record ",
    'AFTER UPDATE OR INSERT ON "GameRound" ',
    "FOR EACH ROW EXECUTE FUNCTION delete_old_record();"
];

SQL = SQL.join("");

async function main() {
    console.log("Creating trigger...");
    const client = new Client({
        connectionString: process.argv[2]
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
};


main();