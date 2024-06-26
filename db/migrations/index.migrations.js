import db from "../index.db.js"
import createTodosTable from "./create-todos-table.js";

export const runDbMigrations = async () => {
    console.log('BEGIN DB MIGRATION......');

    // use single client forn transactions
    const client = await db.connect()

    try {
        await client.query('BEGIN'); // begin transaction

        await client.query(createTodosTable);

        await client.query('COMMIT') // commit transaction

        console.log('END DB MIGRATION');
    } catch (e) {
        await client.query('ROLLBACK') // rollback transaction

        console.log('DB migration failed');

        throw e
    } finally {
        client.release()
    }
}