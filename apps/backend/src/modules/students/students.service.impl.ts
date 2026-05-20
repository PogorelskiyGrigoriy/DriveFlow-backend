import { IStudentsService } from './students.service.js';
import { prisma } from '../../infrastructure/db.js';
import { 
  CreateStudentInput, 
  UpdateStudentInput, 
  InstructorStudentsResponseDTO, 
  StudentMutationResponseDTO,
  BaseStudentType
} from '@driveflow/shared';
import { Role, LessonStatus } from '@prisma/client';
import { AppError, NotFoundError } from '../../utils/app-errors.js';
import logger from '../../utils/pino-logger.js';

export class StudentsServiceImpl implements IStudentsService {
  // Reusable Prisma select block to fulfill BaseStudentType contract automatically
  private static studentSelect = {
    id: true,
    firstName: true,
    lastName: true,
    phoneNumber: true,
    createdAt: true,
  } as const;

  // DRY Helper: Centralized ownership and existence verification
  private async findInstructorStudent(instructorId: string, studentId: string) {
    const student = await prisma.user.findFirst({
      where: { id: studentId, instructorId, role: Role.STUDENT, deletedAt: null },
      select: StudentsServiceImpl.studentSelect,
    });
    if (!student) throw new NotFoundError('Student not found or access denied');
    return student;
  }

  // DRY Helper: Enforces unique phone constraints across active accounts
  private async assertPhoneUnique(phoneNumber: string, excludeStudentId?: string) {
    const conflict = await prisma.user.findFirst({
      where: { phoneNumber, deletedAt: null, NOT: excludeStudentId ? { id: excludeStudentId } : undefined },
    });
    if (conflict) throw new AppError('Phone number is already registered', 409, 'CONFLICT');
  }

  async getInstructorStudents(instructorId: string): Promise<InstructorStudentsResponseDTO> {
    const students = await prisma.user.findMany({
      where: { instructorId, role: Role.STUDENT, deletedAt: null },
      select: {
        ...StudentsServiceImpl.studentSelect,
        lessonsAsStudent: {
          where: { status: { in: [LessonStatus.COMPLETED, LessonStatus.SCHEDULED] } },
          orderBy: { startTime: 'asc' },
        },
      },
    });

    const now = new Date();
    return students.map(({ lessonsAsStudent, ...student }) => ({
      ...student,
      stats: {
        totalLessons: lessonsAsStudent.filter(l => l.status === LessonStatus.COMPLETED).length,
        nextLessonAt: lessonsAsStudent.find(l => l.status === LessonStatus.SCHEDULED && l.startTime > now)?.startTime || null,
      },
    }));
  }

  async getStudentById(instructorId: string, studentId: string): Promise<BaseStudentType> {
    return this.findInstructorStudent(instructorId, studentId);
  }

  async createStudent(instructorId: string, input: CreateStudentInput): Promise<StudentMutationResponseDTO> {
    await this.assertPhoneUnique(input.phoneNumber);

    const student = await prisma.user.create({
      data: { ...input, role: Role.STUDENT, instructorId },
      select: StudentsServiceImpl.studentSelect,
    });

    return { message: 'Student created successfully', student };
  }

  async updateStudent(instructorId: string, studentId: string, input: UpdateStudentInput): Promise<StudentMutationResponseDTO> {
    await this.findInstructorStudent(instructorId, studentId);
    await this.assertPhoneUnique(input.phoneNumber, studentId);

    const student = await prisma.user.update({
      where: { id: studentId },
      data: input,
      select: StudentsServiceImpl.studentSelect,
    });

    return { message: 'Student updated successfully', student };
  }

  async archiveStudent(instructorId: string, studentId: string): Promise<{ message: string }> {
    await this.findInstructorStudent(instructorId, studentId);
    const hasLessons = (await prisma.lesson.count({ where: { studentId } })) > 0;

    if (!hasLessons) {
      await prisma.user.delete({ where: { id: studentId } });
      return { message: 'Student permanently deleted' };
    }

    await prisma.user.update({
      where: { id: studentId },
      data: { firstName: 'Deleted', lastName: 'Student', phoneNumber: null, deletedAt: new Date() },
    });
    return { message: 'Student archived, history preserved' };
  }

  async inviteStudent(instructorId: string, studentId: string): Promise<{ message: string }> {
    const student = await this.findInstructorStudent(instructorId, studentId);
    if (!student.phoneNumber) throw new NotFoundError('Student profile has no active phone number');

    const magicToken = await prisma.magicToken.create({
      data: { userId: student.id, expiresAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000) },
    });

    logger.info(
      { studentId: student.id, phoneNumber: student.phoneNumber, token: magicToken.token },
      `Magic Link sent to ${student.firstName} ${student.lastName}`
    );
    return { message: 'Invitation link generated' };
  }
}