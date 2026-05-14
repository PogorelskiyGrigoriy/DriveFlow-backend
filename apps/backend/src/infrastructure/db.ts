/**
 * Database infrastructure setup using Prisma with PostgreSQL adapter.
 */
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import logger from '@/utils/pino-logger.js';

const connectionString = process.env.DATABASE_URL;

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });

pool.on('error', (err) => {
  logger.error(err, 'Unexpected error on idle SQL client');
});