import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { publicProcedure, router } from './trpc';
 import pool from "./connect";
import { z } from 'zod';


type Product = {
    product_id: number;
    product_name: string;
    sku: string;
    description: string;
};

const appRouter = router({
  greeting: publicProcedure.query(() => 'hello tRPC v10!'),
  getProducts: publicProcedure
  .input(z.string())
  .query(async (opts) => {
    const { input } = opts;
    const client = await pool.connect();
    const entries = await client.query(`SELECT * FROM products limit ${input}`);
    console.log(`Database entries: ${entries.rowCount} row(s)`);
    client.release();
    return entries;
  })
});
 
// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
    router: appRouter,
});

server.listen(3000); 