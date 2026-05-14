import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import logger from '../utils/pino-logger.js';

/**
 * Factory to create a PrismaClient instance with a PostgreSQL adapter.
 * Supports custom connection strings, which is essential for Seeding or Migrations.
 */
export function createPrismaClient(connectionString?: string) {
  const url = connectionString || process.env.DATABASE_URL;

  if (!url) {
    throw new Error('Database connection string is missing. Check your .env file.');
  }

  const pool = new pg.Pool({ connectionString: url });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  pool.on('error', (err) => {
    logger.error(err, 'Unexpected error on idle SQL client');
  });

  return { prisma, pool };
}

/**
 * Default instance for application runtime.
 * Uses standard DATABASE_URL (typically via connection pooler).
 */
export const { prisma, pool } = createPrismaClient();