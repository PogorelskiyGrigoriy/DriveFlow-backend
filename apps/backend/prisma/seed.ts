import { PrismaClient, Role } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { faker } from '@faker-js/faker';
import { hashSync, genSaltSync } from 'bcrypt-ts';

const INSTRUCTOR_PASSWORD_RAW = 'teacher123';
const STUDENT_PASSWORD_RAW = 'student123';

const salt = genSaltSync(10);
const INSTRUCTOR_HASH = hashSync(INSTRUCTOR_PASSWORD_RAW, salt);
const STUDENT_HASH = hashSync(STUDENT_PASSWORD_RAW, salt);

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DIRECT_URL or DATABASE_URL not found in process.env');
}

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting Seeding...');
  console.log(`Instructor Password: ${INSTRUCTOR_PASSWORD_RAW}`);
  console.log(`Student Password: ${STUDENT_PASSWORD_RAW}`);

  console.log('Cleaning up database...');
  await prisma.availability.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.studentProfile.deleteMany();
  await prisma.instructorProfile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.school.deleteMany();

  const school = await prisma.school.create({
    data: {
      name: 'DriveFlow Academy Beer Sheva',
      address: 'Ha-Atsmaut St 42, Beer Sheva',
      lessonDuration: 45,
    },
  });
  console.log(`School created: ${school.name}`);

  const ownerUser = await prisma.user.create({
    data: {
      email: 'owner@driveflow.me',
      passwordHash: INSTRUCTOR_HASH,
      role: Role.OWNER,
      firstName: 'Liron',
      lastName: 'Owner',
      phoneNumber: '+972501112233',
      schoolId: school.id,
      instructorProfile: {
        create: {
          licenseCategories: ['A', 'B', 'C'],
        },
      },
    },
  });
  console.log('Owner/Instructor created');

  await prisma.user.create({
    data: {
      email: 'admin@driveflow.me',
      passwordHash: INSTRUCTOR_HASH,
      role: Role.ADMIN,
      firstName: 'Grisha',
      lastName: 'Manager',
      phoneNumber: '+972504445566',
      schoolId: school.id,
    },
  });
  console.log('Admin created');

  const instructorIds: string[] = [];
  
  const ownerProfile = await prisma.instructorProfile.findUnique({ where: { userId: ownerUser.id } });
  if (ownerProfile) instructorIds.push(ownerProfile.id);

  for (let i = 1; i <= 4; i++) {
    const instructor = await prisma.user.create({
      data: {
        email: `teacher${i}@driveflow.me`,
        passwordHash: INSTRUCTOR_HASH,
        role: Role.INSTRUCTOR,
        firstName: faker.person.firstName('male'),
        lastName: faker.person.lastName(),
        phoneNumber: faker.phone.number(),
        schoolId: school.id,
        instructorProfile: {
          create: {
            licenseCategories: ['B'],
          },
        },
      },
      include: { instructorProfile: true },
    });
    if (instructor.instructorProfile) instructorIds.push(instructor.instructorProfile.id);
  }
  console.log('4 additional instructors created');

  console.log('Creating 20 students...');
  for (let i = 1; i <= 20; i++) {
    const randomInstructorId = instructorIds[Math.floor(Math.random() * instructorIds.length)];
    
    await prisma.user.create({
      data: {
        email: `student${i}@driveflow.me`,
        passwordHash: STUDENT_HASH,
        role: Role.STUDENT,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phoneNumber: faker.phone.number(),
        schoolId: school.id,
        studentProfile: {
          create: {
            instructorId: randomInstructorId,
            balance: 5,
            totalLessons: 0,
          },
        },
      },
    });
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });