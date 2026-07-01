import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

/**
 * Drizzle client over a standard Postgres connection (works with Neon,
 * DigitalOcean Managed Postgres, Supabase, etc.). `postgres-js` connects
 * lazily on first query, so importing this without DATABASE_URL is safe —
 * queries only fail if the app actually tries to use the DB unconfigured.
 */
export const isDbConfigured = Boolean(process.env.DATABASE_URL);

const connectionString = process.env.DATABASE_URL ?? 'postgres://placeholder';

// Reuse the client across hot reloads / serverless invocations.
const globalForDb = globalThis as unknown as { _pg?: ReturnType<typeof postgres> };

const client =
  globalForDb._pg ??
  postgres(connectionString, {
    max: 5,
    prepare: false, // friendlier to pooled/serverless Postgres
  });

if (process.env.NODE_ENV !== 'production') globalForDb._pg = client;

export const db = drizzle(client, { schema });
