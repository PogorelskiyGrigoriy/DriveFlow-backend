import { Role, LessonStatus } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { createPrismaClient } from '../src/infrastructure/db.js';
import { hash } from 'bcrypt-ts';

// Используем паттерн фабрики с приоритетом DIRECT_URL для сида
const { prisma, pool } = createPrismaClient(process.env.DIRECT_URL || process.env.DATABASE_URL);

async function main() {
  console.log('🚀 Starting MVP Database Seeding...');

  // 1. Очистка БД в строгом порядке из-за ограничений внешних ключей (Foreign Keys)
  console.log('🧹 Cleaning up database...');
  await prisma.magicToken.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.instructorAvailability.deleteMany();
  await prisma.user.deleteMany();

  const demoPasswordHash = await hash('password123', 10);

  // 2. Создаем главного Инструктора для демонстрации
  console.log('👤 Creating main instructor for demo...');
  const mainInstructor = await prisma.user.create({
    data: {
      phoneNumber: '+972501112233', // Статичный номер для тестов входа
      firstName: 'Eli',
      lastName: 'Cohen',
      role: Role.INSTRUCTOR,
    },
  });
  console.log(`Main instructor created: ${mainInstructor.firstName} ${mainInstructor.lastName}`);

  // 3. Задаем рабочие часы (Воскресенье - Четверг, с 08:00 до 17:00)
  // Массив включает часы начала уроков: 8, 9, 10, 11, 12, 13, 14, 15, 16. (17:00 - это конец смены)
  console.log('📅 Setting up availability (Sun-Thu, 08:00-17:00)...');
  for (let day = 0; day <= 4; day++) {
    await prisma.instructorAvailability.create({
      data: {
        instructorId: mainInstructor.id,
        dayOfWeek: day,
        hours: [8, 9, 10, 11, 12, 13, 14, 15, 16], 
      },
    });
  }

  // 4. Создаем пару дополнительных инструкторов для реалистичности
  const secondaryInstructors = [];
  for (let i = 1; i <= 2; i++) {
    const teacher = await prisma.user.create({
      data: {
        phoneNumber: `+97250999000${i}`,
        firstName: faker.person.firstName('male'),
        lastName: faker.person.lastName(),
        role: Role.INSTRUCTOR,
      },
    });
    secondaryInstructors.push(teacher);
    
    // Минимальный график для них (с 09:00 до 16:00)
    await prisma.instructorAvailability.create({
      data: { 
        instructorId: teacher.id, 
        dayOfWeek: 0, 
        hours: [9, 10, 11, 12, 13, 14, 15] 
      }
    });
  }

  // 5. Создаем 15 учеников и привязываем их к учителям
  console.log('👥 Creating 15 students...');
  const students = [];
  for (let i = 1; i <= 15; i++) {
    // 10 учеников гарантированно отдаем главному инструктору, остальных распределяем случайно
    const assignedInstructor = i <= 10 ? mainInstructor : secondaryInstructors[Math.floor(Math.random() * secondaryInstructors.length)];
    const paddedIndex = String(i).padStart(2, '0');
    
    const student = await prisma.user.create({
      data: {
        phoneNumber: `+9725211100${paddedIndex}`,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        role: Role.STUDENT,
        instructorId: assignedInstructor.id,
      },
    });
    students.push(student);
  }

  // 6. Генерируем тестовые уроки для Eli Cohen (чтобы дашборд сразу ожил)
  console.log('🚗 Seeding sample lessons for the dashboard...');
  const eliStudents = students.filter(s => s.instructorId === mainInstructor.id);

  if (eliStudents.length >= 3) {
    // 1. Прошедший вчерашний урок
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(14, 0, 0, 0);

    await prisma.lesson.create({
      data: {
        instructorId: mainInstructor.id,
        studentId: eliStudents[0].id,
        startTime: yesterday,
        status: LessonStatus.COMPLETED,
      },
    });

    // 2. Предстоящий урок на завтра в 10:00
    const tomorrow1 = new Date();
    tomorrow1.setDate(tomorrow1.getDate() + 1);
    tomorrow1.setHours(10, 0, 0, 0);

    await prisma.lesson.create({
      data: {
        instructorId: mainInstructor.id,
        studentId: eliStudents[1].id,
        startTime: tomorrow1,
        status: LessonStatus.SCHEDULED,
      },
    });

    // 3. Предстоящий урок на завтра в 11:00
    const tomorrow2 = new Date();
    tomorrow2.setDate(tomorrow2.getDate() + 1);
    tomorrow2.setHours(11, 0, 0, 0);

    await prisma.lesson.create({
      data: {
        instructorId: mainInstructor.id,
        studentId: eliStudents[2].id,
        startTime: tomorrow2,
        status: LessonStatus.SCHEDULED,
      },
    });
  }

  console.log('🎉 Seeding successfully completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });