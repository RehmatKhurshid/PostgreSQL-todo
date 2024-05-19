import express from 'express';
import 'dotenv/config';
const app = express();

import todoRouter from './todo/todo-router.js'
import { runDbMigrations } from './db/migrations/index.migrations.js';

app.use(express.json());

app.use('/todos' , todoRouter);

async function start() {
    //db connection is ok?
    await runDbMigrations();

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`port is running on port ${port}`);
    });
}

start();