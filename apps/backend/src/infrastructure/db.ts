// apps/backend/src/infrastructure/db.ts
import { PrismaClient } from '@prisma/client/extension';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

// Используем DATABASE_URL для рантайма (через пулер Supabase)
const connectionString = process.env.DATABASE_URL;

// 1. Создаем пул соединений
const pool = new pg.Pool({ connectionString });

// 2. Оборачиваем его в адаптер Prisma
const adapter = new PrismaPg(pool);

// 3. Создаем единый экземпляр клиента для всего приложения
export const prisma = new PrismaClient({ adapter });

// Полезно для отладки: проверка соединения при старте (опционально)
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});