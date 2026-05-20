import { 
  CreateStudentInput, 
  UpdateStudentInput, 
  InstructorStudentsResponseDTO, 
  StudentMutationResponseDTO,
  BaseStudentDTO
} from '@driveflow/shared';

export interface IStudentsService {
  /**
   * Retrieves all active students with dashboard statistics for a specific instructor.
   */
  getInstructorStudents(instructorId: string): Promise<InstructorStudentsResponseDTO>;

  /**
   * Retrieves a single active student profile by ID.
   */
  getStudentById(instructorId: string, studentId: string): Promise<BaseStudentDTO>;

  /**
   * Registers a new student and assigns them to the requesting instructor.
   */
  createStudent(instructorId: string, input: CreateStudentInput): Promise<StudentMutationResponseDTO>;

  /**
   * Updates existing student records with ownership check.
   */
  updateStudent(instructorId: string, studentId: string, input: UpdateStudentInput): Promise<StudentMutationResponseDTO>;

  /**
   * Archives or permanently deletes a student depending on lesson history.
   */
  archiveStudent(instructorId: string, studentId: string): Promise<{ message: string }>;

  /**
   * Generates and dispatches a dedicated single-use Magic Sign-In Link.
   */
  inviteStudent(instructorId: string, studentId: string): Promise<{ message: string }>;
}