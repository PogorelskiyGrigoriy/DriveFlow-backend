import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const SchoolScalarFieldEnumSchema = z.enum(['id','name','address','lessonDuration','createdAt','updatedAt']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','passwordHash','role','firstName','lastName','phoneNumber','createdAt','updatedAt','schoolId']);

export const InstructorProfileScalarFieldEnumSchema = z.enum(['id','userId','licenseCategories']);

export const StudentProfileScalarFieldEnumSchema = z.enum(['id','userId','instructorId','totalLessons','balance']);

export const LessonScalarFieldEnumSchema = z.enum(['id','startTime','endTime','status','locationStart','locationEnd','schoolId','instructorId','studentId','createdAt','updatedAt']);

export const AvailabilityScalarFieldEnumSchema = z.enum(['id','instructorId','dayOfWeek','startTime','endTime']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const RoleSchema = z.enum(['OWNER','ADMIN','INSTRUCTOR','STUDENT']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

export const LessonStatusSchema = z.enum(['PLANNED','COMPLETED','CANCELLED','NO_SHOW']);

export type LessonStatusType = `${z.infer<typeof LessonStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// SCHOOL SCHEMA
/////////////////////////////////////////

export const SchoolSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  address: z.string().nullable(),
  lessonDuration: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type School = z.infer<typeof SchoolSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: RoleSchema,
  id: z.uuid(),
  email: z.string(),
  passwordHash: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  schoolId: z.string(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// INSTRUCTOR PROFILE SCHEMA
/////////////////////////////////////////

export const InstructorProfileSchema = z.object({
  id: z.uuid(),
  userId: z.string(),
  licenseCategories: z.string().array(),
})

export type InstructorProfile = z.infer<typeof InstructorProfileSchema>

/////////////////////////////////////////
// STUDENT PROFILE SCHEMA
/////////////////////////////////////////

export const StudentProfileSchema = z.object({
  id: z.uuid(),
  userId: z.string(),
  instructorId: z.string(),
  totalLessons: z.number().int(),
  balance: z.number().int(),
})

export type StudentProfile = z.infer<typeof StudentProfileSchema>

/////////////////////////////////////////
// LESSON SCHEMA
/////////////////////////////////////////

export const LessonSchema = z.object({
  status: LessonStatusSchema,
  id: z.uuid(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  locationStart: z.string().nullable(),
  locationEnd: z.string().nullable(),
  schoolId: z.string(),
  instructorId: z.string(),
  studentId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Lesson = z.infer<typeof LessonSchema>

/////////////////////////////////////////
// AVAILABILITY SCHEMA
/////////////////////////////////////////

export const AvailabilitySchema = z.object({
  id: z.uuid(),
  instructorId: z.string(),
  dayOfWeek: z.number().int(),
  startTime: z.string(),
  endTime: z.string(),
})

export type Availability = z.infer<typeof AvailabilitySchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// SCHOOL
//------------------------------------------------------

export const SchoolIncludeSchema: z.ZodType<Prisma.SchoolInclude> = z.object({
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  lessons: z.union([z.boolean(),z.lazy(() => LessonFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SchoolCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const SchoolArgsSchema: z.ZodType<Prisma.SchoolDefaultArgs> = z.object({
  select: z.lazy(() => SchoolSelectSchema).optional(),
  include: z.lazy(() => SchoolIncludeSchema).optional(),
}).strict();

export const SchoolCountOutputTypeArgsSchema: z.ZodType<Prisma.SchoolCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => SchoolCountOutputTypeSelectSchema).nullish(),
}).strict();

export const SchoolCountOutputTypeSelectSchema: z.ZodType<Prisma.SchoolCountOutputTypeSelect> = z.object({
  users: z.boolean().optional(),
  lessons: z.boolean().optional(),
}).strict();

export const SchoolSelectSchema: z.ZodType<Prisma.SchoolSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  address: z.boolean().optional(),
  lessonDuration: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  lessons: z.union([z.boolean(),z.lazy(() => LessonFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SchoolCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  school: z.union([z.boolean(),z.lazy(() => SchoolArgsSchema)]).optional(),
  instructorProfile: z.union([z.boolean(),z.lazy(() => InstructorProfileArgsSchema)]).optional(),
  studentProfile: z.union([z.boolean(),z.lazy(() => StudentProfileArgsSchema)]).optional(),
}).strict();

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  passwordHash: z.boolean().optional(),
  role: z.boolean().optional(),
  firstName: z.boolean().optional(),
  lastName: z.boolean().optional(),
  phoneNumber: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  schoolId: z.boolean().optional(),
  school: z.union([z.boolean(),z.lazy(() => SchoolArgsSchema)]).optional(),
  instructorProfile: z.union([z.boolean(),z.lazy(() => InstructorProfileArgsSchema)]).optional(),
  studentProfile: z.union([z.boolean(),z.lazy(() => StudentProfileArgsSchema)]).optional(),
}).strict()

// INSTRUCTOR PROFILE
//------------------------------------------------------

export const InstructorProfileIncludeSchema: z.ZodType<Prisma.InstructorProfileInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  availability: z.union([z.boolean(),z.lazy(() => AvailabilityFindManyArgsSchema)]).optional(),
  lessons: z.union([z.boolean(),z.lazy(() => LessonFindManyArgsSchema)]).optional(),
  students: z.union([z.boolean(),z.lazy(() => StudentProfileFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => InstructorProfileCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const InstructorProfileArgsSchema: z.ZodType<Prisma.InstructorProfileDefaultArgs> = z.object({
  select: z.lazy(() => InstructorProfileSelectSchema).optional(),
  include: z.lazy(() => InstructorProfileIncludeSchema).optional(),
}).strict();

export const InstructorProfileCountOutputTypeArgsSchema: z.ZodType<Prisma.InstructorProfileCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => InstructorProfileCountOutputTypeSelectSchema).nullish(),
}).strict();

export const InstructorProfileCountOutputTypeSelectSchema: z.ZodType<Prisma.InstructorProfileCountOutputTypeSelect> = z.object({
  availability: z.boolean().optional(),
  lessons: z.boolean().optional(),
  students: z.boolean().optional(),
}).strict();

export const InstructorProfileSelectSchema: z.ZodType<Prisma.InstructorProfileSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  licenseCategories: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  availability: z.union([z.boolean(),z.lazy(() => AvailabilityFindManyArgsSchema)]).optional(),
  lessons: z.union([z.boolean(),z.lazy(() => LessonFindManyArgsSchema)]).optional(),
  students: z.union([z.boolean(),z.lazy(() => StudentProfileFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => InstructorProfileCountOutputTypeArgsSchema)]).optional(),
}).strict()

// STUDENT PROFILE
//------------------------------------------------------

export const StudentProfileIncludeSchema: z.ZodType<Prisma.StudentProfileInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  instructor: z.union([z.boolean(),z.lazy(() => InstructorProfileArgsSchema)]).optional(),
  lessons: z.union([z.boolean(),z.lazy(() => LessonFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StudentProfileCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const StudentProfileArgsSchema: z.ZodType<Prisma.StudentProfileDefaultArgs> = z.object({
  select: z.lazy(() => StudentProfileSelectSchema).optional(),
  include: z.lazy(() => StudentProfileIncludeSchema).optional(),
}).strict();

export const StudentProfileCountOutputTypeArgsSchema: z.ZodType<Prisma.StudentProfileCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => StudentProfileCountOutputTypeSelectSchema).nullish(),
}).strict();

export const StudentProfileCountOutputTypeSelectSchema: z.ZodType<Prisma.StudentProfileCountOutputTypeSelect> = z.object({
  lessons: z.boolean().optional(),
}).strict();

export const StudentProfileSelectSchema: z.ZodType<Prisma.StudentProfileSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  instructorId: z.boolean().optional(),
  totalLessons: z.boolean().optional(),
  balance: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  instructor: z.union([z.boolean(),z.lazy(() => InstructorProfileArgsSchema)]).optional(),
  lessons: z.union([z.boolean(),z.lazy(() => LessonFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StudentProfileCountOutputTypeArgsSchema)]).optional(),
}).strict()

// LESSON
//------------------------------------------------------

export const LessonIncludeSchema: z.ZodType<Prisma.LessonInclude> = z.object({
  school: z.union([z.boolean(),z.lazy(() => SchoolArgsSchema)]).optional(),
  instructor: z.union([z.boolean(),z.lazy(() => InstructorProfileArgsSchema)]).optional(),
  student: z.union([z.boolean(),z.lazy(() => StudentProfileArgsSchema)]).optional(),
}).strict();

export const LessonArgsSchema: z.ZodType<Prisma.LessonDefaultArgs> = z.object({
  select: z.lazy(() => LessonSelectSchema).optional(),
  include: z.lazy(() => LessonIncludeSchema).optional(),
}).strict();

export const LessonSelectSchema: z.ZodType<Prisma.LessonSelect> = z.object({
  id: z.boolean().optional(),
  startTime: z.boolean().optional(),
  endTime: z.boolean().optional(),
  status: z.boolean().optional(),
  locationStart: z.boolean().optional(),
  locationEnd: z.boolean().optional(),
  schoolId: z.boolean().optional(),
  instructorId: z.boolean().optional(),
  studentId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  school: z.union([z.boolean(),z.lazy(() => SchoolArgsSchema)]).optional(),
  instructor: z.union([z.boolean(),z.lazy(() => InstructorProfileArgsSchema)]).optional(),
  student: z.union([z.boolean(),z.lazy(() => StudentProfileArgsSchema)]).optional(),
}).strict()

// AVAILABILITY
//------------------------------------------------------

export const AvailabilityIncludeSchema: z.ZodType<Prisma.AvailabilityInclude> = z.object({
  instructor: z.union([z.boolean(),z.lazy(() => InstructorProfileArgsSchema)]).optional(),
}).strict();

export const AvailabilityArgsSchema: z.ZodType<Prisma.AvailabilityDefaultArgs> = z.object({
  select: z.lazy(() => AvailabilitySelectSchema).optional(),
  include: z.lazy(() => AvailabilityIncludeSchema).optional(),
}).strict();

export const AvailabilitySelectSchema: z.ZodType<Prisma.AvailabilitySelect> = z.object({
  id: z.boolean().optional(),
  instructorId: z.boolean().optional(),
  dayOfWeek: z.boolean().optional(),
  startTime: z.boolean().optional(),
  endTime: z.boolean().optional(),
  instructor: z.union([z.boolean(),z.lazy(() => InstructorProfileArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const SchoolWhereInputSchema: z.ZodType<Prisma.SchoolWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => SchoolWhereInputSchema), z.lazy(() => SchoolWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SchoolWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SchoolWhereInputSchema), z.lazy(() => SchoolWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  lessonDuration: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  users: z.lazy(() => UserListRelationFilterSchema).optional(),
  lessons: z.lazy(() => LessonListRelationFilterSchema).optional(),
});

export const SchoolOrderByWithRelationInputSchema: z.ZodType<Prisma.SchoolOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  lessonDuration: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  users: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional(),
  lessons: z.lazy(() => LessonOrderByRelationAggregateInputSchema).optional(),
});

export const SchoolWhereUniqueInputSchema: z.ZodType<Prisma.SchoolWhereUniqueInput> = z.object({
  id: z.uuid(),
})
.and(z.strictObject({
  id: z.uuid().optional(),
  AND: z.union([ z.lazy(() => SchoolWhereInputSchema), z.lazy(() => SchoolWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SchoolWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SchoolWhereInputSchema), z.lazy(() => SchoolWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  lessonDuration: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  users: z.lazy(() => UserListRelationFilterSchema).optional(),
  lessons: z.lazy(() => LessonListRelationFilterSchema).optional(),
}));

export const SchoolOrderByWithAggregationInputSchema: z.ZodType<Prisma.SchoolOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  lessonDuration: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SchoolCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SchoolAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SchoolMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SchoolMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SchoolSumOrderByAggregateInputSchema).optional(),
});

export const SchoolScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SchoolScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => SchoolScalarWhereWithAggregatesInputSchema), z.lazy(() => SchoolScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SchoolScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SchoolScalarWhereWithAggregatesInputSchema), z.lazy(() => SchoolScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  lessonDuration: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  passwordHash: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema) ]).optional(),
  firstName: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  schoolId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  school: z.union([ z.lazy(() => SchoolScalarRelationFilterSchema), z.lazy(() => SchoolWhereInputSchema) ]).optional(),
  instructorProfile: z.union([ z.lazy(() => InstructorProfileNullableScalarRelationFilterSchema), z.lazy(() => InstructorProfileWhereInputSchema) ]).optional().nullable(),
  studentProfile: z.union([ z.lazy(() => StudentProfileNullableScalarRelationFilterSchema), z.lazy(() => StudentProfileWhereInputSchema) ]).optional().nullable(),
});

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  schoolId: z.lazy(() => SortOrderSchema).optional(),
  school: z.lazy(() => SchoolOrderByWithRelationInputSchema).optional(),
  instructorProfile: z.lazy(() => InstructorProfileOrderByWithRelationInputSchema).optional(),
  studentProfile: z.lazy(() => StudentProfileOrderByWithRelationInputSchema).optional(),
});

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    email: z.string(),
    phoneNumber: z.string(),
  }),
  z.object({
    id: z.uuid(),
    email: z.string(),
  }),
  z.object({
    id: z.uuid(),
    phoneNumber: z.string(),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    email: z.string(),
    phoneNumber: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
  z.object({
    phoneNumber: z.string(),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  email: z.string().optional(),
  phoneNumber: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  passwordHash: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema) ]).optional(),
  firstName: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  schoolId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  school: z.union([ z.lazy(() => SchoolScalarRelationFilterSchema), z.lazy(() => SchoolWhereInputSchema) ]).optional(),
  instructorProfile: z.union([ z.lazy(() => InstructorProfileNullableScalarRelationFilterSchema), z.lazy(() => InstructorProfileWhereInputSchema) ]).optional().nullable(),
  studentProfile: z.union([ z.lazy(() => StudentProfileNullableScalarRelationFilterSchema), z.lazy(() => StudentProfileWhereInputSchema) ]).optional().nullable(),
}));

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  schoolId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
});

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  passwordHash: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleWithAggregatesFilterSchema), z.lazy(() => RoleSchema) ]).optional(),
  firstName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  schoolId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const InstructorProfileWhereInputSchema: z.ZodType<Prisma.InstructorProfileWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => InstructorProfileWhereInputSchema), z.lazy(() => InstructorProfileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InstructorProfileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InstructorProfileWhereInputSchema), z.lazy(() => InstructorProfileWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  licenseCategories: z.lazy(() => StringNullableListFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  availability: z.lazy(() => AvailabilityListRelationFilterSchema).optional(),
  lessons: z.lazy(() => LessonListRelationFilterSchema).optional(),
  students: z.lazy(() => StudentProfileListRelationFilterSchema).optional(),
});

export const InstructorProfileOrderByWithRelationInputSchema: z.ZodType<Prisma.InstructorProfileOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  licenseCategories: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  availability: z.lazy(() => AvailabilityOrderByRelationAggregateInputSchema).optional(),
  lessons: z.lazy(() => LessonOrderByRelationAggregateInputSchema).optional(),
  students: z.lazy(() => StudentProfileOrderByRelationAggregateInputSchema).optional(),
});

export const InstructorProfileWhereUniqueInputSchema: z.ZodType<Prisma.InstructorProfileWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    userId: z.string(),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    userId: z.string(),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  userId: z.string().optional(),
  AND: z.union([ z.lazy(() => InstructorProfileWhereInputSchema), z.lazy(() => InstructorProfileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InstructorProfileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InstructorProfileWhereInputSchema), z.lazy(() => InstructorProfileWhereInputSchema).array() ]).optional(),
  licenseCategories: z.lazy(() => StringNullableListFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  availability: z.lazy(() => AvailabilityListRelationFilterSchema).optional(),
  lessons: z.lazy(() => LessonListRelationFilterSchema).optional(),
  students: z.lazy(() => StudentProfileListRelationFilterSchema).optional(),
}));

export const InstructorProfileOrderByWithAggregationInputSchema: z.ZodType<Prisma.InstructorProfileOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  licenseCategories: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => InstructorProfileCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => InstructorProfileMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => InstructorProfileMinOrderByAggregateInputSchema).optional(),
});

export const InstructorProfileScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.InstructorProfileScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => InstructorProfileScalarWhereWithAggregatesInputSchema), z.lazy(() => InstructorProfileScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => InstructorProfileScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InstructorProfileScalarWhereWithAggregatesInputSchema), z.lazy(() => InstructorProfileScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  licenseCategories: z.lazy(() => StringNullableListFilterSchema).optional(),
});

export const StudentProfileWhereInputSchema: z.ZodType<Prisma.StudentProfileWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => StudentProfileWhereInputSchema), z.lazy(() => StudentProfileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StudentProfileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StudentProfileWhereInputSchema), z.lazy(() => StudentProfileWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  instructorId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  totalLessons: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  balance: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  instructor: z.union([ z.lazy(() => InstructorProfileScalarRelationFilterSchema), z.lazy(() => InstructorProfileWhereInputSchema) ]).optional(),
  lessons: z.lazy(() => LessonListRelationFilterSchema).optional(),
});

export const StudentProfileOrderByWithRelationInputSchema: z.ZodType<Prisma.StudentProfileOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  instructorId: z.lazy(() => SortOrderSchema).optional(),
  totalLessons: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  instructor: z.lazy(() => InstructorProfileOrderByWithRelationInputSchema).optional(),
  lessons: z.lazy(() => LessonOrderByRelationAggregateInputSchema).optional(),
});

export const StudentProfileWhereUniqueInputSchema: z.ZodType<Prisma.StudentProfileWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    userId: z.string(),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    userId: z.string(),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  userId: z.string().optional(),
  AND: z.union([ z.lazy(() => StudentProfileWhereInputSchema), z.lazy(() => StudentProfileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StudentProfileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StudentProfileWhereInputSchema), z.lazy(() => StudentProfileWhereInputSchema).array() ]).optional(),
  instructorId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  totalLessons: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  balance: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  instructor: z.union([ z.lazy(() => InstructorProfileScalarRelationFilterSchema), z.lazy(() => InstructorProfileWhereInputSchema) ]).optional(),
  lessons: z.lazy(() => LessonListRelationFilterSchema).optional(),
}));

export const StudentProfileOrderByWithAggregationInputSchema: z.ZodType<Prisma.StudentProfileOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  instructorId: z.lazy(() => SortOrderSchema).optional(),
  totalLessons: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => StudentProfileCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => StudentProfileAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => StudentProfileMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => StudentProfileMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => StudentProfileSumOrderByAggregateInputSchema).optional(),
});

export const StudentProfileScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StudentProfileScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => StudentProfileScalarWhereWithAggregatesInputSchema), z.lazy(() => StudentProfileScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => StudentProfileScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StudentProfileScalarWhereWithAggregatesInputSchema), z.lazy(() => StudentProfileScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  instructorId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  totalLessons: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  balance: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
});

export const LessonWhereInputSchema: z.ZodType<Prisma.LessonWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => LessonWhereInputSchema), z.lazy(() => LessonWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LessonWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LessonWhereInputSchema), z.lazy(() => LessonWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  startTime: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  endTime: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumLessonStatusFilterSchema), z.lazy(() => LessonStatusSchema) ]).optional(),
  locationStart: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  locationEnd: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  schoolId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  instructorId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  studentId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  school: z.union([ z.lazy(() => SchoolScalarRelationFilterSchema), z.lazy(() => SchoolWhereInputSchema) ]).optional(),
  instructor: z.union([ z.lazy(() => InstructorProfileScalarRelationFilterSchema), z.lazy(() => InstructorProfileWhereInputSchema) ]).optional(),
  student: z.union([ z.lazy(() => StudentProfileScalarRelationFilterSchema), z.lazy(() => StudentProfileWhereInputSchema) ]).optional(),
});

export const LessonOrderByWithRelationInputSchema: z.ZodType<Prisma.LessonOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  locationStart: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  locationEnd: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  schoolId: z.lazy(() => SortOrderSchema).optional(),
  instructorId: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  school: z.lazy(() => SchoolOrderByWithRelationInputSchema).optional(),
  instructor: z.lazy(() => InstructorProfileOrderByWithRelationInputSchema).optional(),
  student: z.lazy(() => StudentProfileOrderByWithRelationInputSchema).optional(),
});

export const LessonWhereUniqueInputSchema: z.ZodType<Prisma.LessonWhereUniqueInput> = z.object({
  id: z.uuid(),
})
.and(z.strictObject({
  id: z.uuid().optional(),
  AND: z.union([ z.lazy(() => LessonWhereInputSchema), z.lazy(() => LessonWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LessonWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LessonWhereInputSchema), z.lazy(() => LessonWhereInputSchema).array() ]).optional(),
  startTime: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  endTime: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumLessonStatusFilterSchema), z.lazy(() => LessonStatusSchema) ]).optional(),
  locationStart: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  locationEnd: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  schoolId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  instructorId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  studentId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  school: z.union([ z.lazy(() => SchoolScalarRelationFilterSchema), z.lazy(() => SchoolWhereInputSchema) ]).optional(),
  instructor: z.union([ z.lazy(() => InstructorProfileScalarRelationFilterSchema), z.lazy(() => InstructorProfileWhereInputSchema) ]).optional(),
  student: z.union([ z.lazy(() => StudentProfileScalarRelationFilterSchema), z.lazy(() => StudentProfileWhereInputSchema) ]).optional(),
}));

export const LessonOrderByWithAggregationInputSchema: z.ZodType<Prisma.LessonOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  locationStart: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  locationEnd: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  schoolId: z.lazy(() => SortOrderSchema).optional(),
  instructorId: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LessonCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LessonMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LessonMinOrderByAggregateInputSchema).optional(),
});

export const LessonScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LessonScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => LessonScalarWhereWithAggregatesInputSchema), z.lazy(() => LessonScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LessonScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LessonScalarWhereWithAggregatesInputSchema), z.lazy(() => LessonScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  startTime: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  endTime: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumLessonStatusWithAggregatesFilterSchema), z.lazy(() => LessonStatusSchema) ]).optional(),
  locationStart: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  locationEnd: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  schoolId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  instructorId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  studentId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const AvailabilityWhereInputSchema: z.ZodType<Prisma.AvailabilityWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => AvailabilityWhereInputSchema), z.lazy(() => AvailabilityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AvailabilityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AvailabilityWhereInputSchema), z.lazy(() => AvailabilityWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  instructorId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  dayOfWeek: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  startTime: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  endTime: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  instructor: z.union([ z.lazy(() => InstructorProfileScalarRelationFilterSchema), z.lazy(() => InstructorProfileWhereInputSchema) ]).optional(),
});

export const AvailabilityOrderByWithRelationInputSchema: z.ZodType<Prisma.AvailabilityOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  instructorId: z.lazy(() => SortOrderSchema).optional(),
  dayOfWeek: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  instructor: z.lazy(() => InstructorProfileOrderByWithRelationInputSchema).optional(),
});

export const AvailabilityWhereUniqueInputSchema: z.ZodType<Prisma.AvailabilityWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    instructorId_dayOfWeek_startTime_endTime: z.lazy(() => AvailabilityInstructorIdDayOfWeekStartTimeEndTimeCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    instructorId_dayOfWeek_startTime_endTime: z.lazy(() => AvailabilityInstructorIdDayOfWeekStartTimeEndTimeCompoundUniqueInputSchema),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  instructorId_dayOfWeek_startTime_endTime: z.lazy(() => AvailabilityInstructorIdDayOfWeekStartTimeEndTimeCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => AvailabilityWhereInputSchema), z.lazy(() => AvailabilityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AvailabilityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AvailabilityWhereInputSchema), z.lazy(() => AvailabilityWhereInputSchema).array() ]).optional(),
  instructorId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  dayOfWeek: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  startTime: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  endTime: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  instructor: z.union([ z.lazy(() => InstructorProfileScalarRelationFilterSchema), z.lazy(() => InstructorProfileWhereInputSchema) ]).optional(),
}));

export const AvailabilityOrderByWithAggregationInputSchema: z.ZodType<Prisma.AvailabilityOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  instructorId: z.lazy(() => SortOrderSchema).optional(),
  dayOfWeek: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AvailabilityCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AvailabilityAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AvailabilityMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AvailabilityMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AvailabilitySumOrderByAggregateInputSchema).optional(),
});

export const AvailabilityScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AvailabilityScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => AvailabilityScalarWhereWithAggregatesInputSchema), z.lazy(() => AvailabilityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AvailabilityScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AvailabilityScalarWhereWithAggregatesInputSchema), z.lazy(() => AvailabilityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  instructorId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  dayOfWeek: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  startTime: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  endTime: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const SchoolCreateInputSchema: z.ZodType<Prisma.SchoolCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  address: z.string().optional().nullable(),
  lessonDuration: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UserCreateNestedManyWithoutSchoolInputSchema).optional(),
  lessons: z.lazy(() => LessonCreateNestedManyWithoutSchoolInputSchema).optional(),
});

export const SchoolUncheckedCreateInputSchema: z.ZodType<Prisma.SchoolUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  address: z.string().optional().nullable(),
  lessonDuration: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutSchoolInputSchema).optional(),
  lessons: z.lazy(() => LessonUncheckedCreateNestedManyWithoutSchoolInputSchema).optional(),
});

export const SchoolUpdateInputSchema: z.ZodType<Prisma.SchoolUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lessonDuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUpdateManyWithoutSchoolNestedInputSchema).optional(),
  lessons: z.lazy(() => LessonUpdateManyWithoutSchoolNestedInputSchema).optional(),
});

export const SchoolUncheckedUpdateInputSchema: z.ZodType<Prisma.SchoolUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lessonDuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutSchoolNestedInputSchema).optional(),
  lessons: z.lazy(() => LessonUncheckedUpdateManyWithoutSchoolNestedInputSchema).optional(),
});

export const SchoolCreateManyInputSchema: z.ZodType<Prisma.SchoolCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  address: z.string().optional().nullable(),
  lessonDuration: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const SchoolUpdateManyMutationInputSchema: z.ZodType<Prisma.SchoolUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lessonDuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const SchoolUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SchoolUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lessonDuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  passwordHash: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  school: z.lazy(() => SchoolCreateNestedOneWithoutUsersInputSchema),
  instructorProfile: z.lazy(() => InstructorProfileCreateNestedOneWithoutUserInputSchema).optional(),
  studentProfile: z.lazy(() => StudentProfileCreateNestedOneWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  passwordHash: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  schoolId: z.string(),
  instructorProfile: z.lazy(() => InstructorProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  studentProfile: z.lazy(() => StudentProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
});

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  school: z.lazy(() => SchoolUpdateOneRequiredWithoutUsersNestedInputSchema).optional(),
  instructorProfile: z.lazy(() => InstructorProfileUpdateOneWithoutUserNestedInputSchema).optional(),
  studentProfile: z.lazy(() => StudentProfileUpdateOneWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  schoolId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  instructorProfile: z.lazy(() => InstructorProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  studentProfile: z.lazy(() => StudentProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
});

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  passwordHash: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  schoolId: z.string(),
});

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  schoolId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const InstructorProfileCreateInputSchema: z.ZodType<Prisma.InstructorProfileCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  licenseCategories: z.union([ z.lazy(() => InstructorProfileCreatelicenseCategoriesInputSchema), z.string().array() ]).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutInstructorProfileInputSchema),
  availability: z.lazy(() => AvailabilityCreateNestedManyWithoutInstructorInputSchema).optional(),
  lessons: z.lazy(() => LessonCreateNestedManyWithoutInstructorInputSchema).optional(),
  students: z.lazy(() => StudentProfileCreateNestedManyWithoutInstructorInputSchema).optional(),
});

export const InstructorProfileUncheckedCreateInputSchema: z.ZodType<Prisma.InstructorProfileUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  userId: z.string(),
  licenseCategories: z.union([ z.lazy(() => InstructorProfileCreatelicenseCategoriesInputSchema), z.string().array() ]).optional(),
  availability: z.lazy(() => AvailabilityUncheckedCreateNestedManyWithoutInstructorInputSchema).optional(),
  lessons: z.lazy(() => LessonUncheckedCreateNestedManyWithoutInstructorInputSchema).optional(),
  students: z.lazy(() => StudentProfileUncheckedCreateNestedManyWithoutInstructorInputSchema).optional(),
});

export const InstructorProfileUpdateInputSchema: z.ZodType<Prisma.InstructorProfileUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  licenseCategories: z.union([ z.lazy(() => InstructorProfileUpdatelicenseCategoriesInputSchema), z.string().array() ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutInstructorProfileNestedInputSchema).optional(),
  availability: z.lazy(() => AvailabilityUpdateManyWithoutInstructorNestedInputSchema).optional(),
  lessons: z.lazy(() => LessonUpdateManyWithoutInstructorNestedInputSchema).optional(),
  students: z.lazy(() => StudentProfileUpdateManyWithoutInstructorNestedInputSchema).optional(),
});

export const InstructorProfileUncheckedUpdateInputSchema: z.ZodType<Prisma.InstructorProfileUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  licenseCategories: z.union([ z.lazy(() => InstructorProfileUpdatelicenseCategoriesInputSchema), z.string().array() ]).optional(),
  availability: z.lazy(() => AvailabilityUncheckedUpdateManyWithoutInstructorNestedInputSchema).optional(),
  lessons: z.lazy(() => LessonUncheckedUpdateManyWithoutInstructorNestedInputSchema).optional(),
  students: z.lazy(() => StudentProfileUncheckedUpdateManyWithoutInstructorNestedInputSchema).optional(),
});

export const InstructorProfileCreateManyInputSchema: z.ZodType<Prisma.InstructorProfileCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  userId: z.string(),
  licenseCategories: z.union([ z.lazy(() => InstructorProfileCreatelicenseCategoriesInputSchema), z.string().array() ]).optional(),
});

export const InstructorProfileUpdateManyMutationInputSchema: z.ZodType<Prisma.InstructorProfileUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  licenseCategories: z.union([ z.lazy(() => InstructorProfileUpdatelicenseCategoriesInputSchema), z.string().array() ]).optional(),
});

export const InstructorProfileUncheckedUpdateManyInputSchema: z.ZodType<Prisma.InstructorProfileUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  licenseCategories: z.union([ z.lazy(() => InstructorProfileUpdatelicenseCategoriesInputSchema), z.string().array() ]).optional(),
});

export const StudentProfileCreateInputSchema: z.ZodType<Prisma.StudentProfileCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  totalLessons: z.number().int().optional(),
  balance: z.number().int().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutStudentProfileInputSchema),
  instructor: z.lazy(() => InstructorProfileCreateNestedOneWithoutStudentsInputSchema),
  lessons: z.lazy(() => LessonCreateNestedManyWithoutStudentInputSchema).optional(),
});

export const StudentProfileUncheckedCreateInputSchema: z.ZodType<Prisma.StudentProfileUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  userId: z.string(),
  instructorId: z.string(),
  totalLessons: z.number().int().optional(),
  balance: z.number().int().optional(),
  lessons: z.lazy(() => LessonUncheckedCreateNestedManyWithoutStudentInputSchema).optional(),
});

export const StudentProfileUpdateInputSchema: z.ZodType<Prisma.StudentProfileUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalLessons: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutStudentProfileNestedInputSchema).optional(),
  instructor: z.lazy(() => InstructorProfileUpdateOneRequiredWithoutStudentsNestedInputSchema).optional(),
  lessons: z.lazy(() => LessonUpdateManyWithoutStudentNestedInputSchema).optional(),
});

export const StudentProfileUncheckedUpdateInputSchema: z.ZodType<Prisma.StudentProfileUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  instructorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalLessons: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  lessons: z.lazy(() => LessonUncheckedUpdateManyWithoutStudentNestedInputSchema).optional(),
});

export const StudentProfileCreateManyInputSchema: z.ZodType<Prisma.StudentProfileCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  userId: z.string(),
  instructorId: z.string(),
  totalLessons: z.number().int().optional(),
  balance: z.number().int().optional(),
});

export const StudentProfileUpdateManyMutationInputSchema: z.ZodType<Prisma.StudentProfileUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalLessons: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
});

export const StudentProfileUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StudentProfileUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  instructorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalLessons: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
});

export const LessonCreateInputSchema: z.ZodType<Prisma.LessonCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  status: z.lazy(() => LessonStatusSchema).optional(),
  locationStart: z.string().optional().nullable(),
  locationEnd: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  school: z.lazy(() => SchoolCreateNestedOneWithoutLessonsInputSchema),
  instructor: z.lazy(() => InstructorProfileCreateNestedOneWithoutLessonsInputSchema),
  student: z.lazy(() => StudentProfileCreateNestedOneWithoutLessonsInputSchema),
});

export const LessonUncheckedCreateInputSchema: z.ZodType<Prisma.LessonUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  status: z.lazy(() => LessonStatusSchema).optional(),
  locationStart: z.string().optional().nullable(),
  locationEnd: z.string().optional().nullable(),
  schoolId: z.string(),
  instructorId: z.string(),
  studentId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const LessonUpdateInputSchema: z.ZodType<Prisma.LessonUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => LessonStatusSchema), z.lazy(() => EnumLessonStatusFieldUpdateOperationsInputSchema) ]).optional(),
  locationStart: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationEnd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  school: z.lazy(() => SchoolUpdateOneRequiredWithoutLessonsNestedInputSchema).optional(),
  instructor: z.lazy(() => InstructorProfileUpdateOneRequiredWithoutLessonsNestedInputSchema).optional(),
  student: z.lazy(() => StudentProfileUpdateOneRequiredWithoutLessonsNestedInputSchema).optional(),
});

export const LessonUncheckedUpdateInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => LessonStatusSchema), z.lazy(() => EnumLessonStatusFieldUpdateOperationsInputSchema) ]).optional(),
  locationStart: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationEnd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  schoolId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  instructorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const LessonCreateManyInputSchema: z.ZodType<Prisma.LessonCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  status: z.lazy(() => LessonStatusSchema).optional(),
  locationStart: z.string().optional().nullable(),
  locationEnd: z.string().optional().nullable(),
  schoolId: z.string(),
  instructorId: z.string(),
  studentId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const LessonUpdateManyMutationInputSchema: z.ZodType<Prisma.LessonUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => LessonStatusSchema), z.lazy(() => EnumLessonStatusFieldUpdateOperationsInputSchema) ]).optional(),
  locationStart: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationEnd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const LessonUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => LessonStatusSchema), z.lazy(() => EnumLessonStatusFieldUpdateOperationsInputSchema) ]).optional(),
  locationStart: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationEnd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  schoolId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  instructorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const AvailabilityCreateInputSchema: z.ZodType<Prisma.AvailabilityCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  dayOfWeek: z.number().int(),
  startTime: z.string(),
  endTime: z.string(),
  instructor: z.lazy(() => InstructorProfileCreateNestedOneWithoutAvailabilityInputSchema),
});

export const AvailabilityUncheckedCreateInputSchema: z.ZodType<Prisma.AvailabilityUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  instructorId: z.string(),
  dayOfWeek: z.number().int(),
  startTime: z.string(),
  endTime: z.string(),
});

export const AvailabilityUpdateInputSchema: z.ZodType<Prisma.AvailabilityUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  instructor: z.lazy(() => InstructorProfileUpdateOneRequiredWithoutAvailabilityNestedInputSchema).optional(),
});

export const AvailabilityUncheckedUpdateInputSchema: z.ZodType<Prisma.AvailabilityUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  instructorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const AvailabilityCreateManyInputSchema: z.ZodType<Prisma.AvailabilityCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  instructorId: z.string(),
  dayOfWeek: z.number().int(),
  startTime: z.string(),
  endTime: z.string(),
});

export const AvailabilityUpdateManyMutationInputSchema: z.ZodType<Prisma.AvailabilityUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const AvailabilityUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AvailabilityUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  instructorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
});

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
});

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
});

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
});

export const UserListRelationFilterSchema: z.ZodType<Prisma.UserListRelationFilter> = z.strictObject({
  every: z.lazy(() => UserWhereInputSchema).optional(),
  some: z.lazy(() => UserWhereInputSchema).optional(),
  none: z.lazy(() => UserWhereInputSchema).optional(),
});

export const LessonListRelationFilterSchema: z.ZodType<Prisma.LessonListRelationFilter> = z.strictObject({
  every: z.lazy(() => LessonWhereInputSchema).optional(),
  some: z.lazy(() => LessonWhereInputSchema).optional(),
  none: z.lazy(() => LessonWhereInputSchema).optional(),
});

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.strictObject({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional(),
});

export const UserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const LessonOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LessonOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const SchoolCountOrderByAggregateInputSchema: z.ZodType<Prisma.SchoolCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  lessonDuration: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const SchoolAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SchoolAvgOrderByAggregateInput> = z.strictObject({
  lessonDuration: z.lazy(() => SortOrderSchema).optional(),
});

export const SchoolMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SchoolMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  lessonDuration: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const SchoolMinOrderByAggregateInputSchema: z.ZodType<Prisma.SchoolMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  lessonDuration: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const SchoolSumOrderByAggregateInputSchema: z.ZodType<Prisma.SchoolSumOrderByAggregateInput> = z.strictObject({
  lessonDuration: z.lazy(() => SortOrderSchema).optional(),
});

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
});

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
});

export const EnumRoleFilterSchema: z.ZodType<Prisma.EnumRoleFilter> = z.strictObject({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
});

export const SchoolScalarRelationFilterSchema: z.ZodType<Prisma.SchoolScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => SchoolWhereInputSchema).optional(),
  isNot: z.lazy(() => SchoolWhereInputSchema).optional(),
});

export const InstructorProfileNullableScalarRelationFilterSchema: z.ZodType<Prisma.InstructorProfileNullableScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => InstructorProfileWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => InstructorProfileWhereInputSchema).optional().nullable(),
});

export const StudentProfileNullableScalarRelationFilterSchema: z.ZodType<Prisma.StudentProfileNullableScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => StudentProfileWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => StudentProfileWhereInputSchema).optional().nullable(),
});

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  schoolId: z.lazy(() => SortOrderSchema).optional(),
});

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  schoolId: z.lazy(() => SortOrderSchema).optional(),
});

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  schoolId: z.lazy(() => SortOrderSchema).optional(),
});

export const EnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
});

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.strictObject({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional(),
});

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional(),
});

export const AvailabilityListRelationFilterSchema: z.ZodType<Prisma.AvailabilityListRelationFilter> = z.strictObject({
  every: z.lazy(() => AvailabilityWhereInputSchema).optional(),
  some: z.lazy(() => AvailabilityWhereInputSchema).optional(),
  none: z.lazy(() => AvailabilityWhereInputSchema).optional(),
});

export const StudentProfileListRelationFilterSchema: z.ZodType<Prisma.StudentProfileListRelationFilter> = z.strictObject({
  every: z.lazy(() => StudentProfileWhereInputSchema).optional(),
  some: z.lazy(() => StudentProfileWhereInputSchema).optional(),
  none: z.lazy(() => StudentProfileWhereInputSchema).optional(),
});

export const AvailabilityOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AvailabilityOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const StudentProfileOrderByRelationAggregateInputSchema: z.ZodType<Prisma.StudentProfileOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const InstructorProfileCountOrderByAggregateInputSchema: z.ZodType<Prisma.InstructorProfileCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  licenseCategories: z.lazy(() => SortOrderSchema).optional(),
});

export const InstructorProfileMaxOrderByAggregateInputSchema: z.ZodType<Prisma.InstructorProfileMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
});

export const InstructorProfileMinOrderByAggregateInputSchema: z.ZodType<Prisma.InstructorProfileMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
});

export const InstructorProfileScalarRelationFilterSchema: z.ZodType<Prisma.InstructorProfileScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => InstructorProfileWhereInputSchema).optional(),
  isNot: z.lazy(() => InstructorProfileWhereInputSchema).optional(),
});

export const StudentProfileCountOrderByAggregateInputSchema: z.ZodType<Prisma.StudentProfileCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  instructorId: z.lazy(() => SortOrderSchema).optional(),
  totalLessons: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
});

export const StudentProfileAvgOrderByAggregateInputSchema: z.ZodType<Prisma.StudentProfileAvgOrderByAggregateInput> = z.strictObject({
  totalLessons: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
});

export const StudentProfileMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StudentProfileMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  instructorId: z.lazy(() => SortOrderSchema).optional(),
  totalLessons: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
});

export const StudentProfileMinOrderByAggregateInputSchema: z.ZodType<Prisma.StudentProfileMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  instructorId: z.lazy(() => SortOrderSchema).optional(),
  totalLessons: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
});

export const StudentProfileSumOrderByAggregateInputSchema: z.ZodType<Prisma.StudentProfileSumOrderByAggregateInput> = z.strictObject({
  totalLessons: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
});

export const EnumLessonStatusFilterSchema: z.ZodType<Prisma.EnumLessonStatusFilter> = z.strictObject({
  equals: z.lazy(() => LessonStatusSchema).optional(),
  in: z.lazy(() => LessonStatusSchema).array().optional(),
  notIn: z.lazy(() => LessonStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => LessonStatusSchema), z.lazy(() => NestedEnumLessonStatusFilterSchema) ]).optional(),
});

export const StudentProfileScalarRelationFilterSchema: z.ZodType<Prisma.StudentProfileScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => StudentProfileWhereInputSchema).optional(),
  isNot: z.lazy(() => StudentProfileWhereInputSchema).optional(),
});

export const LessonCountOrderByAggregateInputSchema: z.ZodType<Prisma.LessonCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  locationStart: z.lazy(() => SortOrderSchema).optional(),
  locationEnd: z.lazy(() => SortOrderSchema).optional(),
  schoolId: z.lazy(() => SortOrderSchema).optional(),
  instructorId: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const LessonMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LessonMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  locationStart: z.lazy(() => SortOrderSchema).optional(),
  locationEnd: z.lazy(() => SortOrderSchema).optional(),
  schoolId: z.lazy(() => SortOrderSchema).optional(),
  instructorId: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const LessonMinOrderByAggregateInputSchema: z.ZodType<Prisma.LessonMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  locationStart: z.lazy(() => SortOrderSchema).optional(),
  locationEnd: z.lazy(() => SortOrderSchema).optional(),
  schoolId: z.lazy(() => SortOrderSchema).optional(),
  instructorId: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const EnumLessonStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumLessonStatusWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => LessonStatusSchema).optional(),
  in: z.lazy(() => LessonStatusSchema).array().optional(),
  notIn: z.lazy(() => LessonStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => LessonStatusSchema), z.lazy(() => NestedEnumLessonStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumLessonStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumLessonStatusFilterSchema).optional(),
});

export const AvailabilityInstructorIdDayOfWeekStartTimeEndTimeCompoundUniqueInputSchema: z.ZodType<Prisma.AvailabilityInstructorIdDayOfWeekStartTimeEndTimeCompoundUniqueInput> = z.strictObject({
  instructorId: z.string(),
  dayOfWeek: z.number(),
  startTime: z.string(),
  endTime: z.string(),
});

export const AvailabilityCountOrderByAggregateInputSchema: z.ZodType<Prisma.AvailabilityCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  instructorId: z.lazy(() => SortOrderSchema).optional(),
  dayOfWeek: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
});

export const AvailabilityAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AvailabilityAvgOrderByAggregateInput> = z.strictObject({
  dayOfWeek: z.lazy(() => SortOrderSchema).optional(),
});

export const AvailabilityMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AvailabilityMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  instructorId: z.lazy(() => SortOrderSchema).optional(),
  dayOfWeek: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
});

export const AvailabilityMinOrderByAggregateInputSchema: z.ZodType<Prisma.AvailabilityMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  instructorId: z.lazy(() => SortOrderSchema).optional(),
  dayOfWeek: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
});

export const AvailabilitySumOrderByAggregateInputSchema: z.ZodType<Prisma.AvailabilitySumOrderByAggregateInput> = z.strictObject({
  dayOfWeek: z.lazy(() => SortOrderSchema).optional(),
});

export const UserCreateNestedManyWithoutSchoolInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutSchoolInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutSchoolInputSchema), z.lazy(() => UserCreateWithoutSchoolInputSchema).array(), z.lazy(() => UserUncheckedCreateWithoutSchoolInputSchema), z.lazy(() => UserUncheckedCreateWithoutSchoolInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutSchoolInputSchema), z.lazy(() => UserCreateOrConnectWithoutSchoolInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManySchoolInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
});

export const LessonCreateNestedManyWithoutSchoolInputSchema: z.ZodType<Prisma.LessonCreateNestedManyWithoutSchoolInput> = z.strictObject({
  create: z.union([ z.lazy(() => LessonCreateWithoutSchoolInputSchema), z.lazy(() => LessonCreateWithoutSchoolInputSchema).array(), z.lazy(() => LessonUncheckedCreateWithoutSchoolInputSchema), z.lazy(() => LessonUncheckedCreateWithoutSchoolInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LessonCreateOrConnectWithoutSchoolInputSchema), z.lazy(() => LessonCreateOrConnectWithoutSchoolInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LessonCreateManySchoolInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LessonWhereUniqueInputSchema), z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
});

export const UserUncheckedCreateNestedManyWithoutSchoolInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutSchoolInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutSchoolInputSchema), z.lazy(() => UserCreateWithoutSchoolInputSchema).array(), z.lazy(() => UserUncheckedCreateWithoutSchoolInputSchema), z.lazy(() => UserUncheckedCreateWithoutSchoolInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutSchoolInputSchema), z.lazy(() => UserCreateOrConnectWithoutSchoolInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManySchoolInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
});

export const LessonUncheckedCreateNestedManyWithoutSchoolInputSchema: z.ZodType<Prisma.LessonUncheckedCreateNestedManyWithoutSchoolInput> = z.strictObject({
  create: z.union([ z.lazy(() => LessonCreateWithoutSchoolInputSchema), z.lazy(() => LessonCreateWithoutSchoolInputSchema).array(), z.lazy(() => LessonUncheckedCreateWithoutSchoolInputSchema), z.lazy(() => LessonUncheckedCreateWithoutSchoolInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LessonCreateOrConnectWithoutSchoolInputSchema), z.lazy(() => LessonCreateOrConnectWithoutSchoolInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LessonCreateManySchoolInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LessonWhereUniqueInputSchema), z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
});

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional(),
});

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional().nullable(),
});

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.strictObject({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
});

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.strictObject({
  set: z.coerce.date().optional(),
});

export const UserUpdateManyWithoutSchoolNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutSchoolNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutSchoolInputSchema), z.lazy(() => UserCreateWithoutSchoolInputSchema).array(), z.lazy(() => UserUncheckedCreateWithoutSchoolInputSchema), z.lazy(() => UserUncheckedCreateWithoutSchoolInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutSchoolInputSchema), z.lazy(() => UserCreateOrConnectWithoutSchoolInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutSchoolInputSchema), z.lazy(() => UserUpsertWithWhereUniqueWithoutSchoolInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManySchoolInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutSchoolInputSchema), z.lazy(() => UserUpdateWithWhereUniqueWithoutSchoolInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutSchoolInputSchema), z.lazy(() => UserUpdateManyWithWhereWithoutSchoolInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema), z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
});

export const LessonUpdateManyWithoutSchoolNestedInputSchema: z.ZodType<Prisma.LessonUpdateManyWithoutSchoolNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => LessonCreateWithoutSchoolInputSchema), z.lazy(() => LessonCreateWithoutSchoolInputSchema).array(), z.lazy(() => LessonUncheckedCreateWithoutSchoolInputSchema), z.lazy(() => LessonUncheckedCreateWithoutSchoolInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LessonCreateOrConnectWithoutSchoolInputSchema), z.lazy(() => LessonCreateOrConnectWithoutSchoolInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LessonUpsertWithWhereUniqueWithoutSchoolInputSchema), z.lazy(() => LessonUpsertWithWhereUniqueWithoutSchoolInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LessonCreateManySchoolInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LessonWhereUniqueInputSchema), z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LessonWhereUniqueInputSchema), z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LessonWhereUniqueInputSchema), z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LessonWhereUniqueInputSchema), z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LessonUpdateWithWhereUniqueWithoutSchoolInputSchema), z.lazy(() => LessonUpdateWithWhereUniqueWithoutSchoolInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LessonUpdateManyWithWhereWithoutSchoolInputSchema), z.lazy(() => LessonUpdateManyWithWhereWithoutSchoolInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LessonScalarWhereInputSchema), z.lazy(() => LessonScalarWhereInputSchema).array() ]).optional(),
});

export const UserUncheckedUpdateManyWithoutSchoolNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutSchoolNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutSchoolInputSchema), z.lazy(() => UserCreateWithoutSchoolInputSchema).array(), z.lazy(() => UserUncheckedCreateWithoutSchoolInputSchema), z.lazy(() => UserUncheckedCreateWithoutSchoolInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutSchoolInputSchema), z.lazy(() => UserCreateOrConnectWithoutSchoolInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutSchoolInputSchema), z.lazy(() => UserUpsertWithWhereUniqueWithoutSchoolInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManySchoolInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutSchoolInputSchema), z.lazy(() => UserUpdateWithWhereUniqueWithoutSchoolInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutSchoolInputSchema), z.lazy(() => UserUpdateManyWithWhereWithoutSchoolInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema), z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
});

export const LessonUncheckedUpdateManyWithoutSchoolNestedInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateManyWithoutSchoolNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => LessonCreateWithoutSchoolInputSchema), z.lazy(() => LessonCreateWithoutSchoolInputSchema).array(), z.lazy(() => LessonUncheckedCreateWithoutSchoolInputSchema), z.lazy(() => LessonUncheckedCreateWithoutSchoolInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LessonCreateOrConnectWithoutSchoolInputSchema), z.lazy(() => LessonCreateOrConnectWithoutSchoolInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LessonUpsertWithWhereUniqueWithoutSchoolInputSchema), z.lazy(() => LessonUpsertWithWhereUniqueWithoutSchoolInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LessonCreateManySchoolInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LessonWhereUniqueInputSchema), z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LessonWhereUniqueInputSchema), z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LessonWhereUniqueInputSchema), z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LessonWhereUniqueInputSchema), z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LessonUpdateWithWhereUniqueWithoutSchoolInputSchema), z.lazy(() => LessonUpdateWithWhereUniqueWithoutSchoolInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LessonUpdateManyWithWhereWithoutSchoolInputSchema), z.lazy(() => LessonUpdateManyWithWhereWithoutSchoolInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LessonScalarWhereInputSchema), z.lazy(() => LessonScalarWhereInputSchema).array() ]).optional(),
});

export const SchoolCreateNestedOneWithoutUsersInputSchema: z.ZodType<Prisma.SchoolCreateNestedOneWithoutUsersInput> = z.strictObject({
  create: z.union([ z.lazy(() => SchoolCreateWithoutUsersInputSchema), z.lazy(() => SchoolUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SchoolCreateOrConnectWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => SchoolWhereUniqueInputSchema).optional(),
});

export const InstructorProfileCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.InstructorProfileCreateNestedOneWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => InstructorProfileCreateWithoutUserInputSchema), z.lazy(() => InstructorProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InstructorProfileCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => InstructorProfileWhereUniqueInputSchema).optional(),
});

export const StudentProfileCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.StudentProfileCreateNestedOneWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => StudentProfileCreateWithoutUserInputSchema), z.lazy(() => StudentProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StudentProfileCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => StudentProfileWhereUniqueInputSchema).optional(),
});

export const InstructorProfileUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.InstructorProfileUncheckedCreateNestedOneWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => InstructorProfileCreateWithoutUserInputSchema), z.lazy(() => InstructorProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InstructorProfileCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => InstructorProfileWhereUniqueInputSchema).optional(),
});

export const StudentProfileUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.StudentProfileUncheckedCreateNestedOneWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => StudentProfileCreateWithoutUserInputSchema), z.lazy(() => StudentProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StudentProfileCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => StudentProfileWhereUniqueInputSchema).optional(),
});

export const EnumRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => RoleSchema).optional(),
});

export const SchoolUpdateOneRequiredWithoutUsersNestedInputSchema: z.ZodType<Prisma.SchoolUpdateOneRequiredWithoutUsersNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => SchoolCreateWithoutUsersInputSchema), z.lazy(() => SchoolUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SchoolCreateOrConnectWithoutUsersInputSchema).optional(),
  upsert: z.lazy(() => SchoolUpsertWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => SchoolWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SchoolUpdateToOneWithWhereWithoutUsersInputSchema), z.lazy(() => SchoolUpdateWithoutUsersInputSchema), z.lazy(() => SchoolUncheckedUpdateWithoutUsersInputSchema) ]).optional(),
});

export const InstructorProfileUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.InstructorProfileUpdateOneWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => InstructorProfileCreateWithoutUserInputSchema), z.lazy(() => InstructorProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InstructorProfileCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => InstructorProfileUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => InstructorProfileWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => InstructorProfileWhereInputSchema) ]).optional(),
  connect: z.lazy(() => InstructorProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => InstructorProfileUpdateToOneWithWhereWithoutUserInputSchema), z.lazy(() => InstructorProfileUpdateWithoutUserInputSchema), z.lazy(() => InstructorProfileUncheckedUpdateWithoutUserInputSchema) ]).optional(),
});

export const StudentProfileUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.StudentProfileUpdateOneWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => StudentProfileCreateWithoutUserInputSchema), z.lazy(() => StudentProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StudentProfileCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => StudentProfileUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => StudentProfileWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => StudentProfileWhereInputSchema) ]).optional(),
  connect: z.lazy(() => StudentProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StudentProfileUpdateToOneWithWhereWithoutUserInputSchema), z.lazy(() => StudentProfileUpdateWithoutUserInputSchema), z.lazy(() => StudentProfileUncheckedUpdateWithoutUserInputSchema) ]).optional(),
});

export const InstructorProfileUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.InstructorProfileUncheckedUpdateOneWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => InstructorProfileCreateWithoutUserInputSchema), z.lazy(() => InstructorProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InstructorProfileCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => InstructorProfileUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => InstructorProfileWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => InstructorProfileWhereInputSchema) ]).optional(),
  connect: z.lazy(() => InstructorProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => InstructorProfileUpdateToOneWithWhereWithoutUserInputSchema), z.lazy(() => InstructorProfileUpdateWithoutUserInputSchema), z.lazy(() => InstructorProfileUncheckedUpdateWithoutUserInputSchema) ]).optional(),
});

export const StudentProfileUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.StudentProfileUncheckedUpdateOneWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => StudentProfileCreateWithoutUserInputSchema), z.lazy(() => StudentProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StudentProfileCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => StudentProfileUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => StudentProfileWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => StudentProfileWhereInputSchema) ]).optional(),
  connect: z.lazy(() => StudentProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StudentProfileUpdateToOneWithWhereWithoutUserInputSchema), z.lazy(() => StudentProfileUpdateWithoutUserInputSchema), z.lazy(() => StudentProfileUncheckedUpdateWithoutUserInputSchema) ]).optional(),
});

export const InstructorProfileCreatelicenseCategoriesInputSchema: z.ZodType<Prisma.InstructorProfileCreatelicenseCategoriesInput> = z.strictObject({
  set: z.string().array(),
});

export const UserCreateNestedOneWithoutInstructorProfileInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutInstructorProfileInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutInstructorProfileInputSchema), z.lazy(() => UserUncheckedCreateWithoutInstructorProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutInstructorProfileInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const AvailabilityCreateNestedManyWithoutInstructorInputSchema: z.ZodType<Prisma.AvailabilityCreateNestedManyWithoutInstructorInput> = z.strictObject({
  create: z.union([ z.lazy(() => AvailabilityCreateWithoutInstructorInputSchema), z.lazy(() => AvailabilityCreateWithoutInstructorInputSchema).array(), z.lazy(() => AvailabilityUncheckedCreateWithoutInstructorInputSchema), z.lazy(() => AvailabilityUncheckedCreateWithoutInstructorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AvailabilityCreateOrConnectWithoutInstructorInputSchema), z.lazy(() => AvailabilityCreateOrConnectWithoutInstructorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AvailabilityCreateManyInstructorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AvailabilityWhereUniqueInputSchema), z.lazy(() => AvailabilityWhereUniqueInputSchema).array() ]).optional(),
});

export const LessonCreateNestedManyWithoutInstructorInputSchema: z.ZodType<Prisma.LessonCreateNestedManyWithoutInstructorInput> = z.strictObject({
  create: z.union([ z.lazy(() => LessonCreateWithoutInstructorInputSchema), z.lazy(() => LessonCreateWithoutInstructorInputSchema).array(), z.lazy(() => LessonUncheckedCreateWithoutInstructorInputSchema), z.lazy(() => LessonUncheckedCreateWithoutInstructorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LessonCreateOrConnectWithoutInstructorInputSchema), z.lazy(() => LessonCreateOrConnectWithoutInstructorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LessonCreateManyInstructorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LessonWhereUniqueInputSchema), z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
});

export const StudentProfileCreateNestedManyWithoutInstructorInputSchema: z.ZodType<Prisma.StudentProfileCreateNestedManyWithoutInstructorInput> = z.strictObject({
  create: z.union([ z.lazy(() => StudentProfileCreateWithoutInstructorInputSchema), z.lazy(() => StudentProfileCreateWithoutInstructorInputSchema).array(), z.lazy(() => StudentProfileUncheckedCreateWithoutInstructorInputSchema), z.lazy(() => StudentProfileUncheckedCreateWithoutInstructorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StudentProfileCreateOrConnectWithoutInstructorInputSchema), z.lazy(() => StudentProfileCreateOrConnectWithoutInstructorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StudentProfileCreateManyInstructorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StudentProfileWhereUniqueInputSchema), z.lazy(() => StudentProfileWhereUniqueInputSchema).array() ]).optional(),
});

export const AvailabilityUncheckedCreateNestedManyWithoutInstructorInputSchema: z.ZodType<Prisma.AvailabilityUncheckedCreateNestedManyWithoutInstructorInput> = z.strictObject({
  create: z.union([ z.lazy(() => AvailabilityCreateWithoutInstructorInputSchema), z.lazy(() => AvailabilityCreateWithoutInstructorInputSchema).array(), z.lazy(() => AvailabilityUncheckedCreateWithoutInstructorInputSchema), z.lazy(() => AvailabilityUncheckedCreateWithoutInstructorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AvailabilityCreateOrConnectWithoutInstructorInputSchema), z.lazy(() => AvailabilityCreateOrConnectWithoutInstructorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AvailabilityCreateManyInstructorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AvailabilityWhereUniqueInputSchema), z.lazy(() => AvailabilityWhereUniqueInputSchema).array() ]).optional(),
});

export const LessonUncheckedCreateNestedManyWithoutInstructorInputSchema: z.ZodType<Prisma.LessonUncheckedCreateNestedManyWithoutInstructorInput> = z.strictObject({
  create: z.union([ z.lazy(() => LessonCreateWithoutInstructorInputSchema), z.lazy(() => LessonCreateWithoutInstructorInputSchema).array(), z.lazy(() => LessonUncheckedCreateWithoutInstructorInputSchema), z.lazy(() => LessonUncheckedCreateWithoutInstructorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LessonCreateOrConnectWithoutInstructorInputSchema), z.lazy(() => LessonCreateOrConnectWithoutInstructorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LessonCreateManyInstructorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LessonWhereUniqueInputSchema), z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
});

export const StudentProfileUncheckedCreateNestedManyWithoutInstructorInputSchema: z.ZodType<Prisma.StudentProfileUncheckedCreateNestedManyWithoutInstructorInput> = z.strictObject({
  create: z.union([ z.lazy(() => StudentProfileCreateWithoutInstructorInputSchema), z.lazy(() => StudentProfileCreateWithoutInstructorInputSchema).array(), z.lazy(() => StudentProfileUncheckedCreateWithoutInstructorInputSchema), z.lazy(() => StudentProfileUncheckedCreateWithoutInstructorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StudentProfileCreateOrConnectWithoutInstructorInputSchema), z.lazy(() => StudentProfileCreateOrConnectWithoutInstructorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StudentProfileCreateManyInstructorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StudentProfileWhereUniqueInputSchema), z.lazy(() => StudentProfileWhereUniqueInputSchema).array() ]).optional(),
});

export const InstructorProfileUpdatelicenseCategoriesInputSchema: z.ZodType<Prisma.InstructorProfileUpdatelicenseCategoriesInput> = z.strictObject({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
});

export const UserUpdateOneRequiredWithoutInstructorProfileNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutInstructorProfileNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutInstructorProfileInputSchema), z.lazy(() => UserUncheckedCreateWithoutInstructorProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutInstructorProfileInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutInstructorProfileInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutInstructorProfileInputSchema), z.lazy(() => UserUpdateWithoutInstructorProfileInputSchema), z.lazy(() => UserUncheckedUpdateWithoutInstructorProfileInputSchema) ]).optional(),
});

export const AvailabilityUpdateManyWithoutInstructorNestedInputSchema: z.ZodType<Prisma.AvailabilityUpdateManyWithoutInstructorNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => AvailabilityCreateWithoutInstructorInputSchema), z.lazy(() => AvailabilityCreateWithoutInstructorInputSchema).array(), z.lazy(() => AvailabilityUncheckedCreateWithoutInstructorInputSchema), z.lazy(() => AvailabilityUncheckedCreateWithoutInstructorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AvailabilityCreateOrConnectWithoutInstructorInputSchema), z.lazy(() => AvailabilityCreateOrConnectWithoutInstructorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AvailabilityUpsertWithWhereUniqueWithoutInstructorInputSchema), z.lazy(() => AvailabilityUpsertWithWhereUniqueWithoutInstructorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AvailabilityCreateManyInstructorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AvailabilityWhereUniqueInputSchema), z.lazy(() => AvailabilityWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AvailabilityWhereUniqueInputSchema), z.lazy(() => AvailabilityWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AvailabilityWhereUniqueInputSchema), z.lazy(() => AvailabilityWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AvailabilityWhereUniqueInputSchema), z.lazy(() => AvailabilityWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AvailabilityUpdateWithWhereUniqueWithoutInstructorInputSchema), z.lazy(() => AvailabilityUpdateWithWhereUniqueWithoutInstructorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AvailabilityUpdateManyWithWhereWithoutInstructorInputSchema), z.lazy(() => AvailabilityUpdateManyWithWhereWithoutInstructorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AvailabilityScalarWhereInputSchema), z.lazy(() => AvailabilityScalarWhereInputSchema).array() ]).optional(),
});

export const LessonUpdateManyWithoutInstructorNestedInputSchema: z.ZodType<Prisma.LessonUpdateManyWithoutInstructorNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => LessonCreateWithoutInstructorInputSchema), z.lazy(() => LessonCreateWithoutInstructorInputSchema).array(), z.lazy(() => LessonUncheckedCreateWithoutInstructorInputSchema), z.lazy(() => LessonUncheckedCreateWithoutInstructorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LessonCreateOrConnectWithoutInstructorInputSchema), z.lazy(() => LessonCreateOrConnectWithoutInstructorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LessonUpsertWithWhereUniqueWithoutInstructorInputSchema), z.lazy(() => LessonUpsertWithWhereUniqueWithoutInstructorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LessonCreateManyInstructorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LessonWhereUniqueInputSchema), z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LessonWhereUniqueInputSchema), z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LessonWhereUniqueInputSchema), z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LessonWhereUniqueInputSchema), z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LessonUpdateWithWhereUniqueWithoutInstructorInputSchema), z.lazy(() => LessonUpdateWithWhereUniqueWithoutInstructorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LessonUpdateManyWithWhereWithoutInstructorInputSchema), z.lazy(() => LessonUpdateManyWithWhereWithoutInstructorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LessonScalarWhereInputSchema), z.lazy(() => LessonScalarWhereInputSchema).array() ]).optional(),
});

export const StudentProfileUpdateManyWithoutInstructorNestedInputSchema: z.ZodType<Prisma.StudentProfileUpdateManyWithoutInstructorNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => StudentProfileCreateWithoutInstructorInputSchema), z.lazy(() => StudentProfileCreateWithoutInstructorInputSchema).array(), z.lazy(() => StudentProfileUncheckedCreateWithoutInstructorInputSchema), z.lazy(() => StudentProfileUncheckedCreateWithoutInstructorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StudentProfileCreateOrConnectWithoutInstructorInputSchema), z.lazy(() => StudentProfileCreateOrConnectWithoutInstructorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StudentProfileUpsertWithWhereUniqueWithoutInstructorInputSchema), z.lazy(() => StudentProfileUpsertWithWhereUniqueWithoutInstructorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StudentProfileCreateManyInstructorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StudentProfileWhereUniqueInputSchema), z.lazy(() => StudentProfileWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StudentProfileWhereUniqueInputSchema), z.lazy(() => StudentProfileWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StudentProfileWhereUniqueInputSchema), z.lazy(() => StudentProfileWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StudentProfileWhereUniqueInputSchema), z.lazy(() => StudentProfileWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StudentProfileUpdateWithWhereUniqueWithoutInstructorInputSchema), z.lazy(() => StudentProfileUpdateWithWhereUniqueWithoutInstructorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StudentProfileUpdateManyWithWhereWithoutInstructorInputSchema), z.lazy(() => StudentProfileUpdateManyWithWhereWithoutInstructorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StudentProfileScalarWhereInputSchema), z.lazy(() => StudentProfileScalarWhereInputSchema).array() ]).optional(),
});

export const AvailabilityUncheckedUpdateManyWithoutInstructorNestedInputSchema: z.ZodType<Prisma.AvailabilityUncheckedUpdateManyWithoutInstructorNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => AvailabilityCreateWithoutInstructorInputSchema), z.lazy(() => AvailabilityCreateWithoutInstructorInputSchema).array(), z.lazy(() => AvailabilityUncheckedCreateWithoutInstructorInputSchema), z.lazy(() => AvailabilityUncheckedCreateWithoutInstructorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AvailabilityCreateOrConnectWithoutInstructorInputSchema), z.lazy(() => AvailabilityCreateOrConnectWithoutInstructorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AvailabilityUpsertWithWhereUniqueWithoutInstructorInputSchema), z.lazy(() => AvailabilityUpsertWithWhereUniqueWithoutInstructorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AvailabilityCreateManyInstructorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AvailabilityWhereUniqueInputSchema), z.lazy(() => AvailabilityWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AvailabilityWhereUniqueInputSchema), z.lazy(() => AvailabilityWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AvailabilityWhereUniqueInputSchema), z.lazy(() => AvailabilityWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AvailabilityWhereUniqueInputSchema), z.lazy(() => AvailabilityWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AvailabilityUpdateWithWhereUniqueWithoutInstructorInputSchema), z.lazy(() => AvailabilityUpdateWithWhereUniqueWithoutInstructorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AvailabilityUpdateManyWithWhereWithoutInstructorInputSchema), z.lazy(() => AvailabilityUpdateManyWithWhereWithoutInstructorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AvailabilityScalarWhereInputSchema), z.lazy(() => AvailabilityScalarWhereInputSchema).array() ]).optional(),
});

export const LessonUncheckedUpdateManyWithoutInstructorNestedInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateManyWithoutInstructorNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => LessonCreateWithoutInstructorInputSchema), z.lazy(() => LessonCreateWithoutInstructorInputSchema).array(), z.lazy(() => LessonUncheckedCreateWithoutInstructorInputSchema), z.lazy(() => LessonUncheckedCreateWithoutInstructorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LessonCreateOrConnectWithoutInstructorInputSchema), z.lazy(() => LessonCreateOrConnectWithoutInstructorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LessonUpsertWithWhereUniqueWithoutInstructorInputSchema), z.lazy(() => LessonUpsertWithWhereUniqueWithoutInstructorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LessonCreateManyInstructorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LessonWhereUniqueInputSchema), z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LessonWhereUniqueInputSchema), z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LessonWhereUniqueInputSchema), z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LessonWhereUniqueInputSchema), z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LessonUpdateWithWhereUniqueWithoutInstructorInputSchema), z.lazy(() => LessonUpdateWithWhereUniqueWithoutInstructorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LessonUpdateManyWithWhereWithoutInstructorInputSchema), z.lazy(() => LessonUpdateManyWithWhereWithoutInstructorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LessonScalarWhereInputSchema), z.lazy(() => LessonScalarWhereInputSchema).array() ]).optional(),
});

export const StudentProfileUncheckedUpdateManyWithoutInstructorNestedInputSchema: z.ZodType<Prisma.StudentProfileUncheckedUpdateManyWithoutInstructorNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => StudentProfileCreateWithoutInstructorInputSchema), z.lazy(() => StudentProfileCreateWithoutInstructorInputSchema).array(), z.lazy(() => StudentProfileUncheckedCreateWithoutInstructorInputSchema), z.lazy(() => StudentProfileUncheckedCreateWithoutInstructorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StudentProfileCreateOrConnectWithoutInstructorInputSchema), z.lazy(() => StudentProfileCreateOrConnectWithoutInstructorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StudentProfileUpsertWithWhereUniqueWithoutInstructorInputSchema), z.lazy(() => StudentProfileUpsertWithWhereUniqueWithoutInstructorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StudentProfileCreateManyInstructorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StudentProfileWhereUniqueInputSchema), z.lazy(() => StudentProfileWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StudentProfileWhereUniqueInputSchema), z.lazy(() => StudentProfileWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StudentProfileWhereUniqueInputSchema), z.lazy(() => StudentProfileWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StudentProfileWhereUniqueInputSchema), z.lazy(() => StudentProfileWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StudentProfileUpdateWithWhereUniqueWithoutInstructorInputSchema), z.lazy(() => StudentProfileUpdateWithWhereUniqueWithoutInstructorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StudentProfileUpdateManyWithWhereWithoutInstructorInputSchema), z.lazy(() => StudentProfileUpdateManyWithWhereWithoutInstructorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StudentProfileScalarWhereInputSchema), z.lazy(() => StudentProfileScalarWhereInputSchema).array() ]).optional(),
});

export const UserCreateNestedOneWithoutStudentProfileInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutStudentProfileInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutStudentProfileInputSchema), z.lazy(() => UserUncheckedCreateWithoutStudentProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutStudentProfileInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const InstructorProfileCreateNestedOneWithoutStudentsInputSchema: z.ZodType<Prisma.InstructorProfileCreateNestedOneWithoutStudentsInput> = z.strictObject({
  create: z.union([ z.lazy(() => InstructorProfileCreateWithoutStudentsInputSchema), z.lazy(() => InstructorProfileUncheckedCreateWithoutStudentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InstructorProfileCreateOrConnectWithoutStudentsInputSchema).optional(),
  connect: z.lazy(() => InstructorProfileWhereUniqueInputSchema).optional(),
});

export const LessonCreateNestedManyWithoutStudentInputSchema: z.ZodType<Prisma.LessonCreateNestedManyWithoutStudentInput> = z.strictObject({
  create: z.union([ z.lazy(() => LessonCreateWithoutStudentInputSchema), z.lazy(() => LessonCreateWithoutStudentInputSchema).array(), z.lazy(() => LessonUncheckedCreateWithoutStudentInputSchema), z.lazy(() => LessonUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LessonCreateOrConnectWithoutStudentInputSchema), z.lazy(() => LessonCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LessonCreateManyStudentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LessonWhereUniqueInputSchema), z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
});

export const LessonUncheckedCreateNestedManyWithoutStudentInputSchema: z.ZodType<Prisma.LessonUncheckedCreateNestedManyWithoutStudentInput> = z.strictObject({
  create: z.union([ z.lazy(() => LessonCreateWithoutStudentInputSchema), z.lazy(() => LessonCreateWithoutStudentInputSchema).array(), z.lazy(() => LessonUncheckedCreateWithoutStudentInputSchema), z.lazy(() => LessonUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LessonCreateOrConnectWithoutStudentInputSchema), z.lazy(() => LessonCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LessonCreateManyStudentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LessonWhereUniqueInputSchema), z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
});

export const UserUpdateOneRequiredWithoutStudentProfileNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutStudentProfileNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutStudentProfileInputSchema), z.lazy(() => UserUncheckedCreateWithoutStudentProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutStudentProfileInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutStudentProfileInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutStudentProfileInputSchema), z.lazy(() => UserUpdateWithoutStudentProfileInputSchema), z.lazy(() => UserUncheckedUpdateWithoutStudentProfileInputSchema) ]).optional(),
});

export const InstructorProfileUpdateOneRequiredWithoutStudentsNestedInputSchema: z.ZodType<Prisma.InstructorProfileUpdateOneRequiredWithoutStudentsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => InstructorProfileCreateWithoutStudentsInputSchema), z.lazy(() => InstructorProfileUncheckedCreateWithoutStudentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InstructorProfileCreateOrConnectWithoutStudentsInputSchema).optional(),
  upsert: z.lazy(() => InstructorProfileUpsertWithoutStudentsInputSchema).optional(),
  connect: z.lazy(() => InstructorProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => InstructorProfileUpdateToOneWithWhereWithoutStudentsInputSchema), z.lazy(() => InstructorProfileUpdateWithoutStudentsInputSchema), z.lazy(() => InstructorProfileUncheckedUpdateWithoutStudentsInputSchema) ]).optional(),
});

export const LessonUpdateManyWithoutStudentNestedInputSchema: z.ZodType<Prisma.LessonUpdateManyWithoutStudentNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => LessonCreateWithoutStudentInputSchema), z.lazy(() => LessonCreateWithoutStudentInputSchema).array(), z.lazy(() => LessonUncheckedCreateWithoutStudentInputSchema), z.lazy(() => LessonUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LessonCreateOrConnectWithoutStudentInputSchema), z.lazy(() => LessonCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LessonUpsertWithWhereUniqueWithoutStudentInputSchema), z.lazy(() => LessonUpsertWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LessonCreateManyStudentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LessonWhereUniqueInputSchema), z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LessonWhereUniqueInputSchema), z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LessonWhereUniqueInputSchema), z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LessonWhereUniqueInputSchema), z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LessonUpdateWithWhereUniqueWithoutStudentInputSchema), z.lazy(() => LessonUpdateWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LessonUpdateManyWithWhereWithoutStudentInputSchema), z.lazy(() => LessonUpdateManyWithWhereWithoutStudentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LessonScalarWhereInputSchema), z.lazy(() => LessonScalarWhereInputSchema).array() ]).optional(),
});

export const LessonUncheckedUpdateManyWithoutStudentNestedInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateManyWithoutStudentNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => LessonCreateWithoutStudentInputSchema), z.lazy(() => LessonCreateWithoutStudentInputSchema).array(), z.lazy(() => LessonUncheckedCreateWithoutStudentInputSchema), z.lazy(() => LessonUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LessonCreateOrConnectWithoutStudentInputSchema), z.lazy(() => LessonCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LessonUpsertWithWhereUniqueWithoutStudentInputSchema), z.lazy(() => LessonUpsertWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LessonCreateManyStudentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LessonWhereUniqueInputSchema), z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LessonWhereUniqueInputSchema), z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LessonWhereUniqueInputSchema), z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LessonWhereUniqueInputSchema), z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LessonUpdateWithWhereUniqueWithoutStudentInputSchema), z.lazy(() => LessonUpdateWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LessonUpdateManyWithWhereWithoutStudentInputSchema), z.lazy(() => LessonUpdateManyWithWhereWithoutStudentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LessonScalarWhereInputSchema), z.lazy(() => LessonScalarWhereInputSchema).array() ]).optional(),
});

export const SchoolCreateNestedOneWithoutLessonsInputSchema: z.ZodType<Prisma.SchoolCreateNestedOneWithoutLessonsInput> = z.strictObject({
  create: z.union([ z.lazy(() => SchoolCreateWithoutLessonsInputSchema), z.lazy(() => SchoolUncheckedCreateWithoutLessonsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SchoolCreateOrConnectWithoutLessonsInputSchema).optional(),
  connect: z.lazy(() => SchoolWhereUniqueInputSchema).optional(),
});

export const InstructorProfileCreateNestedOneWithoutLessonsInputSchema: z.ZodType<Prisma.InstructorProfileCreateNestedOneWithoutLessonsInput> = z.strictObject({
  create: z.union([ z.lazy(() => InstructorProfileCreateWithoutLessonsInputSchema), z.lazy(() => InstructorProfileUncheckedCreateWithoutLessonsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InstructorProfileCreateOrConnectWithoutLessonsInputSchema).optional(),
  connect: z.lazy(() => InstructorProfileWhereUniqueInputSchema).optional(),
});

export const StudentProfileCreateNestedOneWithoutLessonsInputSchema: z.ZodType<Prisma.StudentProfileCreateNestedOneWithoutLessonsInput> = z.strictObject({
  create: z.union([ z.lazy(() => StudentProfileCreateWithoutLessonsInputSchema), z.lazy(() => StudentProfileUncheckedCreateWithoutLessonsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StudentProfileCreateOrConnectWithoutLessonsInputSchema).optional(),
  connect: z.lazy(() => StudentProfileWhereUniqueInputSchema).optional(),
});

export const EnumLessonStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumLessonStatusFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => LessonStatusSchema).optional(),
});

export const SchoolUpdateOneRequiredWithoutLessonsNestedInputSchema: z.ZodType<Prisma.SchoolUpdateOneRequiredWithoutLessonsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => SchoolCreateWithoutLessonsInputSchema), z.lazy(() => SchoolUncheckedCreateWithoutLessonsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SchoolCreateOrConnectWithoutLessonsInputSchema).optional(),
  upsert: z.lazy(() => SchoolUpsertWithoutLessonsInputSchema).optional(),
  connect: z.lazy(() => SchoolWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SchoolUpdateToOneWithWhereWithoutLessonsInputSchema), z.lazy(() => SchoolUpdateWithoutLessonsInputSchema), z.lazy(() => SchoolUncheckedUpdateWithoutLessonsInputSchema) ]).optional(),
});

export const InstructorProfileUpdateOneRequiredWithoutLessonsNestedInputSchema: z.ZodType<Prisma.InstructorProfileUpdateOneRequiredWithoutLessonsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => InstructorProfileCreateWithoutLessonsInputSchema), z.lazy(() => InstructorProfileUncheckedCreateWithoutLessonsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InstructorProfileCreateOrConnectWithoutLessonsInputSchema).optional(),
  upsert: z.lazy(() => InstructorProfileUpsertWithoutLessonsInputSchema).optional(),
  connect: z.lazy(() => InstructorProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => InstructorProfileUpdateToOneWithWhereWithoutLessonsInputSchema), z.lazy(() => InstructorProfileUpdateWithoutLessonsInputSchema), z.lazy(() => InstructorProfileUncheckedUpdateWithoutLessonsInputSchema) ]).optional(),
});

export const StudentProfileUpdateOneRequiredWithoutLessonsNestedInputSchema: z.ZodType<Prisma.StudentProfileUpdateOneRequiredWithoutLessonsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => StudentProfileCreateWithoutLessonsInputSchema), z.lazy(() => StudentProfileUncheckedCreateWithoutLessonsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StudentProfileCreateOrConnectWithoutLessonsInputSchema).optional(),
  upsert: z.lazy(() => StudentProfileUpsertWithoutLessonsInputSchema).optional(),
  connect: z.lazy(() => StudentProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StudentProfileUpdateToOneWithWhereWithoutLessonsInputSchema), z.lazy(() => StudentProfileUpdateWithoutLessonsInputSchema), z.lazy(() => StudentProfileUncheckedUpdateWithoutLessonsInputSchema) ]).optional(),
});

export const InstructorProfileCreateNestedOneWithoutAvailabilityInputSchema: z.ZodType<Prisma.InstructorProfileCreateNestedOneWithoutAvailabilityInput> = z.strictObject({
  create: z.union([ z.lazy(() => InstructorProfileCreateWithoutAvailabilityInputSchema), z.lazy(() => InstructorProfileUncheckedCreateWithoutAvailabilityInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InstructorProfileCreateOrConnectWithoutAvailabilityInputSchema).optional(),
  connect: z.lazy(() => InstructorProfileWhereUniqueInputSchema).optional(),
});

export const InstructorProfileUpdateOneRequiredWithoutAvailabilityNestedInputSchema: z.ZodType<Prisma.InstructorProfileUpdateOneRequiredWithoutAvailabilityNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => InstructorProfileCreateWithoutAvailabilityInputSchema), z.lazy(() => InstructorProfileUncheckedCreateWithoutAvailabilityInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InstructorProfileCreateOrConnectWithoutAvailabilityInputSchema).optional(),
  upsert: z.lazy(() => InstructorProfileUpsertWithoutAvailabilityInputSchema).optional(),
  connect: z.lazy(() => InstructorProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => InstructorProfileUpdateToOneWithWhereWithoutAvailabilityInputSchema), z.lazy(() => InstructorProfileUpdateWithoutAvailabilityInputSchema), z.lazy(() => InstructorProfileUncheckedUpdateWithoutAvailabilityInputSchema) ]).optional(),
});

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
});

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
});

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
});

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
});

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
});

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
});

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
});

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
});

export const NestedEnumRoleFilterSchema: z.ZodType<Prisma.NestedEnumRoleFilter> = z.strictObject({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
});

export const NestedEnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
});

export const NestedEnumLessonStatusFilterSchema: z.ZodType<Prisma.NestedEnumLessonStatusFilter> = z.strictObject({
  equals: z.lazy(() => LessonStatusSchema).optional(),
  in: z.lazy(() => LessonStatusSchema).array().optional(),
  notIn: z.lazy(() => LessonStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => LessonStatusSchema), z.lazy(() => NestedEnumLessonStatusFilterSchema) ]).optional(),
});

export const NestedEnumLessonStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumLessonStatusWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => LessonStatusSchema).optional(),
  in: z.lazy(() => LessonStatusSchema).array().optional(),
  notIn: z.lazy(() => LessonStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => LessonStatusSchema), z.lazy(() => NestedEnumLessonStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumLessonStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumLessonStatusFilterSchema).optional(),
});

export const UserCreateWithoutSchoolInputSchema: z.ZodType<Prisma.UserCreateWithoutSchoolInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  passwordHash: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  instructorProfile: z.lazy(() => InstructorProfileCreateNestedOneWithoutUserInputSchema).optional(),
  studentProfile: z.lazy(() => StudentProfileCreateNestedOneWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutSchoolInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSchoolInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  passwordHash: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  instructorProfile: z.lazy(() => InstructorProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  studentProfile: z.lazy(() => StudentProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutSchoolInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSchoolInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSchoolInputSchema), z.lazy(() => UserUncheckedCreateWithoutSchoolInputSchema) ]),
});

export const UserCreateManySchoolInputEnvelopeSchema: z.ZodType<Prisma.UserCreateManySchoolInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => UserCreateManySchoolInputSchema), z.lazy(() => UserCreateManySchoolInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const LessonCreateWithoutSchoolInputSchema: z.ZodType<Prisma.LessonCreateWithoutSchoolInput> = z.strictObject({
  id: z.uuid().optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  status: z.lazy(() => LessonStatusSchema).optional(),
  locationStart: z.string().optional().nullable(),
  locationEnd: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  instructor: z.lazy(() => InstructorProfileCreateNestedOneWithoutLessonsInputSchema),
  student: z.lazy(() => StudentProfileCreateNestedOneWithoutLessonsInputSchema),
});

export const LessonUncheckedCreateWithoutSchoolInputSchema: z.ZodType<Prisma.LessonUncheckedCreateWithoutSchoolInput> = z.strictObject({
  id: z.uuid().optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  status: z.lazy(() => LessonStatusSchema).optional(),
  locationStart: z.string().optional().nullable(),
  locationEnd: z.string().optional().nullable(),
  instructorId: z.string(),
  studentId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const LessonCreateOrConnectWithoutSchoolInputSchema: z.ZodType<Prisma.LessonCreateOrConnectWithoutSchoolInput> = z.strictObject({
  where: z.lazy(() => LessonWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LessonCreateWithoutSchoolInputSchema), z.lazy(() => LessonUncheckedCreateWithoutSchoolInputSchema) ]),
});

export const LessonCreateManySchoolInputEnvelopeSchema: z.ZodType<Prisma.LessonCreateManySchoolInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => LessonCreateManySchoolInputSchema), z.lazy(() => LessonCreateManySchoolInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const UserUpsertWithWhereUniqueWithoutSchoolInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutSchoolInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutSchoolInputSchema), z.lazy(() => UserUncheckedUpdateWithoutSchoolInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSchoolInputSchema), z.lazy(() => UserUncheckedCreateWithoutSchoolInputSchema) ]),
});

export const UserUpdateWithWhereUniqueWithoutSchoolInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutSchoolInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutSchoolInputSchema), z.lazy(() => UserUncheckedUpdateWithoutSchoolInputSchema) ]),
});

export const UserUpdateManyWithWhereWithoutSchoolInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutSchoolInput> = z.strictObject({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema), z.lazy(() => UserUncheckedUpdateManyWithoutSchoolInputSchema) ]),
});

export const UserScalarWhereInputSchema: z.ZodType<Prisma.UserScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserScalarWhereInputSchema), z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereInputSchema), z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  passwordHash: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema) ]).optional(),
  firstName: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  schoolId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const LessonUpsertWithWhereUniqueWithoutSchoolInputSchema: z.ZodType<Prisma.LessonUpsertWithWhereUniqueWithoutSchoolInput> = z.strictObject({
  where: z.lazy(() => LessonWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LessonUpdateWithoutSchoolInputSchema), z.lazy(() => LessonUncheckedUpdateWithoutSchoolInputSchema) ]),
  create: z.union([ z.lazy(() => LessonCreateWithoutSchoolInputSchema), z.lazy(() => LessonUncheckedCreateWithoutSchoolInputSchema) ]),
});

export const LessonUpdateWithWhereUniqueWithoutSchoolInputSchema: z.ZodType<Prisma.LessonUpdateWithWhereUniqueWithoutSchoolInput> = z.strictObject({
  where: z.lazy(() => LessonWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LessonUpdateWithoutSchoolInputSchema), z.lazy(() => LessonUncheckedUpdateWithoutSchoolInputSchema) ]),
});

export const LessonUpdateManyWithWhereWithoutSchoolInputSchema: z.ZodType<Prisma.LessonUpdateManyWithWhereWithoutSchoolInput> = z.strictObject({
  where: z.lazy(() => LessonScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LessonUpdateManyMutationInputSchema), z.lazy(() => LessonUncheckedUpdateManyWithoutSchoolInputSchema) ]),
});

export const LessonScalarWhereInputSchema: z.ZodType<Prisma.LessonScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => LessonScalarWhereInputSchema), z.lazy(() => LessonScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LessonScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LessonScalarWhereInputSchema), z.lazy(() => LessonScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  startTime: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  endTime: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumLessonStatusFilterSchema), z.lazy(() => LessonStatusSchema) ]).optional(),
  locationStart: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  locationEnd: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  schoolId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  instructorId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  studentId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const SchoolCreateWithoutUsersInputSchema: z.ZodType<Prisma.SchoolCreateWithoutUsersInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  address: z.string().optional().nullable(),
  lessonDuration: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lessons: z.lazy(() => LessonCreateNestedManyWithoutSchoolInputSchema).optional(),
});

export const SchoolUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.SchoolUncheckedCreateWithoutUsersInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  address: z.string().optional().nullable(),
  lessonDuration: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lessons: z.lazy(() => LessonUncheckedCreateNestedManyWithoutSchoolInputSchema).optional(),
});

export const SchoolCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.SchoolCreateOrConnectWithoutUsersInput> = z.strictObject({
  where: z.lazy(() => SchoolWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SchoolCreateWithoutUsersInputSchema), z.lazy(() => SchoolUncheckedCreateWithoutUsersInputSchema) ]),
});

export const InstructorProfileCreateWithoutUserInputSchema: z.ZodType<Prisma.InstructorProfileCreateWithoutUserInput> = z.strictObject({
  id: z.uuid().optional(),
  licenseCategories: z.union([ z.lazy(() => InstructorProfileCreatelicenseCategoriesInputSchema), z.string().array() ]).optional(),
  availability: z.lazy(() => AvailabilityCreateNestedManyWithoutInstructorInputSchema).optional(),
  lessons: z.lazy(() => LessonCreateNestedManyWithoutInstructorInputSchema).optional(),
  students: z.lazy(() => StudentProfileCreateNestedManyWithoutInstructorInputSchema).optional(),
});

export const InstructorProfileUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.InstructorProfileUncheckedCreateWithoutUserInput> = z.strictObject({
  id: z.uuid().optional(),
  licenseCategories: z.union([ z.lazy(() => InstructorProfileCreatelicenseCategoriesInputSchema), z.string().array() ]).optional(),
  availability: z.lazy(() => AvailabilityUncheckedCreateNestedManyWithoutInstructorInputSchema).optional(),
  lessons: z.lazy(() => LessonUncheckedCreateNestedManyWithoutInstructorInputSchema).optional(),
  students: z.lazy(() => StudentProfileUncheckedCreateNestedManyWithoutInstructorInputSchema).optional(),
});

export const InstructorProfileCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.InstructorProfileCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => InstructorProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InstructorProfileCreateWithoutUserInputSchema), z.lazy(() => InstructorProfileUncheckedCreateWithoutUserInputSchema) ]),
});

export const StudentProfileCreateWithoutUserInputSchema: z.ZodType<Prisma.StudentProfileCreateWithoutUserInput> = z.strictObject({
  id: z.uuid().optional(),
  totalLessons: z.number().int().optional(),
  balance: z.number().int().optional(),
  instructor: z.lazy(() => InstructorProfileCreateNestedOneWithoutStudentsInputSchema),
  lessons: z.lazy(() => LessonCreateNestedManyWithoutStudentInputSchema).optional(),
});

export const StudentProfileUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.StudentProfileUncheckedCreateWithoutUserInput> = z.strictObject({
  id: z.uuid().optional(),
  instructorId: z.string(),
  totalLessons: z.number().int().optional(),
  balance: z.number().int().optional(),
  lessons: z.lazy(() => LessonUncheckedCreateNestedManyWithoutStudentInputSchema).optional(),
});

export const StudentProfileCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.StudentProfileCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => StudentProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StudentProfileCreateWithoutUserInputSchema), z.lazy(() => StudentProfileUncheckedCreateWithoutUserInputSchema) ]),
});

export const SchoolUpsertWithoutUsersInputSchema: z.ZodType<Prisma.SchoolUpsertWithoutUsersInput> = z.strictObject({
  update: z.union([ z.lazy(() => SchoolUpdateWithoutUsersInputSchema), z.lazy(() => SchoolUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => SchoolCreateWithoutUsersInputSchema), z.lazy(() => SchoolUncheckedCreateWithoutUsersInputSchema) ]),
  where: z.lazy(() => SchoolWhereInputSchema).optional(),
});

export const SchoolUpdateToOneWithWhereWithoutUsersInputSchema: z.ZodType<Prisma.SchoolUpdateToOneWithWhereWithoutUsersInput> = z.strictObject({
  where: z.lazy(() => SchoolWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => SchoolUpdateWithoutUsersInputSchema), z.lazy(() => SchoolUncheckedUpdateWithoutUsersInputSchema) ]),
});

export const SchoolUpdateWithoutUsersInputSchema: z.ZodType<Prisma.SchoolUpdateWithoutUsersInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lessonDuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lessons: z.lazy(() => LessonUpdateManyWithoutSchoolNestedInputSchema).optional(),
});

export const SchoolUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.SchoolUncheckedUpdateWithoutUsersInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lessonDuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lessons: z.lazy(() => LessonUncheckedUpdateManyWithoutSchoolNestedInputSchema).optional(),
});

export const InstructorProfileUpsertWithoutUserInputSchema: z.ZodType<Prisma.InstructorProfileUpsertWithoutUserInput> = z.strictObject({
  update: z.union([ z.lazy(() => InstructorProfileUpdateWithoutUserInputSchema), z.lazy(() => InstructorProfileUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => InstructorProfileCreateWithoutUserInputSchema), z.lazy(() => InstructorProfileUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => InstructorProfileWhereInputSchema).optional(),
});

export const InstructorProfileUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.InstructorProfileUpdateToOneWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => InstructorProfileWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => InstructorProfileUpdateWithoutUserInputSchema), z.lazy(() => InstructorProfileUncheckedUpdateWithoutUserInputSchema) ]),
});

export const InstructorProfileUpdateWithoutUserInputSchema: z.ZodType<Prisma.InstructorProfileUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  licenseCategories: z.union([ z.lazy(() => InstructorProfileUpdatelicenseCategoriesInputSchema), z.string().array() ]).optional(),
  availability: z.lazy(() => AvailabilityUpdateManyWithoutInstructorNestedInputSchema).optional(),
  lessons: z.lazy(() => LessonUpdateManyWithoutInstructorNestedInputSchema).optional(),
  students: z.lazy(() => StudentProfileUpdateManyWithoutInstructorNestedInputSchema).optional(),
});

export const InstructorProfileUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.InstructorProfileUncheckedUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  licenseCategories: z.union([ z.lazy(() => InstructorProfileUpdatelicenseCategoriesInputSchema), z.string().array() ]).optional(),
  availability: z.lazy(() => AvailabilityUncheckedUpdateManyWithoutInstructorNestedInputSchema).optional(),
  lessons: z.lazy(() => LessonUncheckedUpdateManyWithoutInstructorNestedInputSchema).optional(),
  students: z.lazy(() => StudentProfileUncheckedUpdateManyWithoutInstructorNestedInputSchema).optional(),
});

export const StudentProfileUpsertWithoutUserInputSchema: z.ZodType<Prisma.StudentProfileUpsertWithoutUserInput> = z.strictObject({
  update: z.union([ z.lazy(() => StudentProfileUpdateWithoutUserInputSchema), z.lazy(() => StudentProfileUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => StudentProfileCreateWithoutUserInputSchema), z.lazy(() => StudentProfileUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => StudentProfileWhereInputSchema).optional(),
});

export const StudentProfileUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.StudentProfileUpdateToOneWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => StudentProfileWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => StudentProfileUpdateWithoutUserInputSchema), z.lazy(() => StudentProfileUncheckedUpdateWithoutUserInputSchema) ]),
});

export const StudentProfileUpdateWithoutUserInputSchema: z.ZodType<Prisma.StudentProfileUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalLessons: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  instructor: z.lazy(() => InstructorProfileUpdateOneRequiredWithoutStudentsNestedInputSchema).optional(),
  lessons: z.lazy(() => LessonUpdateManyWithoutStudentNestedInputSchema).optional(),
});

export const StudentProfileUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.StudentProfileUncheckedUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  instructorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalLessons: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  lessons: z.lazy(() => LessonUncheckedUpdateManyWithoutStudentNestedInputSchema).optional(),
});

export const UserCreateWithoutInstructorProfileInputSchema: z.ZodType<Prisma.UserCreateWithoutInstructorProfileInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  passwordHash: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  school: z.lazy(() => SchoolCreateNestedOneWithoutUsersInputSchema),
  studentProfile: z.lazy(() => StudentProfileCreateNestedOneWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutInstructorProfileInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutInstructorProfileInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  passwordHash: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  schoolId: z.string(),
  studentProfile: z.lazy(() => StudentProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutInstructorProfileInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutInstructorProfileInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutInstructorProfileInputSchema), z.lazy(() => UserUncheckedCreateWithoutInstructorProfileInputSchema) ]),
});

export const AvailabilityCreateWithoutInstructorInputSchema: z.ZodType<Prisma.AvailabilityCreateWithoutInstructorInput> = z.strictObject({
  id: z.uuid().optional(),
  dayOfWeek: z.number().int(),
  startTime: z.string(),
  endTime: z.string(),
});

export const AvailabilityUncheckedCreateWithoutInstructorInputSchema: z.ZodType<Prisma.AvailabilityUncheckedCreateWithoutInstructorInput> = z.strictObject({
  id: z.uuid().optional(),
  dayOfWeek: z.number().int(),
  startTime: z.string(),
  endTime: z.string(),
});

export const AvailabilityCreateOrConnectWithoutInstructorInputSchema: z.ZodType<Prisma.AvailabilityCreateOrConnectWithoutInstructorInput> = z.strictObject({
  where: z.lazy(() => AvailabilityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AvailabilityCreateWithoutInstructorInputSchema), z.lazy(() => AvailabilityUncheckedCreateWithoutInstructorInputSchema) ]),
});

export const AvailabilityCreateManyInstructorInputEnvelopeSchema: z.ZodType<Prisma.AvailabilityCreateManyInstructorInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => AvailabilityCreateManyInstructorInputSchema), z.lazy(() => AvailabilityCreateManyInstructorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const LessonCreateWithoutInstructorInputSchema: z.ZodType<Prisma.LessonCreateWithoutInstructorInput> = z.strictObject({
  id: z.uuid().optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  status: z.lazy(() => LessonStatusSchema).optional(),
  locationStart: z.string().optional().nullable(),
  locationEnd: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  school: z.lazy(() => SchoolCreateNestedOneWithoutLessonsInputSchema),
  student: z.lazy(() => StudentProfileCreateNestedOneWithoutLessonsInputSchema),
});

export const LessonUncheckedCreateWithoutInstructorInputSchema: z.ZodType<Prisma.LessonUncheckedCreateWithoutInstructorInput> = z.strictObject({
  id: z.uuid().optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  status: z.lazy(() => LessonStatusSchema).optional(),
  locationStart: z.string().optional().nullable(),
  locationEnd: z.string().optional().nullable(),
  schoolId: z.string(),
  studentId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const LessonCreateOrConnectWithoutInstructorInputSchema: z.ZodType<Prisma.LessonCreateOrConnectWithoutInstructorInput> = z.strictObject({
  where: z.lazy(() => LessonWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LessonCreateWithoutInstructorInputSchema), z.lazy(() => LessonUncheckedCreateWithoutInstructorInputSchema) ]),
});

export const LessonCreateManyInstructorInputEnvelopeSchema: z.ZodType<Prisma.LessonCreateManyInstructorInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => LessonCreateManyInstructorInputSchema), z.lazy(() => LessonCreateManyInstructorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const StudentProfileCreateWithoutInstructorInputSchema: z.ZodType<Prisma.StudentProfileCreateWithoutInstructorInput> = z.strictObject({
  id: z.uuid().optional(),
  totalLessons: z.number().int().optional(),
  balance: z.number().int().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutStudentProfileInputSchema),
  lessons: z.lazy(() => LessonCreateNestedManyWithoutStudentInputSchema).optional(),
});

export const StudentProfileUncheckedCreateWithoutInstructorInputSchema: z.ZodType<Prisma.StudentProfileUncheckedCreateWithoutInstructorInput> = z.strictObject({
  id: z.uuid().optional(),
  userId: z.string(),
  totalLessons: z.number().int().optional(),
  balance: z.number().int().optional(),
  lessons: z.lazy(() => LessonUncheckedCreateNestedManyWithoutStudentInputSchema).optional(),
});

export const StudentProfileCreateOrConnectWithoutInstructorInputSchema: z.ZodType<Prisma.StudentProfileCreateOrConnectWithoutInstructorInput> = z.strictObject({
  where: z.lazy(() => StudentProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StudentProfileCreateWithoutInstructorInputSchema), z.lazy(() => StudentProfileUncheckedCreateWithoutInstructorInputSchema) ]),
});

export const StudentProfileCreateManyInstructorInputEnvelopeSchema: z.ZodType<Prisma.StudentProfileCreateManyInstructorInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => StudentProfileCreateManyInstructorInputSchema), z.lazy(() => StudentProfileCreateManyInstructorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const UserUpsertWithoutInstructorProfileInputSchema: z.ZodType<Prisma.UserUpsertWithoutInstructorProfileInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutInstructorProfileInputSchema), z.lazy(() => UserUncheckedUpdateWithoutInstructorProfileInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutInstructorProfileInputSchema), z.lazy(() => UserUncheckedCreateWithoutInstructorProfileInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutInstructorProfileInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutInstructorProfileInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutInstructorProfileInputSchema), z.lazy(() => UserUncheckedUpdateWithoutInstructorProfileInputSchema) ]),
});

export const UserUpdateWithoutInstructorProfileInputSchema: z.ZodType<Prisma.UserUpdateWithoutInstructorProfileInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  school: z.lazy(() => SchoolUpdateOneRequiredWithoutUsersNestedInputSchema).optional(),
  studentProfile: z.lazy(() => StudentProfileUpdateOneWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutInstructorProfileInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutInstructorProfileInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  schoolId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  studentProfile: z.lazy(() => StudentProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
});

export const AvailabilityUpsertWithWhereUniqueWithoutInstructorInputSchema: z.ZodType<Prisma.AvailabilityUpsertWithWhereUniqueWithoutInstructorInput> = z.strictObject({
  where: z.lazy(() => AvailabilityWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AvailabilityUpdateWithoutInstructorInputSchema), z.lazy(() => AvailabilityUncheckedUpdateWithoutInstructorInputSchema) ]),
  create: z.union([ z.lazy(() => AvailabilityCreateWithoutInstructorInputSchema), z.lazy(() => AvailabilityUncheckedCreateWithoutInstructorInputSchema) ]),
});

export const AvailabilityUpdateWithWhereUniqueWithoutInstructorInputSchema: z.ZodType<Prisma.AvailabilityUpdateWithWhereUniqueWithoutInstructorInput> = z.strictObject({
  where: z.lazy(() => AvailabilityWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AvailabilityUpdateWithoutInstructorInputSchema), z.lazy(() => AvailabilityUncheckedUpdateWithoutInstructorInputSchema) ]),
});

export const AvailabilityUpdateManyWithWhereWithoutInstructorInputSchema: z.ZodType<Prisma.AvailabilityUpdateManyWithWhereWithoutInstructorInput> = z.strictObject({
  where: z.lazy(() => AvailabilityScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AvailabilityUpdateManyMutationInputSchema), z.lazy(() => AvailabilityUncheckedUpdateManyWithoutInstructorInputSchema) ]),
});

export const AvailabilityScalarWhereInputSchema: z.ZodType<Prisma.AvailabilityScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => AvailabilityScalarWhereInputSchema), z.lazy(() => AvailabilityScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AvailabilityScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AvailabilityScalarWhereInputSchema), z.lazy(() => AvailabilityScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  instructorId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  dayOfWeek: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  startTime: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  endTime: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const LessonUpsertWithWhereUniqueWithoutInstructorInputSchema: z.ZodType<Prisma.LessonUpsertWithWhereUniqueWithoutInstructorInput> = z.strictObject({
  where: z.lazy(() => LessonWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LessonUpdateWithoutInstructorInputSchema), z.lazy(() => LessonUncheckedUpdateWithoutInstructorInputSchema) ]),
  create: z.union([ z.lazy(() => LessonCreateWithoutInstructorInputSchema), z.lazy(() => LessonUncheckedCreateWithoutInstructorInputSchema) ]),
});

export const LessonUpdateWithWhereUniqueWithoutInstructorInputSchema: z.ZodType<Prisma.LessonUpdateWithWhereUniqueWithoutInstructorInput> = z.strictObject({
  where: z.lazy(() => LessonWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LessonUpdateWithoutInstructorInputSchema), z.lazy(() => LessonUncheckedUpdateWithoutInstructorInputSchema) ]),
});

export const LessonUpdateManyWithWhereWithoutInstructorInputSchema: z.ZodType<Prisma.LessonUpdateManyWithWhereWithoutInstructorInput> = z.strictObject({
  where: z.lazy(() => LessonScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LessonUpdateManyMutationInputSchema), z.lazy(() => LessonUncheckedUpdateManyWithoutInstructorInputSchema) ]),
});

export const StudentProfileUpsertWithWhereUniqueWithoutInstructorInputSchema: z.ZodType<Prisma.StudentProfileUpsertWithWhereUniqueWithoutInstructorInput> = z.strictObject({
  where: z.lazy(() => StudentProfileWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => StudentProfileUpdateWithoutInstructorInputSchema), z.lazy(() => StudentProfileUncheckedUpdateWithoutInstructorInputSchema) ]),
  create: z.union([ z.lazy(() => StudentProfileCreateWithoutInstructorInputSchema), z.lazy(() => StudentProfileUncheckedCreateWithoutInstructorInputSchema) ]),
});

export const StudentProfileUpdateWithWhereUniqueWithoutInstructorInputSchema: z.ZodType<Prisma.StudentProfileUpdateWithWhereUniqueWithoutInstructorInput> = z.strictObject({
  where: z.lazy(() => StudentProfileWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => StudentProfileUpdateWithoutInstructorInputSchema), z.lazy(() => StudentProfileUncheckedUpdateWithoutInstructorInputSchema) ]),
});

export const StudentProfileUpdateManyWithWhereWithoutInstructorInputSchema: z.ZodType<Prisma.StudentProfileUpdateManyWithWhereWithoutInstructorInput> = z.strictObject({
  where: z.lazy(() => StudentProfileScalarWhereInputSchema),
  data: z.union([ z.lazy(() => StudentProfileUpdateManyMutationInputSchema), z.lazy(() => StudentProfileUncheckedUpdateManyWithoutInstructorInputSchema) ]),
});

export const StudentProfileScalarWhereInputSchema: z.ZodType<Prisma.StudentProfileScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => StudentProfileScalarWhereInputSchema), z.lazy(() => StudentProfileScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StudentProfileScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StudentProfileScalarWhereInputSchema), z.lazy(() => StudentProfileScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  instructorId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  totalLessons: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  balance: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
});

export const UserCreateWithoutStudentProfileInputSchema: z.ZodType<Prisma.UserCreateWithoutStudentProfileInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  passwordHash: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  school: z.lazy(() => SchoolCreateNestedOneWithoutUsersInputSchema),
  instructorProfile: z.lazy(() => InstructorProfileCreateNestedOneWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutStudentProfileInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutStudentProfileInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  passwordHash: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  schoolId: z.string(),
  instructorProfile: z.lazy(() => InstructorProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutStudentProfileInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutStudentProfileInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutStudentProfileInputSchema), z.lazy(() => UserUncheckedCreateWithoutStudentProfileInputSchema) ]),
});

export const InstructorProfileCreateWithoutStudentsInputSchema: z.ZodType<Prisma.InstructorProfileCreateWithoutStudentsInput> = z.strictObject({
  id: z.uuid().optional(),
  licenseCategories: z.union([ z.lazy(() => InstructorProfileCreatelicenseCategoriesInputSchema), z.string().array() ]).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutInstructorProfileInputSchema),
  availability: z.lazy(() => AvailabilityCreateNestedManyWithoutInstructorInputSchema).optional(),
  lessons: z.lazy(() => LessonCreateNestedManyWithoutInstructorInputSchema).optional(),
});

export const InstructorProfileUncheckedCreateWithoutStudentsInputSchema: z.ZodType<Prisma.InstructorProfileUncheckedCreateWithoutStudentsInput> = z.strictObject({
  id: z.uuid().optional(),
  userId: z.string(),
  licenseCategories: z.union([ z.lazy(() => InstructorProfileCreatelicenseCategoriesInputSchema), z.string().array() ]).optional(),
  availability: z.lazy(() => AvailabilityUncheckedCreateNestedManyWithoutInstructorInputSchema).optional(),
  lessons: z.lazy(() => LessonUncheckedCreateNestedManyWithoutInstructorInputSchema).optional(),
});

export const InstructorProfileCreateOrConnectWithoutStudentsInputSchema: z.ZodType<Prisma.InstructorProfileCreateOrConnectWithoutStudentsInput> = z.strictObject({
  where: z.lazy(() => InstructorProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InstructorProfileCreateWithoutStudentsInputSchema), z.lazy(() => InstructorProfileUncheckedCreateWithoutStudentsInputSchema) ]),
});

export const LessonCreateWithoutStudentInputSchema: z.ZodType<Prisma.LessonCreateWithoutStudentInput> = z.strictObject({
  id: z.uuid().optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  status: z.lazy(() => LessonStatusSchema).optional(),
  locationStart: z.string().optional().nullable(),
  locationEnd: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  school: z.lazy(() => SchoolCreateNestedOneWithoutLessonsInputSchema),
  instructor: z.lazy(() => InstructorProfileCreateNestedOneWithoutLessonsInputSchema),
});

export const LessonUncheckedCreateWithoutStudentInputSchema: z.ZodType<Prisma.LessonUncheckedCreateWithoutStudentInput> = z.strictObject({
  id: z.uuid().optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  status: z.lazy(() => LessonStatusSchema).optional(),
  locationStart: z.string().optional().nullable(),
  locationEnd: z.string().optional().nullable(),
  schoolId: z.string(),
  instructorId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const LessonCreateOrConnectWithoutStudentInputSchema: z.ZodType<Prisma.LessonCreateOrConnectWithoutStudentInput> = z.strictObject({
  where: z.lazy(() => LessonWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LessonCreateWithoutStudentInputSchema), z.lazy(() => LessonUncheckedCreateWithoutStudentInputSchema) ]),
});

export const LessonCreateManyStudentInputEnvelopeSchema: z.ZodType<Prisma.LessonCreateManyStudentInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => LessonCreateManyStudentInputSchema), z.lazy(() => LessonCreateManyStudentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const UserUpsertWithoutStudentProfileInputSchema: z.ZodType<Prisma.UserUpsertWithoutStudentProfileInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutStudentProfileInputSchema), z.lazy(() => UserUncheckedUpdateWithoutStudentProfileInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutStudentProfileInputSchema), z.lazy(() => UserUncheckedCreateWithoutStudentProfileInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutStudentProfileInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutStudentProfileInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutStudentProfileInputSchema), z.lazy(() => UserUncheckedUpdateWithoutStudentProfileInputSchema) ]),
});

export const UserUpdateWithoutStudentProfileInputSchema: z.ZodType<Prisma.UserUpdateWithoutStudentProfileInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  school: z.lazy(() => SchoolUpdateOneRequiredWithoutUsersNestedInputSchema).optional(),
  instructorProfile: z.lazy(() => InstructorProfileUpdateOneWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutStudentProfileInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutStudentProfileInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  schoolId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  instructorProfile: z.lazy(() => InstructorProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
});

export const InstructorProfileUpsertWithoutStudentsInputSchema: z.ZodType<Prisma.InstructorProfileUpsertWithoutStudentsInput> = z.strictObject({
  update: z.union([ z.lazy(() => InstructorProfileUpdateWithoutStudentsInputSchema), z.lazy(() => InstructorProfileUncheckedUpdateWithoutStudentsInputSchema) ]),
  create: z.union([ z.lazy(() => InstructorProfileCreateWithoutStudentsInputSchema), z.lazy(() => InstructorProfileUncheckedCreateWithoutStudentsInputSchema) ]),
  where: z.lazy(() => InstructorProfileWhereInputSchema).optional(),
});

export const InstructorProfileUpdateToOneWithWhereWithoutStudentsInputSchema: z.ZodType<Prisma.InstructorProfileUpdateToOneWithWhereWithoutStudentsInput> = z.strictObject({
  where: z.lazy(() => InstructorProfileWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => InstructorProfileUpdateWithoutStudentsInputSchema), z.lazy(() => InstructorProfileUncheckedUpdateWithoutStudentsInputSchema) ]),
});

export const InstructorProfileUpdateWithoutStudentsInputSchema: z.ZodType<Prisma.InstructorProfileUpdateWithoutStudentsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  licenseCategories: z.union([ z.lazy(() => InstructorProfileUpdatelicenseCategoriesInputSchema), z.string().array() ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutInstructorProfileNestedInputSchema).optional(),
  availability: z.lazy(() => AvailabilityUpdateManyWithoutInstructorNestedInputSchema).optional(),
  lessons: z.lazy(() => LessonUpdateManyWithoutInstructorNestedInputSchema).optional(),
});

export const InstructorProfileUncheckedUpdateWithoutStudentsInputSchema: z.ZodType<Prisma.InstructorProfileUncheckedUpdateWithoutStudentsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  licenseCategories: z.union([ z.lazy(() => InstructorProfileUpdatelicenseCategoriesInputSchema), z.string().array() ]).optional(),
  availability: z.lazy(() => AvailabilityUncheckedUpdateManyWithoutInstructorNestedInputSchema).optional(),
  lessons: z.lazy(() => LessonUncheckedUpdateManyWithoutInstructorNestedInputSchema).optional(),
});

export const LessonUpsertWithWhereUniqueWithoutStudentInputSchema: z.ZodType<Prisma.LessonUpsertWithWhereUniqueWithoutStudentInput> = z.strictObject({
  where: z.lazy(() => LessonWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LessonUpdateWithoutStudentInputSchema), z.lazy(() => LessonUncheckedUpdateWithoutStudentInputSchema) ]),
  create: z.union([ z.lazy(() => LessonCreateWithoutStudentInputSchema), z.lazy(() => LessonUncheckedCreateWithoutStudentInputSchema) ]),
});

export const LessonUpdateWithWhereUniqueWithoutStudentInputSchema: z.ZodType<Prisma.LessonUpdateWithWhereUniqueWithoutStudentInput> = z.strictObject({
  where: z.lazy(() => LessonWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LessonUpdateWithoutStudentInputSchema), z.lazy(() => LessonUncheckedUpdateWithoutStudentInputSchema) ]),
});

export const LessonUpdateManyWithWhereWithoutStudentInputSchema: z.ZodType<Prisma.LessonUpdateManyWithWhereWithoutStudentInput> = z.strictObject({
  where: z.lazy(() => LessonScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LessonUpdateManyMutationInputSchema), z.lazy(() => LessonUncheckedUpdateManyWithoutStudentInputSchema) ]),
});

export const SchoolCreateWithoutLessonsInputSchema: z.ZodType<Prisma.SchoolCreateWithoutLessonsInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  address: z.string().optional().nullable(),
  lessonDuration: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UserCreateNestedManyWithoutSchoolInputSchema).optional(),
});

export const SchoolUncheckedCreateWithoutLessonsInputSchema: z.ZodType<Prisma.SchoolUncheckedCreateWithoutLessonsInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  address: z.string().optional().nullable(),
  lessonDuration: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutSchoolInputSchema).optional(),
});

export const SchoolCreateOrConnectWithoutLessonsInputSchema: z.ZodType<Prisma.SchoolCreateOrConnectWithoutLessonsInput> = z.strictObject({
  where: z.lazy(() => SchoolWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SchoolCreateWithoutLessonsInputSchema), z.lazy(() => SchoolUncheckedCreateWithoutLessonsInputSchema) ]),
});

export const InstructorProfileCreateWithoutLessonsInputSchema: z.ZodType<Prisma.InstructorProfileCreateWithoutLessonsInput> = z.strictObject({
  id: z.uuid().optional(),
  licenseCategories: z.union([ z.lazy(() => InstructorProfileCreatelicenseCategoriesInputSchema), z.string().array() ]).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutInstructorProfileInputSchema),
  availability: z.lazy(() => AvailabilityCreateNestedManyWithoutInstructorInputSchema).optional(),
  students: z.lazy(() => StudentProfileCreateNestedManyWithoutInstructorInputSchema).optional(),
});

export const InstructorProfileUncheckedCreateWithoutLessonsInputSchema: z.ZodType<Prisma.InstructorProfileUncheckedCreateWithoutLessonsInput> = z.strictObject({
  id: z.uuid().optional(),
  userId: z.string(),
  licenseCategories: z.union([ z.lazy(() => InstructorProfileCreatelicenseCategoriesInputSchema), z.string().array() ]).optional(),
  availability: z.lazy(() => AvailabilityUncheckedCreateNestedManyWithoutInstructorInputSchema).optional(),
  students: z.lazy(() => StudentProfileUncheckedCreateNestedManyWithoutInstructorInputSchema).optional(),
});

export const InstructorProfileCreateOrConnectWithoutLessonsInputSchema: z.ZodType<Prisma.InstructorProfileCreateOrConnectWithoutLessonsInput> = z.strictObject({
  where: z.lazy(() => InstructorProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InstructorProfileCreateWithoutLessonsInputSchema), z.lazy(() => InstructorProfileUncheckedCreateWithoutLessonsInputSchema) ]),
});

export const StudentProfileCreateWithoutLessonsInputSchema: z.ZodType<Prisma.StudentProfileCreateWithoutLessonsInput> = z.strictObject({
  id: z.uuid().optional(),
  totalLessons: z.number().int().optional(),
  balance: z.number().int().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutStudentProfileInputSchema),
  instructor: z.lazy(() => InstructorProfileCreateNestedOneWithoutStudentsInputSchema),
});

export const StudentProfileUncheckedCreateWithoutLessonsInputSchema: z.ZodType<Prisma.StudentProfileUncheckedCreateWithoutLessonsInput> = z.strictObject({
  id: z.uuid().optional(),
  userId: z.string(),
  instructorId: z.string(),
  totalLessons: z.number().int().optional(),
  balance: z.number().int().optional(),
});

export const StudentProfileCreateOrConnectWithoutLessonsInputSchema: z.ZodType<Prisma.StudentProfileCreateOrConnectWithoutLessonsInput> = z.strictObject({
  where: z.lazy(() => StudentProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StudentProfileCreateWithoutLessonsInputSchema), z.lazy(() => StudentProfileUncheckedCreateWithoutLessonsInputSchema) ]),
});

export const SchoolUpsertWithoutLessonsInputSchema: z.ZodType<Prisma.SchoolUpsertWithoutLessonsInput> = z.strictObject({
  update: z.union([ z.lazy(() => SchoolUpdateWithoutLessonsInputSchema), z.lazy(() => SchoolUncheckedUpdateWithoutLessonsInputSchema) ]),
  create: z.union([ z.lazy(() => SchoolCreateWithoutLessonsInputSchema), z.lazy(() => SchoolUncheckedCreateWithoutLessonsInputSchema) ]),
  where: z.lazy(() => SchoolWhereInputSchema).optional(),
});

export const SchoolUpdateToOneWithWhereWithoutLessonsInputSchema: z.ZodType<Prisma.SchoolUpdateToOneWithWhereWithoutLessonsInput> = z.strictObject({
  where: z.lazy(() => SchoolWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => SchoolUpdateWithoutLessonsInputSchema), z.lazy(() => SchoolUncheckedUpdateWithoutLessonsInputSchema) ]),
});

export const SchoolUpdateWithoutLessonsInputSchema: z.ZodType<Prisma.SchoolUpdateWithoutLessonsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lessonDuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUpdateManyWithoutSchoolNestedInputSchema).optional(),
});

export const SchoolUncheckedUpdateWithoutLessonsInputSchema: z.ZodType<Prisma.SchoolUncheckedUpdateWithoutLessonsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lessonDuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutSchoolNestedInputSchema).optional(),
});

export const InstructorProfileUpsertWithoutLessonsInputSchema: z.ZodType<Prisma.InstructorProfileUpsertWithoutLessonsInput> = z.strictObject({
  update: z.union([ z.lazy(() => InstructorProfileUpdateWithoutLessonsInputSchema), z.lazy(() => InstructorProfileUncheckedUpdateWithoutLessonsInputSchema) ]),
  create: z.union([ z.lazy(() => InstructorProfileCreateWithoutLessonsInputSchema), z.lazy(() => InstructorProfileUncheckedCreateWithoutLessonsInputSchema) ]),
  where: z.lazy(() => InstructorProfileWhereInputSchema).optional(),
});

export const InstructorProfileUpdateToOneWithWhereWithoutLessonsInputSchema: z.ZodType<Prisma.InstructorProfileUpdateToOneWithWhereWithoutLessonsInput> = z.strictObject({
  where: z.lazy(() => InstructorProfileWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => InstructorProfileUpdateWithoutLessonsInputSchema), z.lazy(() => InstructorProfileUncheckedUpdateWithoutLessonsInputSchema) ]),
});

export const InstructorProfileUpdateWithoutLessonsInputSchema: z.ZodType<Prisma.InstructorProfileUpdateWithoutLessonsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  licenseCategories: z.union([ z.lazy(() => InstructorProfileUpdatelicenseCategoriesInputSchema), z.string().array() ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutInstructorProfileNestedInputSchema).optional(),
  availability: z.lazy(() => AvailabilityUpdateManyWithoutInstructorNestedInputSchema).optional(),
  students: z.lazy(() => StudentProfileUpdateManyWithoutInstructorNestedInputSchema).optional(),
});

export const InstructorProfileUncheckedUpdateWithoutLessonsInputSchema: z.ZodType<Prisma.InstructorProfileUncheckedUpdateWithoutLessonsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  licenseCategories: z.union([ z.lazy(() => InstructorProfileUpdatelicenseCategoriesInputSchema), z.string().array() ]).optional(),
  availability: z.lazy(() => AvailabilityUncheckedUpdateManyWithoutInstructorNestedInputSchema).optional(),
  students: z.lazy(() => StudentProfileUncheckedUpdateManyWithoutInstructorNestedInputSchema).optional(),
});

export const StudentProfileUpsertWithoutLessonsInputSchema: z.ZodType<Prisma.StudentProfileUpsertWithoutLessonsInput> = z.strictObject({
  update: z.union([ z.lazy(() => StudentProfileUpdateWithoutLessonsInputSchema), z.lazy(() => StudentProfileUncheckedUpdateWithoutLessonsInputSchema) ]),
  create: z.union([ z.lazy(() => StudentProfileCreateWithoutLessonsInputSchema), z.lazy(() => StudentProfileUncheckedCreateWithoutLessonsInputSchema) ]),
  where: z.lazy(() => StudentProfileWhereInputSchema).optional(),
});

export const StudentProfileUpdateToOneWithWhereWithoutLessonsInputSchema: z.ZodType<Prisma.StudentProfileUpdateToOneWithWhereWithoutLessonsInput> = z.strictObject({
  where: z.lazy(() => StudentProfileWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => StudentProfileUpdateWithoutLessonsInputSchema), z.lazy(() => StudentProfileUncheckedUpdateWithoutLessonsInputSchema) ]),
});

export const StudentProfileUpdateWithoutLessonsInputSchema: z.ZodType<Prisma.StudentProfileUpdateWithoutLessonsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalLessons: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutStudentProfileNestedInputSchema).optional(),
  instructor: z.lazy(() => InstructorProfileUpdateOneRequiredWithoutStudentsNestedInputSchema).optional(),
});

export const StudentProfileUncheckedUpdateWithoutLessonsInputSchema: z.ZodType<Prisma.StudentProfileUncheckedUpdateWithoutLessonsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  instructorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalLessons: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
});

export const InstructorProfileCreateWithoutAvailabilityInputSchema: z.ZodType<Prisma.InstructorProfileCreateWithoutAvailabilityInput> = z.strictObject({
  id: z.uuid().optional(),
  licenseCategories: z.union([ z.lazy(() => InstructorProfileCreatelicenseCategoriesInputSchema), z.string().array() ]).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutInstructorProfileInputSchema),
  lessons: z.lazy(() => LessonCreateNestedManyWithoutInstructorInputSchema).optional(),
  students: z.lazy(() => StudentProfileCreateNestedManyWithoutInstructorInputSchema).optional(),
});

export const InstructorProfileUncheckedCreateWithoutAvailabilityInputSchema: z.ZodType<Prisma.InstructorProfileUncheckedCreateWithoutAvailabilityInput> = z.strictObject({
  id: z.uuid().optional(),
  userId: z.string(),
  licenseCategories: z.union([ z.lazy(() => InstructorProfileCreatelicenseCategoriesInputSchema), z.string().array() ]).optional(),
  lessons: z.lazy(() => LessonUncheckedCreateNestedManyWithoutInstructorInputSchema).optional(),
  students: z.lazy(() => StudentProfileUncheckedCreateNestedManyWithoutInstructorInputSchema).optional(),
});

export const InstructorProfileCreateOrConnectWithoutAvailabilityInputSchema: z.ZodType<Prisma.InstructorProfileCreateOrConnectWithoutAvailabilityInput> = z.strictObject({
  where: z.lazy(() => InstructorProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InstructorProfileCreateWithoutAvailabilityInputSchema), z.lazy(() => InstructorProfileUncheckedCreateWithoutAvailabilityInputSchema) ]),
});

export const InstructorProfileUpsertWithoutAvailabilityInputSchema: z.ZodType<Prisma.InstructorProfileUpsertWithoutAvailabilityInput> = z.strictObject({
  update: z.union([ z.lazy(() => InstructorProfileUpdateWithoutAvailabilityInputSchema), z.lazy(() => InstructorProfileUncheckedUpdateWithoutAvailabilityInputSchema) ]),
  create: z.union([ z.lazy(() => InstructorProfileCreateWithoutAvailabilityInputSchema), z.lazy(() => InstructorProfileUncheckedCreateWithoutAvailabilityInputSchema) ]),
  where: z.lazy(() => InstructorProfileWhereInputSchema).optional(),
});

export const InstructorProfileUpdateToOneWithWhereWithoutAvailabilityInputSchema: z.ZodType<Prisma.InstructorProfileUpdateToOneWithWhereWithoutAvailabilityInput> = z.strictObject({
  where: z.lazy(() => InstructorProfileWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => InstructorProfileUpdateWithoutAvailabilityInputSchema), z.lazy(() => InstructorProfileUncheckedUpdateWithoutAvailabilityInputSchema) ]),
});

export const InstructorProfileUpdateWithoutAvailabilityInputSchema: z.ZodType<Prisma.InstructorProfileUpdateWithoutAvailabilityInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  licenseCategories: z.union([ z.lazy(() => InstructorProfileUpdatelicenseCategoriesInputSchema), z.string().array() ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutInstructorProfileNestedInputSchema).optional(),
  lessons: z.lazy(() => LessonUpdateManyWithoutInstructorNestedInputSchema).optional(),
  students: z.lazy(() => StudentProfileUpdateManyWithoutInstructorNestedInputSchema).optional(),
});

export const InstructorProfileUncheckedUpdateWithoutAvailabilityInputSchema: z.ZodType<Prisma.InstructorProfileUncheckedUpdateWithoutAvailabilityInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  licenseCategories: z.union([ z.lazy(() => InstructorProfileUpdatelicenseCategoriesInputSchema), z.string().array() ]).optional(),
  lessons: z.lazy(() => LessonUncheckedUpdateManyWithoutInstructorNestedInputSchema).optional(),
  students: z.lazy(() => StudentProfileUncheckedUpdateManyWithoutInstructorNestedInputSchema).optional(),
});

export const UserCreateManySchoolInputSchema: z.ZodType<Prisma.UserCreateManySchoolInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  passwordHash: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const LessonCreateManySchoolInputSchema: z.ZodType<Prisma.LessonCreateManySchoolInput> = z.strictObject({
  id: z.uuid().optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  status: z.lazy(() => LessonStatusSchema).optional(),
  locationStart: z.string().optional().nullable(),
  locationEnd: z.string().optional().nullable(),
  instructorId: z.string(),
  studentId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const UserUpdateWithoutSchoolInputSchema: z.ZodType<Prisma.UserUpdateWithoutSchoolInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  instructorProfile: z.lazy(() => InstructorProfileUpdateOneWithoutUserNestedInputSchema).optional(),
  studentProfile: z.lazy(() => StudentProfileUpdateOneWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutSchoolInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSchoolInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  instructorProfile: z.lazy(() => InstructorProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  studentProfile: z.lazy(() => StudentProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateManyWithoutSchoolInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutSchoolInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const LessonUpdateWithoutSchoolInputSchema: z.ZodType<Prisma.LessonUpdateWithoutSchoolInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => LessonStatusSchema), z.lazy(() => EnumLessonStatusFieldUpdateOperationsInputSchema) ]).optional(),
  locationStart: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationEnd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  instructor: z.lazy(() => InstructorProfileUpdateOneRequiredWithoutLessonsNestedInputSchema).optional(),
  student: z.lazy(() => StudentProfileUpdateOneRequiredWithoutLessonsNestedInputSchema).optional(),
});

export const LessonUncheckedUpdateWithoutSchoolInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateWithoutSchoolInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => LessonStatusSchema), z.lazy(() => EnumLessonStatusFieldUpdateOperationsInputSchema) ]).optional(),
  locationStart: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationEnd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instructorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const LessonUncheckedUpdateManyWithoutSchoolInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateManyWithoutSchoolInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => LessonStatusSchema), z.lazy(() => EnumLessonStatusFieldUpdateOperationsInputSchema) ]).optional(),
  locationStart: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationEnd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instructorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const AvailabilityCreateManyInstructorInputSchema: z.ZodType<Prisma.AvailabilityCreateManyInstructorInput> = z.strictObject({
  id: z.uuid().optional(),
  dayOfWeek: z.number().int(),
  startTime: z.string(),
  endTime: z.string(),
});

export const LessonCreateManyInstructorInputSchema: z.ZodType<Prisma.LessonCreateManyInstructorInput> = z.strictObject({
  id: z.uuid().optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  status: z.lazy(() => LessonStatusSchema).optional(),
  locationStart: z.string().optional().nullable(),
  locationEnd: z.string().optional().nullable(),
  schoolId: z.string(),
  studentId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const StudentProfileCreateManyInstructorInputSchema: z.ZodType<Prisma.StudentProfileCreateManyInstructorInput> = z.strictObject({
  id: z.uuid().optional(),
  userId: z.string(),
  totalLessons: z.number().int().optional(),
  balance: z.number().int().optional(),
});

export const AvailabilityUpdateWithoutInstructorInputSchema: z.ZodType<Prisma.AvailabilityUpdateWithoutInstructorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const AvailabilityUncheckedUpdateWithoutInstructorInputSchema: z.ZodType<Prisma.AvailabilityUncheckedUpdateWithoutInstructorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const AvailabilityUncheckedUpdateManyWithoutInstructorInputSchema: z.ZodType<Prisma.AvailabilityUncheckedUpdateManyWithoutInstructorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const LessonUpdateWithoutInstructorInputSchema: z.ZodType<Prisma.LessonUpdateWithoutInstructorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => LessonStatusSchema), z.lazy(() => EnumLessonStatusFieldUpdateOperationsInputSchema) ]).optional(),
  locationStart: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationEnd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  school: z.lazy(() => SchoolUpdateOneRequiredWithoutLessonsNestedInputSchema).optional(),
  student: z.lazy(() => StudentProfileUpdateOneRequiredWithoutLessonsNestedInputSchema).optional(),
});

export const LessonUncheckedUpdateWithoutInstructorInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateWithoutInstructorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => LessonStatusSchema), z.lazy(() => EnumLessonStatusFieldUpdateOperationsInputSchema) ]).optional(),
  locationStart: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationEnd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  schoolId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const LessonUncheckedUpdateManyWithoutInstructorInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateManyWithoutInstructorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => LessonStatusSchema), z.lazy(() => EnumLessonStatusFieldUpdateOperationsInputSchema) ]).optional(),
  locationStart: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationEnd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  schoolId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const StudentProfileUpdateWithoutInstructorInputSchema: z.ZodType<Prisma.StudentProfileUpdateWithoutInstructorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalLessons: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutStudentProfileNestedInputSchema).optional(),
  lessons: z.lazy(() => LessonUpdateManyWithoutStudentNestedInputSchema).optional(),
});

export const StudentProfileUncheckedUpdateWithoutInstructorInputSchema: z.ZodType<Prisma.StudentProfileUncheckedUpdateWithoutInstructorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalLessons: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  lessons: z.lazy(() => LessonUncheckedUpdateManyWithoutStudentNestedInputSchema).optional(),
});

export const StudentProfileUncheckedUpdateManyWithoutInstructorInputSchema: z.ZodType<Prisma.StudentProfileUncheckedUpdateManyWithoutInstructorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  totalLessons: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
});

export const LessonCreateManyStudentInputSchema: z.ZodType<Prisma.LessonCreateManyStudentInput> = z.strictObject({
  id: z.uuid().optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  status: z.lazy(() => LessonStatusSchema).optional(),
  locationStart: z.string().optional().nullable(),
  locationEnd: z.string().optional().nullable(),
  schoolId: z.string(),
  instructorId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const LessonUpdateWithoutStudentInputSchema: z.ZodType<Prisma.LessonUpdateWithoutStudentInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => LessonStatusSchema), z.lazy(() => EnumLessonStatusFieldUpdateOperationsInputSchema) ]).optional(),
  locationStart: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationEnd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  school: z.lazy(() => SchoolUpdateOneRequiredWithoutLessonsNestedInputSchema).optional(),
  instructor: z.lazy(() => InstructorProfileUpdateOneRequiredWithoutLessonsNestedInputSchema).optional(),
});

export const LessonUncheckedUpdateWithoutStudentInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateWithoutStudentInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => LessonStatusSchema), z.lazy(() => EnumLessonStatusFieldUpdateOperationsInputSchema) ]).optional(),
  locationStart: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationEnd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  schoolId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  instructorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const LessonUncheckedUpdateManyWithoutStudentInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateManyWithoutStudentInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => LessonStatusSchema), z.lazy(() => EnumLessonStatusFieldUpdateOperationsInputSchema) ]).optional(),
  locationStart: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locationEnd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  schoolId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  instructorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const SchoolFindFirstArgsSchema: z.ZodType<Prisma.SchoolFindFirstArgs> = z.object({
  select: SchoolSelectSchema.optional(),
  include: SchoolIncludeSchema.optional(),
  where: SchoolWhereInputSchema.optional(), 
  orderBy: z.union([ SchoolOrderByWithRelationInputSchema.array(), SchoolOrderByWithRelationInputSchema ]).optional(),
  cursor: SchoolWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SchoolScalarFieldEnumSchema, SchoolScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const SchoolFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SchoolFindFirstOrThrowArgs> = z.object({
  select: SchoolSelectSchema.optional(),
  include: SchoolIncludeSchema.optional(),
  where: SchoolWhereInputSchema.optional(), 
  orderBy: z.union([ SchoolOrderByWithRelationInputSchema.array(), SchoolOrderByWithRelationInputSchema ]).optional(),
  cursor: SchoolWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SchoolScalarFieldEnumSchema, SchoolScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const SchoolFindManyArgsSchema: z.ZodType<Prisma.SchoolFindManyArgs> = z.object({
  select: SchoolSelectSchema.optional(),
  include: SchoolIncludeSchema.optional(),
  where: SchoolWhereInputSchema.optional(), 
  orderBy: z.union([ SchoolOrderByWithRelationInputSchema.array(), SchoolOrderByWithRelationInputSchema ]).optional(),
  cursor: SchoolWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SchoolScalarFieldEnumSchema, SchoolScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const SchoolAggregateArgsSchema: z.ZodType<Prisma.SchoolAggregateArgs> = z.object({
  where: SchoolWhereInputSchema.optional(), 
  orderBy: z.union([ SchoolOrderByWithRelationInputSchema.array(), SchoolOrderByWithRelationInputSchema ]).optional(),
  cursor: SchoolWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SchoolGroupByArgsSchema: z.ZodType<Prisma.SchoolGroupByArgs> = z.object({
  where: SchoolWhereInputSchema.optional(), 
  orderBy: z.union([ SchoolOrderByWithAggregationInputSchema.array(), SchoolOrderByWithAggregationInputSchema ]).optional(),
  by: SchoolScalarFieldEnumSchema.array(), 
  having: SchoolScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SchoolFindUniqueArgsSchema: z.ZodType<Prisma.SchoolFindUniqueArgs> = z.object({
  select: SchoolSelectSchema.optional(),
  include: SchoolIncludeSchema.optional(),
  where: SchoolWhereUniqueInputSchema, 
}).strict();

export const SchoolFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SchoolFindUniqueOrThrowArgs> = z.object({
  select: SchoolSelectSchema.optional(),
  include: SchoolIncludeSchema.optional(),
  where: SchoolWhereUniqueInputSchema, 
}).strict();

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(), UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(), 
  having: UserScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const InstructorProfileFindFirstArgsSchema: z.ZodType<Prisma.InstructorProfileFindFirstArgs> = z.object({
  select: InstructorProfileSelectSchema.optional(),
  include: InstructorProfileIncludeSchema.optional(),
  where: InstructorProfileWhereInputSchema.optional(), 
  orderBy: z.union([ InstructorProfileOrderByWithRelationInputSchema.array(), InstructorProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: InstructorProfileWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InstructorProfileScalarFieldEnumSchema, InstructorProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const InstructorProfileFindFirstOrThrowArgsSchema: z.ZodType<Prisma.InstructorProfileFindFirstOrThrowArgs> = z.object({
  select: InstructorProfileSelectSchema.optional(),
  include: InstructorProfileIncludeSchema.optional(),
  where: InstructorProfileWhereInputSchema.optional(), 
  orderBy: z.union([ InstructorProfileOrderByWithRelationInputSchema.array(), InstructorProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: InstructorProfileWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InstructorProfileScalarFieldEnumSchema, InstructorProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const InstructorProfileFindManyArgsSchema: z.ZodType<Prisma.InstructorProfileFindManyArgs> = z.object({
  select: InstructorProfileSelectSchema.optional(),
  include: InstructorProfileIncludeSchema.optional(),
  where: InstructorProfileWhereInputSchema.optional(), 
  orderBy: z.union([ InstructorProfileOrderByWithRelationInputSchema.array(), InstructorProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: InstructorProfileWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InstructorProfileScalarFieldEnumSchema, InstructorProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const InstructorProfileAggregateArgsSchema: z.ZodType<Prisma.InstructorProfileAggregateArgs> = z.object({
  where: InstructorProfileWhereInputSchema.optional(), 
  orderBy: z.union([ InstructorProfileOrderByWithRelationInputSchema.array(), InstructorProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: InstructorProfileWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const InstructorProfileGroupByArgsSchema: z.ZodType<Prisma.InstructorProfileGroupByArgs> = z.object({
  where: InstructorProfileWhereInputSchema.optional(), 
  orderBy: z.union([ InstructorProfileOrderByWithAggregationInputSchema.array(), InstructorProfileOrderByWithAggregationInputSchema ]).optional(),
  by: InstructorProfileScalarFieldEnumSchema.array(), 
  having: InstructorProfileScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const InstructorProfileFindUniqueArgsSchema: z.ZodType<Prisma.InstructorProfileFindUniqueArgs> = z.object({
  select: InstructorProfileSelectSchema.optional(),
  include: InstructorProfileIncludeSchema.optional(),
  where: InstructorProfileWhereUniqueInputSchema, 
}).strict();

export const InstructorProfileFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.InstructorProfileFindUniqueOrThrowArgs> = z.object({
  select: InstructorProfileSelectSchema.optional(),
  include: InstructorProfileIncludeSchema.optional(),
  where: InstructorProfileWhereUniqueInputSchema, 
}).strict();

export const StudentProfileFindFirstArgsSchema: z.ZodType<Prisma.StudentProfileFindFirstArgs> = z.object({
  select: StudentProfileSelectSchema.optional(),
  include: StudentProfileIncludeSchema.optional(),
  where: StudentProfileWhereInputSchema.optional(), 
  orderBy: z.union([ StudentProfileOrderByWithRelationInputSchema.array(), StudentProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: StudentProfileWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StudentProfileScalarFieldEnumSchema, StudentProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const StudentProfileFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StudentProfileFindFirstOrThrowArgs> = z.object({
  select: StudentProfileSelectSchema.optional(),
  include: StudentProfileIncludeSchema.optional(),
  where: StudentProfileWhereInputSchema.optional(), 
  orderBy: z.union([ StudentProfileOrderByWithRelationInputSchema.array(), StudentProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: StudentProfileWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StudentProfileScalarFieldEnumSchema, StudentProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const StudentProfileFindManyArgsSchema: z.ZodType<Prisma.StudentProfileFindManyArgs> = z.object({
  select: StudentProfileSelectSchema.optional(),
  include: StudentProfileIncludeSchema.optional(),
  where: StudentProfileWhereInputSchema.optional(), 
  orderBy: z.union([ StudentProfileOrderByWithRelationInputSchema.array(), StudentProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: StudentProfileWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StudentProfileScalarFieldEnumSchema, StudentProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const StudentProfileAggregateArgsSchema: z.ZodType<Prisma.StudentProfileAggregateArgs> = z.object({
  where: StudentProfileWhereInputSchema.optional(), 
  orderBy: z.union([ StudentProfileOrderByWithRelationInputSchema.array(), StudentProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: StudentProfileWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const StudentProfileGroupByArgsSchema: z.ZodType<Prisma.StudentProfileGroupByArgs> = z.object({
  where: StudentProfileWhereInputSchema.optional(), 
  orderBy: z.union([ StudentProfileOrderByWithAggregationInputSchema.array(), StudentProfileOrderByWithAggregationInputSchema ]).optional(),
  by: StudentProfileScalarFieldEnumSchema.array(), 
  having: StudentProfileScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const StudentProfileFindUniqueArgsSchema: z.ZodType<Prisma.StudentProfileFindUniqueArgs> = z.object({
  select: StudentProfileSelectSchema.optional(),
  include: StudentProfileIncludeSchema.optional(),
  where: StudentProfileWhereUniqueInputSchema, 
}).strict();

export const StudentProfileFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StudentProfileFindUniqueOrThrowArgs> = z.object({
  select: StudentProfileSelectSchema.optional(),
  include: StudentProfileIncludeSchema.optional(),
  where: StudentProfileWhereUniqueInputSchema, 
}).strict();

export const LessonFindFirstArgsSchema: z.ZodType<Prisma.LessonFindFirstArgs> = z.object({
  select: LessonSelectSchema.optional(),
  include: LessonIncludeSchema.optional(),
  where: LessonWhereInputSchema.optional(), 
  orderBy: z.union([ LessonOrderByWithRelationInputSchema.array(), LessonOrderByWithRelationInputSchema ]).optional(),
  cursor: LessonWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LessonScalarFieldEnumSchema, LessonScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const LessonFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LessonFindFirstOrThrowArgs> = z.object({
  select: LessonSelectSchema.optional(),
  include: LessonIncludeSchema.optional(),
  where: LessonWhereInputSchema.optional(), 
  orderBy: z.union([ LessonOrderByWithRelationInputSchema.array(), LessonOrderByWithRelationInputSchema ]).optional(),
  cursor: LessonWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LessonScalarFieldEnumSchema, LessonScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const LessonFindManyArgsSchema: z.ZodType<Prisma.LessonFindManyArgs> = z.object({
  select: LessonSelectSchema.optional(),
  include: LessonIncludeSchema.optional(),
  where: LessonWhereInputSchema.optional(), 
  orderBy: z.union([ LessonOrderByWithRelationInputSchema.array(), LessonOrderByWithRelationInputSchema ]).optional(),
  cursor: LessonWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LessonScalarFieldEnumSchema, LessonScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const LessonAggregateArgsSchema: z.ZodType<Prisma.LessonAggregateArgs> = z.object({
  where: LessonWhereInputSchema.optional(), 
  orderBy: z.union([ LessonOrderByWithRelationInputSchema.array(), LessonOrderByWithRelationInputSchema ]).optional(),
  cursor: LessonWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const LessonGroupByArgsSchema: z.ZodType<Prisma.LessonGroupByArgs> = z.object({
  where: LessonWhereInputSchema.optional(), 
  orderBy: z.union([ LessonOrderByWithAggregationInputSchema.array(), LessonOrderByWithAggregationInputSchema ]).optional(),
  by: LessonScalarFieldEnumSchema.array(), 
  having: LessonScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const LessonFindUniqueArgsSchema: z.ZodType<Prisma.LessonFindUniqueArgs> = z.object({
  select: LessonSelectSchema.optional(),
  include: LessonIncludeSchema.optional(),
  where: LessonWhereUniqueInputSchema, 
}).strict();

export const LessonFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LessonFindUniqueOrThrowArgs> = z.object({
  select: LessonSelectSchema.optional(),
  include: LessonIncludeSchema.optional(),
  where: LessonWhereUniqueInputSchema, 
}).strict();

export const AvailabilityFindFirstArgsSchema: z.ZodType<Prisma.AvailabilityFindFirstArgs> = z.object({
  select: AvailabilitySelectSchema.optional(),
  include: AvailabilityIncludeSchema.optional(),
  where: AvailabilityWhereInputSchema.optional(), 
  orderBy: z.union([ AvailabilityOrderByWithRelationInputSchema.array(), AvailabilityOrderByWithRelationInputSchema ]).optional(),
  cursor: AvailabilityWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AvailabilityScalarFieldEnumSchema, AvailabilityScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const AvailabilityFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AvailabilityFindFirstOrThrowArgs> = z.object({
  select: AvailabilitySelectSchema.optional(),
  include: AvailabilityIncludeSchema.optional(),
  where: AvailabilityWhereInputSchema.optional(), 
  orderBy: z.union([ AvailabilityOrderByWithRelationInputSchema.array(), AvailabilityOrderByWithRelationInputSchema ]).optional(),
  cursor: AvailabilityWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AvailabilityScalarFieldEnumSchema, AvailabilityScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const AvailabilityFindManyArgsSchema: z.ZodType<Prisma.AvailabilityFindManyArgs> = z.object({
  select: AvailabilitySelectSchema.optional(),
  include: AvailabilityIncludeSchema.optional(),
  where: AvailabilityWhereInputSchema.optional(), 
  orderBy: z.union([ AvailabilityOrderByWithRelationInputSchema.array(), AvailabilityOrderByWithRelationInputSchema ]).optional(),
  cursor: AvailabilityWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AvailabilityScalarFieldEnumSchema, AvailabilityScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const AvailabilityAggregateArgsSchema: z.ZodType<Prisma.AvailabilityAggregateArgs> = z.object({
  where: AvailabilityWhereInputSchema.optional(), 
  orderBy: z.union([ AvailabilityOrderByWithRelationInputSchema.array(), AvailabilityOrderByWithRelationInputSchema ]).optional(),
  cursor: AvailabilityWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const AvailabilityGroupByArgsSchema: z.ZodType<Prisma.AvailabilityGroupByArgs> = z.object({
  where: AvailabilityWhereInputSchema.optional(), 
  orderBy: z.union([ AvailabilityOrderByWithAggregationInputSchema.array(), AvailabilityOrderByWithAggregationInputSchema ]).optional(),
  by: AvailabilityScalarFieldEnumSchema.array(), 
  having: AvailabilityScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const AvailabilityFindUniqueArgsSchema: z.ZodType<Prisma.AvailabilityFindUniqueArgs> = z.object({
  select: AvailabilitySelectSchema.optional(),
  include: AvailabilityIncludeSchema.optional(),
  where: AvailabilityWhereUniqueInputSchema, 
}).strict();

export const AvailabilityFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AvailabilityFindUniqueOrThrowArgs> = z.object({
  select: AvailabilitySelectSchema.optional(),
  include: AvailabilityIncludeSchema.optional(),
  where: AvailabilityWhereUniqueInputSchema, 
}).strict();

export const SchoolCreateArgsSchema: z.ZodType<Prisma.SchoolCreateArgs> = z.object({
  select: SchoolSelectSchema.optional(),
  include: SchoolIncludeSchema.optional(),
  data: z.union([ SchoolCreateInputSchema, SchoolUncheckedCreateInputSchema ]),
}).strict();

export const SchoolUpsertArgsSchema: z.ZodType<Prisma.SchoolUpsertArgs> = z.object({
  select: SchoolSelectSchema.optional(),
  include: SchoolIncludeSchema.optional(),
  where: SchoolWhereUniqueInputSchema, 
  create: z.union([ SchoolCreateInputSchema, SchoolUncheckedCreateInputSchema ]),
  update: z.union([ SchoolUpdateInputSchema, SchoolUncheckedUpdateInputSchema ]),
}).strict();

export const SchoolCreateManyArgsSchema: z.ZodType<Prisma.SchoolCreateManyArgs> = z.object({
  data: z.union([ SchoolCreateManyInputSchema, SchoolCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const SchoolCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SchoolCreateManyAndReturnArgs> = z.object({
  data: z.union([ SchoolCreateManyInputSchema, SchoolCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const SchoolDeleteArgsSchema: z.ZodType<Prisma.SchoolDeleteArgs> = z.object({
  select: SchoolSelectSchema.optional(),
  include: SchoolIncludeSchema.optional(),
  where: SchoolWhereUniqueInputSchema, 
}).strict();

export const SchoolUpdateArgsSchema: z.ZodType<Prisma.SchoolUpdateArgs> = z.object({
  select: SchoolSelectSchema.optional(),
  include: SchoolIncludeSchema.optional(),
  data: z.union([ SchoolUpdateInputSchema, SchoolUncheckedUpdateInputSchema ]),
  where: SchoolWhereUniqueInputSchema, 
}).strict();

export const SchoolUpdateManyArgsSchema: z.ZodType<Prisma.SchoolUpdateManyArgs> = z.object({
  data: z.union([ SchoolUpdateManyMutationInputSchema, SchoolUncheckedUpdateManyInputSchema ]),
  where: SchoolWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const SchoolUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SchoolUpdateManyAndReturnArgs> = z.object({
  data: z.union([ SchoolUpdateManyMutationInputSchema, SchoolUncheckedUpdateManyInputSchema ]),
  where: SchoolWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const SchoolDeleteManyArgsSchema: z.ZodType<Prisma.SchoolDeleteManyArgs> = z.object({
  where: SchoolWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema, UserUncheckedCreateInputSchema ]),
}).strict();

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
  create: z.union([ UserCreateInputSchema, UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema, UserUncheckedUpdateInputSchema ]),
}).strict();

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema, UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema, UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema, UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const InstructorProfileCreateArgsSchema: z.ZodType<Prisma.InstructorProfileCreateArgs> = z.object({
  select: InstructorProfileSelectSchema.optional(),
  include: InstructorProfileIncludeSchema.optional(),
  data: z.union([ InstructorProfileCreateInputSchema, InstructorProfileUncheckedCreateInputSchema ]),
}).strict();

export const InstructorProfileUpsertArgsSchema: z.ZodType<Prisma.InstructorProfileUpsertArgs> = z.object({
  select: InstructorProfileSelectSchema.optional(),
  include: InstructorProfileIncludeSchema.optional(),
  where: InstructorProfileWhereUniqueInputSchema, 
  create: z.union([ InstructorProfileCreateInputSchema, InstructorProfileUncheckedCreateInputSchema ]),
  update: z.union([ InstructorProfileUpdateInputSchema, InstructorProfileUncheckedUpdateInputSchema ]),
}).strict();

export const InstructorProfileCreateManyArgsSchema: z.ZodType<Prisma.InstructorProfileCreateManyArgs> = z.object({
  data: z.union([ InstructorProfileCreateManyInputSchema, InstructorProfileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const InstructorProfileCreateManyAndReturnArgsSchema: z.ZodType<Prisma.InstructorProfileCreateManyAndReturnArgs> = z.object({
  data: z.union([ InstructorProfileCreateManyInputSchema, InstructorProfileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const InstructorProfileDeleteArgsSchema: z.ZodType<Prisma.InstructorProfileDeleteArgs> = z.object({
  select: InstructorProfileSelectSchema.optional(),
  include: InstructorProfileIncludeSchema.optional(),
  where: InstructorProfileWhereUniqueInputSchema, 
}).strict();

export const InstructorProfileUpdateArgsSchema: z.ZodType<Prisma.InstructorProfileUpdateArgs> = z.object({
  select: InstructorProfileSelectSchema.optional(),
  include: InstructorProfileIncludeSchema.optional(),
  data: z.union([ InstructorProfileUpdateInputSchema, InstructorProfileUncheckedUpdateInputSchema ]),
  where: InstructorProfileWhereUniqueInputSchema, 
}).strict();

export const InstructorProfileUpdateManyArgsSchema: z.ZodType<Prisma.InstructorProfileUpdateManyArgs> = z.object({
  data: z.union([ InstructorProfileUpdateManyMutationInputSchema, InstructorProfileUncheckedUpdateManyInputSchema ]),
  where: InstructorProfileWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const InstructorProfileUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.InstructorProfileUpdateManyAndReturnArgs> = z.object({
  data: z.union([ InstructorProfileUpdateManyMutationInputSchema, InstructorProfileUncheckedUpdateManyInputSchema ]),
  where: InstructorProfileWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const InstructorProfileDeleteManyArgsSchema: z.ZodType<Prisma.InstructorProfileDeleteManyArgs> = z.object({
  where: InstructorProfileWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const StudentProfileCreateArgsSchema: z.ZodType<Prisma.StudentProfileCreateArgs> = z.object({
  select: StudentProfileSelectSchema.optional(),
  include: StudentProfileIncludeSchema.optional(),
  data: z.union([ StudentProfileCreateInputSchema, StudentProfileUncheckedCreateInputSchema ]),
}).strict();

export const StudentProfileUpsertArgsSchema: z.ZodType<Prisma.StudentProfileUpsertArgs> = z.object({
  select: StudentProfileSelectSchema.optional(),
  include: StudentProfileIncludeSchema.optional(),
  where: StudentProfileWhereUniqueInputSchema, 
  create: z.union([ StudentProfileCreateInputSchema, StudentProfileUncheckedCreateInputSchema ]),
  update: z.union([ StudentProfileUpdateInputSchema, StudentProfileUncheckedUpdateInputSchema ]),
}).strict();

export const StudentProfileCreateManyArgsSchema: z.ZodType<Prisma.StudentProfileCreateManyArgs> = z.object({
  data: z.union([ StudentProfileCreateManyInputSchema, StudentProfileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const StudentProfileCreateManyAndReturnArgsSchema: z.ZodType<Prisma.StudentProfileCreateManyAndReturnArgs> = z.object({
  data: z.union([ StudentProfileCreateManyInputSchema, StudentProfileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const StudentProfileDeleteArgsSchema: z.ZodType<Prisma.StudentProfileDeleteArgs> = z.object({
  select: StudentProfileSelectSchema.optional(),
  include: StudentProfileIncludeSchema.optional(),
  where: StudentProfileWhereUniqueInputSchema, 
}).strict();

export const StudentProfileUpdateArgsSchema: z.ZodType<Prisma.StudentProfileUpdateArgs> = z.object({
  select: StudentProfileSelectSchema.optional(),
  include: StudentProfileIncludeSchema.optional(),
  data: z.union([ StudentProfileUpdateInputSchema, StudentProfileUncheckedUpdateInputSchema ]),
  where: StudentProfileWhereUniqueInputSchema, 
}).strict();

export const StudentProfileUpdateManyArgsSchema: z.ZodType<Prisma.StudentProfileUpdateManyArgs> = z.object({
  data: z.union([ StudentProfileUpdateManyMutationInputSchema, StudentProfileUncheckedUpdateManyInputSchema ]),
  where: StudentProfileWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const StudentProfileUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.StudentProfileUpdateManyAndReturnArgs> = z.object({
  data: z.union([ StudentProfileUpdateManyMutationInputSchema, StudentProfileUncheckedUpdateManyInputSchema ]),
  where: StudentProfileWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const StudentProfileDeleteManyArgsSchema: z.ZodType<Prisma.StudentProfileDeleteManyArgs> = z.object({
  where: StudentProfileWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const LessonCreateArgsSchema: z.ZodType<Prisma.LessonCreateArgs> = z.object({
  select: LessonSelectSchema.optional(),
  include: LessonIncludeSchema.optional(),
  data: z.union([ LessonCreateInputSchema, LessonUncheckedCreateInputSchema ]),
}).strict();

export const LessonUpsertArgsSchema: z.ZodType<Prisma.LessonUpsertArgs> = z.object({
  select: LessonSelectSchema.optional(),
  include: LessonIncludeSchema.optional(),
  where: LessonWhereUniqueInputSchema, 
  create: z.union([ LessonCreateInputSchema, LessonUncheckedCreateInputSchema ]),
  update: z.union([ LessonUpdateInputSchema, LessonUncheckedUpdateInputSchema ]),
}).strict();

export const LessonCreateManyArgsSchema: z.ZodType<Prisma.LessonCreateManyArgs> = z.object({
  data: z.union([ LessonCreateManyInputSchema, LessonCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const LessonCreateManyAndReturnArgsSchema: z.ZodType<Prisma.LessonCreateManyAndReturnArgs> = z.object({
  data: z.union([ LessonCreateManyInputSchema, LessonCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const LessonDeleteArgsSchema: z.ZodType<Prisma.LessonDeleteArgs> = z.object({
  select: LessonSelectSchema.optional(),
  include: LessonIncludeSchema.optional(),
  where: LessonWhereUniqueInputSchema, 
}).strict();

export const LessonUpdateArgsSchema: z.ZodType<Prisma.LessonUpdateArgs> = z.object({
  select: LessonSelectSchema.optional(),
  include: LessonIncludeSchema.optional(),
  data: z.union([ LessonUpdateInputSchema, LessonUncheckedUpdateInputSchema ]),
  where: LessonWhereUniqueInputSchema, 
}).strict();

export const LessonUpdateManyArgsSchema: z.ZodType<Prisma.LessonUpdateManyArgs> = z.object({
  data: z.union([ LessonUpdateManyMutationInputSchema, LessonUncheckedUpdateManyInputSchema ]),
  where: LessonWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const LessonUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.LessonUpdateManyAndReturnArgs> = z.object({
  data: z.union([ LessonUpdateManyMutationInputSchema, LessonUncheckedUpdateManyInputSchema ]),
  where: LessonWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const LessonDeleteManyArgsSchema: z.ZodType<Prisma.LessonDeleteManyArgs> = z.object({
  where: LessonWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const AvailabilityCreateArgsSchema: z.ZodType<Prisma.AvailabilityCreateArgs> = z.object({
  select: AvailabilitySelectSchema.optional(),
  include: AvailabilityIncludeSchema.optional(),
  data: z.union([ AvailabilityCreateInputSchema, AvailabilityUncheckedCreateInputSchema ]),
}).strict();

export const AvailabilityUpsertArgsSchema: z.ZodType<Prisma.AvailabilityUpsertArgs> = z.object({
  select: AvailabilitySelectSchema.optional(),
  include: AvailabilityIncludeSchema.optional(),
  where: AvailabilityWhereUniqueInputSchema, 
  create: z.union([ AvailabilityCreateInputSchema, AvailabilityUncheckedCreateInputSchema ]),
  update: z.union([ AvailabilityUpdateInputSchema, AvailabilityUncheckedUpdateInputSchema ]),
}).strict();

export const AvailabilityCreateManyArgsSchema: z.ZodType<Prisma.AvailabilityCreateManyArgs> = z.object({
  data: z.union([ AvailabilityCreateManyInputSchema, AvailabilityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const AvailabilityCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AvailabilityCreateManyAndReturnArgs> = z.object({
  data: z.union([ AvailabilityCreateManyInputSchema, AvailabilityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const AvailabilityDeleteArgsSchema: z.ZodType<Prisma.AvailabilityDeleteArgs> = z.object({
  select: AvailabilitySelectSchema.optional(),
  include: AvailabilityIncludeSchema.optional(),
  where: AvailabilityWhereUniqueInputSchema, 
}).strict();

export const AvailabilityUpdateArgsSchema: z.ZodType<Prisma.AvailabilityUpdateArgs> = z.object({
  select: AvailabilitySelectSchema.optional(),
  include: AvailabilityIncludeSchema.optional(),
  data: z.union([ AvailabilityUpdateInputSchema, AvailabilityUncheckedUpdateInputSchema ]),
  where: AvailabilityWhereUniqueInputSchema, 
}).strict();

export const AvailabilityUpdateManyArgsSchema: z.ZodType<Prisma.AvailabilityUpdateManyArgs> = z.object({
  data: z.union([ AvailabilityUpdateManyMutationInputSchema, AvailabilityUncheckedUpdateManyInputSchema ]),
  where: AvailabilityWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const AvailabilityUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AvailabilityUpdateManyAndReturnArgs> = z.object({
  data: z.union([ AvailabilityUpdateManyMutationInputSchema, AvailabilityUncheckedUpdateManyInputSchema ]),
  where: AvailabilityWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const AvailabilityDeleteManyArgsSchema: z.ZodType<Prisma.AvailabilityDeleteManyArgs> = z.object({
  where: AvailabilityWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();