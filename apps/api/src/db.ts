import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@tempexpo/db';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/tempexpo';

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });
