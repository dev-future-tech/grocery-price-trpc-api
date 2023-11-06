import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { publicProcedure, router } from './trpc';
 import pool from "./connect";

const appRouter = router({
  greeting: publicProcedure.query(() => 'hello tRPC v10!'),
  getProducts: publicProcedure.query(async () => {
    const client = await pool.connect();
    const entries = await client.query('SELECT * FROM product');
    console.log(`Database entries: ${entries.rowCount} row(s)`);
    client.release();
  })
});
 
// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
    router: appRouter,
});

server.listen(3000); 