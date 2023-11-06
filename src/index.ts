import { getClient } from "./connect";

(async () => {
    const client = getClient();
    let select = `SELECT * FROM product`;
    const entries = await client.query(select);
    console.log(`Database entries: ${entries.rowCount} row(s)`);
})();
