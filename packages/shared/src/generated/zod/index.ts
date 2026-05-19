import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','phoneNumber','passwordHash','firstName','lastName','role','createdAt','deletedAt','instructorId']);

export const InstructorAvailabilityScalarFieldEnumSchema = z.enum(['id','instructorId','dayOfWeek','hours']);

export const LessonScalarFieldEnumSchema = z.enum(['id','instructorId','studentId','startTime','durationMin','status','createdAt']);

export const MagicTokenScalarFieldEnumSchema = z.enum(['id','token','userId','expiresAt','createdAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const RoleSchema = z.enum(['INSTRUCTOR','STUDENT']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

export const LessonStatusSchema = z.enum(['SCHEDULED','COMPLETED','CANCELLED']);

export type LessonStatusType = `${z.infer<typeof LessonStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: RoleSchema,
  id: z.uuid(),
  phoneNumber: z.string().nullable(),
  passwordHash: z.string().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  createdAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
  instructorId: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// INSTRUCTOR AVAILABILITY SCHEMA
/////////////////////////////////////////

export const InstructorAvailabilitySchema = z.object({
  id: z.uuid(),
  instructorId: z.string(),
  dayOfWeek: z.number().int(),
  hours: z.number().int().array(),
})

export type InstructorAvailability = z.infer<typeof InstructorAvailabilitySchema>

/////////////////////////////////////////
// LESSON SCHEMA
/////////////////////////////////////////

export const LessonSchema = z.object({
  status: LessonStatusSchema,
  id: z.uuid(),
  instructorId: z.string(),
  studentId: z.string(),
  startTime: z.coerce.date(),
  durationMin: z.number().int(),
  createdAt: z.coerce.date(),
})

export type Lesson = z.infer<typeof LessonSchema>

/////////////////////////////////////////
// MAGIC TOKEN SCHEMA
/////////////////////////////////////////

export const MagicTokenSchema = z.object({
  id: z.uuid(),
  token: z.uuid(),
  userId: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date(),
})

export type MagicToken = z.infer<typeof MagicTokenSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  instructor: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  students: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  lessonsAsInstructor: z.union([z.boolean(),z.lazy(() => LessonFindManyArgsSchema)]).optional(),
  lessonsAsStudent: z.union([z.boolean(),z.lazy(() => LessonFindManyArgsSchema)]).optional(),
  availabilities: z.union([z.boolean(),z.lazy(() => InstructorAvailabilityFindManyArgsSchema)]).optional(),
  magicTokens: z.union([z.boolean(),z.lazy(() => MagicTokenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  students: z.boolean().optional(),
  lessonsAsInstructor: z.boolean().optional(),
  lessonsAsStudent: z.boolean().optional(),
  availabilities: z.boolean().optional(),
  magicTokens: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  phoneNumber: z.boolean().optional(),
  passwordHash: z.boolean().optional(),
  firstName: z.boolean().optional(),
  lastName: z.boolean().optional(),
  role: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  deletedAt: z.boolean().optional(),
  instructorId: z.boolean().optional(),
  instructor: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  students: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  lessonsAsInstructor: z.union([z.boolean(),z.lazy(() => LessonFindManyArgsSchema)]).optional(),
  lessonsAsStudent: z.union([z.boolean(),z.lazy(() => LessonFindManyArgsSchema)]).optional(),
  availabilities: z.union([z.boolean(),z.lazy(() => InstructorAvailabilityFindManyArgsSchema)]).optional(),
  magicTokens: z.union([z.boolean(),z.lazy(() => MagicTokenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// INSTRUCTOR AVAILABILITY
//------------------------------------------------------

export const InstructorAvailabilityIncludeSchema: z.ZodType<Prisma.InstructorAvailabilityInclude> = z.object({
  instructor: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const InstructorAvailabilityArgsSchema: z.ZodType<Prisma.InstructorAvailabilityDefaultArgs> = z.object({
  select: z.lazy(() => InstructorAvailabilitySelectSchema).optional(),
  include: z.lazy(() => InstructorAvailabilityIncludeSchema).optional(),
}).strict();

export const InstructorAvailabilitySelectSchema: z.ZodType<Prisma.InstructorAvailabilitySelect> = z.object({
  id: z.boolean().optional(),
  instructorId: z.boolean().optional(),
  dayOfWeek: z.boolean().optional(),
  hours: z.boolean().optional(),
  instructor: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// LESSON
//------------------------------------------------------

export const LessonIncludeSchema: z.ZodType<Prisma.LessonInclude> = z.object({
  instructor: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  student: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const LessonArgsSchema: z.ZodType<Prisma.LessonDefaultArgs> = z.object({
  select: z.lazy(() => LessonSelectSchema).optional(),
  include: z.lazy(() => LessonIncludeSchema).optional(),
}).strict();

export const LessonSelectSchema: z.ZodType<Prisma.LessonSelect> = z.object({
  id: z.boolean().optional(),
  instructorId: z.boolean().optional(),
  studentId: z.boolean().optional(),
  startTime: z.boolean().optional(),
  durationMin: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  instructor: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  student: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// MAGIC TOKEN
//------------------------------------------------------

export const MagicTokenIncludeSchema: z.ZodType<Prisma.MagicTokenInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const MagicTokenArgsSchema: z.ZodType<Prisma.MagicTokenDefaultArgs> = z.object({
  select: z.lazy(() => MagicTokenSelectSchema).optional(),
  include: z.lazy(() => MagicTokenIncludeSchema).optional(),
}).strict();

export const MagicTokenSelectSchema: z.ZodType<Prisma.MagicTokenSelect> = z.object({
  id: z.boolean().optional(),
  token: z.boolean().optional(),
  userId: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  passwordHash: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  firstName: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  instructorId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  instructor: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  students: z.lazy(() => UserListRelationFilterSchema).optional(),
  lessonsAsInstructor: z.lazy(() => LessonListRelationFilterSchema).optional(),
  lessonsAsStudent: z.lazy(() => LessonListRelationFilterSchema).optional(),
  availabilities: z.lazy(() => InstructorAvailabilityListRelationFilterSchema).optional(),
  magicTokens: z.lazy(() => MagicTokenListRelationFilterSchema).optional(),
});

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  passwordHash: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  instructorId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  instructor: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  students: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional(),
  lessonsAsInstructor: z.lazy(() => LessonOrderByRelationAggregateInputSchema).optional(),
  lessonsAsStudent: z.lazy(() => LessonOrderByRelationAggregateInputSchema).optional(),
  availabilities: z.lazy(() => InstructorAvailabilityOrderByRelationAggregateInputSchema).optional(),
  magicTokens: z.lazy(() => MagicTokenOrderByRelationAggregateInputSchema).optional(),
});

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    phoneNumber: z.string(),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    phoneNumber: z.string(),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  phoneNumber: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  passwordHash: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  firstName: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  instructorId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  instructor: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  students: z.lazy(() => UserListRelationFilterSchema).optional(),
  lessonsAsInstructor: z.lazy(() => LessonListRelationFilterSchema).optional(),
  lessonsAsStudent: z.lazy(() => LessonListRelationFilterSchema).optional(),
  availabilities: z.lazy(() => InstructorAvailabilityListRelationFilterSchema).optional(),
  magicTokens: z.lazy(() => MagicTokenListRelationFilterSchema).optional(),
}));

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  passwordHash: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  instructorId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
});

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  passwordHash: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  firstName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleWithAggregatesFilterSchema), z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
  instructorId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
});

export const InstructorAvailabilityWhereInputSchema: z.ZodType<Prisma.InstructorAvailabilityWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => InstructorAvailabilityWhereInputSchema), z.lazy(() => InstructorAvailabilityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InstructorAvailabilityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InstructorAvailabilityWhereInputSchema), z.lazy(() => InstructorAvailabilityWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  instructorId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  dayOfWeek: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  hours: z.lazy(() => IntNullableListFilterSchema).optional(),
  instructor: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
});

export const InstructorAvailabilityOrderByWithRelationInputSchema: z.ZodType<Prisma.InstructorAvailabilityOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  instructorId: z.lazy(() => SortOrderSchema).optional(),
  dayOfWeek: z.lazy(() => SortOrderSchema).optional(),
  hours: z.lazy(() => SortOrderSchema).optional(),
  instructor: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
});

export const InstructorAvailabilityWhereUniqueInputSchema: z.ZodType<Prisma.InstructorAvailabilityWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    instructorId_dayOfWeek: z.lazy(() => InstructorAvailabilityInstructorIdDayOfWeekCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    instructorId_dayOfWeek: z.lazy(() => InstructorAvailabilityInstructorIdDayOfWeekCompoundUniqueInputSchema),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  instructorId_dayOfWeek: z.lazy(() => InstructorAvailabilityInstructorIdDayOfWeekCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => InstructorAvailabilityWhereInputSchema), z.lazy(() => InstructorAvailabilityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InstructorAvailabilityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InstructorAvailabilityWhereInputSchema), z.lazy(() => InstructorAvailabilityWhereInputSchema).array() ]).optional(),
  instructorId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  dayOfWeek: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  hours: z.lazy(() => IntNullableListFilterSchema).optional(),
  instructor: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
}));

export const InstructorAvailabilityOrderByWithAggregationInputSchema: z.ZodType<Prisma.InstructorAvailabilityOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  instructorId: z.lazy(() => SortOrderSchema).optional(),
  dayOfWeek: z.lazy(() => SortOrderSchema).optional(),
  hours: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => InstructorAvailabilityCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => InstructorAvailabilityAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => InstructorAvailabilityMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => InstructorAvailabilityMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => InstructorAvailabilitySumOrderByAggregateInputSchema).optional(),
});

export const InstructorAvailabilityScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.InstructorAvailabilityScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => InstructorAvailabilityScalarWhereWithAggregatesInputSchema), z.lazy(() => InstructorAvailabilityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => InstructorAvailabilityScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InstructorAvailabilityScalarWhereWithAggregatesInputSchema), z.lazy(() => InstructorAvailabilityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  instructorId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  dayOfWeek: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  hours: z.lazy(() => IntNullableListFilterSchema).optional(),
});

export const LessonWhereInputSchema: z.ZodType<Prisma.LessonWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => LessonWhereInputSchema), z.lazy(() => LessonWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LessonWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LessonWhereInputSchema), z.lazy(() => LessonWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  instructorId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  studentId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  startTime: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  durationMin: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  status: z.union([ z.lazy(() => EnumLessonStatusFilterSchema), z.lazy(() => LessonStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  instructor: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  student: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
});

export const LessonOrderByWithRelationInputSchema: z.ZodType<Prisma.LessonOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  instructorId: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  durationMin: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  instructor: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  student: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
});

export const LessonWhereUniqueInputSchema: z.ZodType<Prisma.LessonWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    instructorId_startTime: z.lazy(() => LessonInstructorIdStartTimeCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    instructorId_startTime: z.lazy(() => LessonInstructorIdStartTimeCompoundUniqueInputSchema),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  instructorId_startTime: z.lazy(() => LessonInstructorIdStartTimeCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => LessonWhereInputSchema), z.lazy(() => LessonWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LessonWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LessonWhereInputSchema), z.lazy(() => LessonWhereInputSchema).array() ]).optional(),
  instructorId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  studentId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  startTime: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  durationMin: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  status: z.union([ z.lazy(() => EnumLessonStatusFilterSchema), z.lazy(() => LessonStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  instructor: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  student: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
}));

export const LessonOrderByWithAggregationInputSchema: z.ZodType<Prisma.LessonOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  instructorId: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  durationMin: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LessonCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => LessonAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LessonMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LessonMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => LessonSumOrderByAggregateInputSchema).optional(),
});

export const LessonScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LessonScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => LessonScalarWhereWithAggregatesInputSchema), z.lazy(() => LessonScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LessonScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LessonScalarWhereWithAggregatesInputSchema), z.lazy(() => LessonScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  instructorId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  studentId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  startTime: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  durationMin: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  status: z.union([ z.lazy(() => EnumLessonStatusWithAggregatesFilterSchema), z.lazy(() => LessonStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const MagicTokenWhereInputSchema: z.ZodType<Prisma.MagicTokenWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => MagicTokenWhereInputSchema), z.lazy(() => MagicTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MagicTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MagicTokenWhereInputSchema), z.lazy(() => MagicTokenWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
});

export const MagicTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.MagicTokenOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
});

export const MagicTokenWhereUniqueInputSchema: z.ZodType<Prisma.MagicTokenWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    token: z.uuid(),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    token: z.uuid(),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  token: z.uuid().optional(),
  AND: z.union([ z.lazy(() => MagicTokenWhereInputSchema), z.lazy(() => MagicTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MagicTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MagicTokenWhereInputSchema), z.lazy(() => MagicTokenWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
}));

export const MagicTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.MagicTokenOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MagicTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MagicTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MagicTokenMinOrderByAggregateInputSchema).optional(),
});

export const MagicTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MagicTokenScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => MagicTokenScalarWhereWithAggregatesInputSchema), z.lazy(() => MagicTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MagicTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MagicTokenScalarWhereWithAggregatesInputSchema), z.lazy(() => MagicTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  phoneNumber: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  instructor: z.lazy(() => UserCreateNestedOneWithoutStudentsInputSchema).optional(),
  students: z.lazy(() => UserCreateNestedManyWithoutInstructorInputSchema).optional(),
  lessonsAsInstructor: z.lazy(() => LessonCreateNestedManyWithoutInstructorInputSchema).optional(),
  lessonsAsStudent: z.lazy(() => LessonCreateNestedManyWithoutStudentInputSchema).optional(),
  availabilities: z.lazy(() => InstructorAvailabilityCreateNestedManyWithoutInstructorInputSchema).optional(),
  magicTokens: z.lazy(() => MagicTokenCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  phoneNumber: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  instructorId: z.string().optional().nullable(),
  students: z.lazy(() => UserUncheckedCreateNestedManyWithoutInstructorInputSchema).optional(),
  lessonsAsInstructor: z.lazy(() => LessonUncheckedCreateNestedManyWithoutInstructorInputSchema).optional(),
  lessonsAsStudent: z.lazy(() => LessonUncheckedCreateNestedManyWithoutStudentInputSchema).optional(),
  availabilities: z.lazy(() => InstructorAvailabilityUncheckedCreateNestedManyWithoutInstructorInputSchema).optional(),
  magicTokens: z.lazy(() => MagicTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instructor: z.lazy(() => UserUpdateOneWithoutStudentsNestedInputSchema).optional(),
  students: z.lazy(() => UserUpdateManyWithoutInstructorNestedInputSchema).optional(),
  lessonsAsInstructor: z.lazy(() => LessonUpdateManyWithoutInstructorNestedInputSchema).optional(),
  lessonsAsStudent: z.lazy(() => LessonUpdateManyWithoutStudentNestedInputSchema).optional(),
  availabilities: z.lazy(() => InstructorAvailabilityUpdateManyWithoutInstructorNestedInputSchema).optional(),
  magicTokens: z.lazy(() => MagicTokenUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instructorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  students: z.lazy(() => UserUncheckedUpdateManyWithoutInstructorNestedInputSchema).optional(),
  lessonsAsInstructor: z.lazy(() => LessonUncheckedUpdateManyWithoutInstructorNestedInputSchema).optional(),
  lessonsAsStudent: z.lazy(() => LessonUncheckedUpdateManyWithoutStudentNestedInputSchema).optional(),
  availabilities: z.lazy(() => InstructorAvailabilityUncheckedUpdateManyWithoutInstructorNestedInputSchema).optional(),
  magicTokens: z.lazy(() => MagicTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  phoneNumber: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  instructorId: z.string().optional().nullable(),
});

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instructorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const InstructorAvailabilityCreateInputSchema: z.ZodType<Prisma.InstructorAvailabilityCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  dayOfWeek: z.number().int(),
  hours: z.union([ z.lazy(() => InstructorAvailabilityCreatehoursInputSchema), z.number().int().array() ]).optional(),
  instructor: z.lazy(() => UserCreateNestedOneWithoutAvailabilitiesInputSchema),
});

export const InstructorAvailabilityUncheckedCreateInputSchema: z.ZodType<Prisma.InstructorAvailabilityUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  instructorId: z.string(),
  dayOfWeek: z.number().int(),
  hours: z.union([ z.lazy(() => InstructorAvailabilityCreatehoursInputSchema), z.number().int().array() ]).optional(),
});

export const InstructorAvailabilityUpdateInputSchema: z.ZodType<Prisma.InstructorAvailabilityUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hours: z.union([ z.lazy(() => InstructorAvailabilityUpdatehoursInputSchema), z.number().int().array() ]).optional(),
  instructor: z.lazy(() => UserUpdateOneRequiredWithoutAvailabilitiesNestedInputSchema).optional(),
});

export const InstructorAvailabilityUncheckedUpdateInputSchema: z.ZodType<Prisma.InstructorAvailabilityUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  instructorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hours: z.union([ z.lazy(() => InstructorAvailabilityUpdatehoursInputSchema), z.number().int().array() ]).optional(),
});

export const InstructorAvailabilityCreateManyInputSchema: z.ZodType<Prisma.InstructorAvailabilityCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  instructorId: z.string(),
  dayOfWeek: z.number().int(),
  hours: z.union([ z.lazy(() => InstructorAvailabilityCreatehoursInputSchema), z.number().int().array() ]).optional(),
});

export const InstructorAvailabilityUpdateManyMutationInputSchema: z.ZodType<Prisma.InstructorAvailabilityUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hours: z.union([ z.lazy(() => InstructorAvailabilityUpdatehoursInputSchema), z.number().int().array() ]).optional(),
});

export const InstructorAvailabilityUncheckedUpdateManyInputSchema: z.ZodType<Prisma.InstructorAvailabilityUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  instructorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hours: z.union([ z.lazy(() => InstructorAvailabilityUpdatehoursInputSchema), z.number().int().array() ]).optional(),
});

export const LessonCreateInputSchema: z.ZodType<Prisma.LessonCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  startTime: z.coerce.date(),
  durationMin: z.number().int().optional(),
  status: z.lazy(() => LessonStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  instructor: z.lazy(() => UserCreateNestedOneWithoutLessonsAsInstructorInputSchema),
  student: z.lazy(() => UserCreateNestedOneWithoutLessonsAsStudentInputSchema),
});

export const LessonUncheckedCreateInputSchema: z.ZodType<Prisma.LessonUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  instructorId: z.string(),
  studentId: z.string(),
  startTime: z.coerce.date(),
  durationMin: z.number().int().optional(),
  status: z.lazy(() => LessonStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
});

export const LessonUpdateInputSchema: z.ZodType<Prisma.LessonUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  durationMin: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => LessonStatusSchema), z.lazy(() => EnumLessonStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  instructor: z.lazy(() => UserUpdateOneRequiredWithoutLessonsAsInstructorNestedInputSchema).optional(),
  student: z.lazy(() => UserUpdateOneRequiredWithoutLessonsAsStudentNestedInputSchema).optional(),
});

export const LessonUncheckedUpdateInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  instructorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  durationMin: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => LessonStatusSchema), z.lazy(() => EnumLessonStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const LessonCreateManyInputSchema: z.ZodType<Prisma.LessonCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  instructorId: z.string(),
  studentId: z.string(),
  startTime: z.coerce.date(),
  durationMin: z.number().int().optional(),
  status: z.lazy(() => LessonStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
});

export const LessonUpdateManyMutationInputSchema: z.ZodType<Prisma.LessonUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  durationMin: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => LessonStatusSchema), z.lazy(() => EnumLessonStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const LessonUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  instructorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  durationMin: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => LessonStatusSchema), z.lazy(() => EnumLessonStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const MagicTokenCreateInputSchema: z.ZodType<Prisma.MagicTokenCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  token: z.uuid().optional(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutMagicTokensInputSchema),
});

export const MagicTokenUncheckedCreateInputSchema: z.ZodType<Prisma.MagicTokenUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  token: z.uuid().optional(),
  userId: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
});

export const MagicTokenUpdateInputSchema: z.ZodType<Prisma.MagicTokenUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutMagicTokensNestedInputSchema).optional(),
});

export const MagicTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.MagicTokenUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const MagicTokenCreateManyInputSchema: z.ZodType<Prisma.MagicTokenCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  token: z.uuid().optional(),
  userId: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
});

export const MagicTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.MagicTokenUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const MagicTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MagicTokenUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
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

export const EnumRoleFilterSchema: z.ZodType<Prisma.EnumRoleFilter> = z.strictObject({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
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

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
});

export const UserNullableScalarRelationFilterSchema: z.ZodType<Prisma.UserNullableScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable(),
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

export const InstructorAvailabilityListRelationFilterSchema: z.ZodType<Prisma.InstructorAvailabilityListRelationFilter> = z.strictObject({
  every: z.lazy(() => InstructorAvailabilityWhereInputSchema).optional(),
  some: z.lazy(() => InstructorAvailabilityWhereInputSchema).optional(),
  none: z.lazy(() => InstructorAvailabilityWhereInputSchema).optional(),
});

export const MagicTokenListRelationFilterSchema: z.ZodType<Prisma.MagicTokenListRelationFilter> = z.strictObject({
  every: z.lazy(() => MagicTokenWhereInputSchema).optional(),
  some: z.lazy(() => MagicTokenWhereInputSchema).optional(),
  none: z.lazy(() => MagicTokenWhereInputSchema).optional(),
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

export const InstructorAvailabilityOrderByRelationAggregateInputSchema: z.ZodType<Prisma.InstructorAvailabilityOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const MagicTokenOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MagicTokenOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional(),
  instructorId: z.lazy(() => SortOrderSchema).optional(),
});

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional(),
  instructorId: z.lazy(() => SortOrderSchema).optional(),
});

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional(),
  instructorId: z.lazy(() => SortOrderSchema).optional(),
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

export const EnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
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

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
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

export const IntNullableListFilterSchema: z.ZodType<Prisma.IntNullableListFilter> = z.strictObject({
  equals: z.number().array().optional().nullable(),
  has: z.number().optional().nullable(),
  hasEvery: z.number().array().optional(),
  hasSome: z.number().array().optional(),
  isEmpty: z.boolean().optional(),
});

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional(),
});

export const InstructorAvailabilityInstructorIdDayOfWeekCompoundUniqueInputSchema: z.ZodType<Prisma.InstructorAvailabilityInstructorIdDayOfWeekCompoundUniqueInput> = z.strictObject({
  instructorId: z.string(),
  dayOfWeek: z.number(),
});

export const InstructorAvailabilityCountOrderByAggregateInputSchema: z.ZodType<Prisma.InstructorAvailabilityCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  instructorId: z.lazy(() => SortOrderSchema).optional(),
  dayOfWeek: z.lazy(() => SortOrderSchema).optional(),
  hours: z.lazy(() => SortOrderSchema).optional(),
});

export const InstructorAvailabilityAvgOrderByAggregateInputSchema: z.ZodType<Prisma.InstructorAvailabilityAvgOrderByAggregateInput> = z.strictObject({
  dayOfWeek: z.lazy(() => SortOrderSchema).optional(),
  hours: z.lazy(() => SortOrderSchema).optional(),
});

export const InstructorAvailabilityMaxOrderByAggregateInputSchema: z.ZodType<Prisma.InstructorAvailabilityMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  instructorId: z.lazy(() => SortOrderSchema).optional(),
  dayOfWeek: z.lazy(() => SortOrderSchema).optional(),
});

export const InstructorAvailabilityMinOrderByAggregateInputSchema: z.ZodType<Prisma.InstructorAvailabilityMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  instructorId: z.lazy(() => SortOrderSchema).optional(),
  dayOfWeek: z.lazy(() => SortOrderSchema).optional(),
});

export const InstructorAvailabilitySumOrderByAggregateInputSchema: z.ZodType<Prisma.InstructorAvailabilitySumOrderByAggregateInput> = z.strictObject({
  dayOfWeek: z.lazy(() => SortOrderSchema).optional(),
  hours: z.lazy(() => SortOrderSchema).optional(),
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

export const EnumLessonStatusFilterSchema: z.ZodType<Prisma.EnumLessonStatusFilter> = z.strictObject({
  equals: z.lazy(() => LessonStatusSchema).optional(),
  in: z.lazy(() => LessonStatusSchema).array().optional(),
  notIn: z.lazy(() => LessonStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => LessonStatusSchema), z.lazy(() => NestedEnumLessonStatusFilterSchema) ]).optional(),
});

export const LessonInstructorIdStartTimeCompoundUniqueInputSchema: z.ZodType<Prisma.LessonInstructorIdStartTimeCompoundUniqueInput> = z.strictObject({
  instructorId: z.string(),
  startTime: z.coerce.date(),
});

export const LessonCountOrderByAggregateInputSchema: z.ZodType<Prisma.LessonCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  instructorId: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  durationMin: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const LessonAvgOrderByAggregateInputSchema: z.ZodType<Prisma.LessonAvgOrderByAggregateInput> = z.strictObject({
  durationMin: z.lazy(() => SortOrderSchema).optional(),
});

export const LessonMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LessonMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  instructorId: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  durationMin: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const LessonMinOrderByAggregateInputSchema: z.ZodType<Prisma.LessonMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  instructorId: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  durationMin: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const LessonSumOrderByAggregateInputSchema: z.ZodType<Prisma.LessonSumOrderByAggregateInput> = z.strictObject({
  durationMin: z.lazy(() => SortOrderSchema).optional(),
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

export const MagicTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.MagicTokenCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const MagicTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MagicTokenMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const MagicTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.MagicTokenMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const UserCreateNestedOneWithoutStudentsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutStudentsInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutStudentsInputSchema), z.lazy(() => UserUncheckedCreateWithoutStudentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutStudentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const UserCreateNestedManyWithoutInstructorInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutInstructorInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutInstructorInputSchema), z.lazy(() => UserCreateWithoutInstructorInputSchema).array(), z.lazy(() => UserUncheckedCreateWithoutInstructorInputSchema), z.lazy(() => UserUncheckedCreateWithoutInstructorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutInstructorInputSchema), z.lazy(() => UserCreateOrConnectWithoutInstructorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyInstructorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
});

export const LessonCreateNestedManyWithoutInstructorInputSchema: z.ZodType<Prisma.LessonCreateNestedManyWithoutInstructorInput> = z.strictObject({
  create: z.union([ z.lazy(() => LessonCreateWithoutInstructorInputSchema), z.lazy(() => LessonCreateWithoutInstructorInputSchema).array(), z.lazy(() => LessonUncheckedCreateWithoutInstructorInputSchema), z.lazy(() => LessonUncheckedCreateWithoutInstructorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LessonCreateOrConnectWithoutInstructorInputSchema), z.lazy(() => LessonCreateOrConnectWithoutInstructorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LessonCreateManyInstructorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LessonWhereUniqueInputSchema), z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
});

export const LessonCreateNestedManyWithoutStudentInputSchema: z.ZodType<Prisma.LessonCreateNestedManyWithoutStudentInput> = z.strictObject({
  create: z.union([ z.lazy(() => LessonCreateWithoutStudentInputSchema), z.lazy(() => LessonCreateWithoutStudentInputSchema).array(), z.lazy(() => LessonUncheckedCreateWithoutStudentInputSchema), z.lazy(() => LessonUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LessonCreateOrConnectWithoutStudentInputSchema), z.lazy(() => LessonCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LessonCreateManyStudentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LessonWhereUniqueInputSchema), z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
});

export const InstructorAvailabilityCreateNestedManyWithoutInstructorInputSchema: z.ZodType<Prisma.InstructorAvailabilityCreateNestedManyWithoutInstructorInput> = z.strictObject({
  create: z.union([ z.lazy(() => InstructorAvailabilityCreateWithoutInstructorInputSchema), z.lazy(() => InstructorAvailabilityCreateWithoutInstructorInputSchema).array(), z.lazy(() => InstructorAvailabilityUncheckedCreateWithoutInstructorInputSchema), z.lazy(() => InstructorAvailabilityUncheckedCreateWithoutInstructorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InstructorAvailabilityCreateOrConnectWithoutInstructorInputSchema), z.lazy(() => InstructorAvailabilityCreateOrConnectWithoutInstructorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InstructorAvailabilityCreateManyInstructorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InstructorAvailabilityWhereUniqueInputSchema), z.lazy(() => InstructorAvailabilityWhereUniqueInputSchema).array() ]).optional(),
});

export const MagicTokenCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.MagicTokenCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => MagicTokenCreateWithoutUserInputSchema), z.lazy(() => MagicTokenCreateWithoutUserInputSchema).array(), z.lazy(() => MagicTokenUncheckedCreateWithoutUserInputSchema), z.lazy(() => MagicTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MagicTokenCreateOrConnectWithoutUserInputSchema), z.lazy(() => MagicTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MagicTokenCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MagicTokenWhereUniqueInputSchema), z.lazy(() => MagicTokenWhereUniqueInputSchema).array() ]).optional(),
});

export const UserUncheckedCreateNestedManyWithoutInstructorInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutInstructorInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutInstructorInputSchema), z.lazy(() => UserCreateWithoutInstructorInputSchema).array(), z.lazy(() => UserUncheckedCreateWithoutInstructorInputSchema), z.lazy(() => UserUncheckedCreateWithoutInstructorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutInstructorInputSchema), z.lazy(() => UserCreateOrConnectWithoutInstructorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyInstructorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
});

export const LessonUncheckedCreateNestedManyWithoutInstructorInputSchema: z.ZodType<Prisma.LessonUncheckedCreateNestedManyWithoutInstructorInput> = z.strictObject({
  create: z.union([ z.lazy(() => LessonCreateWithoutInstructorInputSchema), z.lazy(() => LessonCreateWithoutInstructorInputSchema).array(), z.lazy(() => LessonUncheckedCreateWithoutInstructorInputSchema), z.lazy(() => LessonUncheckedCreateWithoutInstructorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LessonCreateOrConnectWithoutInstructorInputSchema), z.lazy(() => LessonCreateOrConnectWithoutInstructorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LessonCreateManyInstructorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LessonWhereUniqueInputSchema), z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
});

export const LessonUncheckedCreateNestedManyWithoutStudentInputSchema: z.ZodType<Prisma.LessonUncheckedCreateNestedManyWithoutStudentInput> = z.strictObject({
  create: z.union([ z.lazy(() => LessonCreateWithoutStudentInputSchema), z.lazy(() => LessonCreateWithoutStudentInputSchema).array(), z.lazy(() => LessonUncheckedCreateWithoutStudentInputSchema), z.lazy(() => LessonUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LessonCreateOrConnectWithoutStudentInputSchema), z.lazy(() => LessonCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LessonCreateManyStudentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LessonWhereUniqueInputSchema), z.lazy(() => LessonWhereUniqueInputSchema).array() ]).optional(),
});

export const InstructorAvailabilityUncheckedCreateNestedManyWithoutInstructorInputSchema: z.ZodType<Prisma.InstructorAvailabilityUncheckedCreateNestedManyWithoutInstructorInput> = z.strictObject({
  create: z.union([ z.lazy(() => InstructorAvailabilityCreateWithoutInstructorInputSchema), z.lazy(() => InstructorAvailabilityCreateWithoutInstructorInputSchema).array(), z.lazy(() => InstructorAvailabilityUncheckedCreateWithoutInstructorInputSchema), z.lazy(() => InstructorAvailabilityUncheckedCreateWithoutInstructorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InstructorAvailabilityCreateOrConnectWithoutInstructorInputSchema), z.lazy(() => InstructorAvailabilityCreateOrConnectWithoutInstructorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InstructorAvailabilityCreateManyInstructorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InstructorAvailabilityWhereUniqueInputSchema), z.lazy(() => InstructorAvailabilityWhereUniqueInputSchema).array() ]).optional(),
});

export const MagicTokenUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.MagicTokenUncheckedCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => MagicTokenCreateWithoutUserInputSchema), z.lazy(() => MagicTokenCreateWithoutUserInputSchema).array(), z.lazy(() => MagicTokenUncheckedCreateWithoutUserInputSchema), z.lazy(() => MagicTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MagicTokenCreateOrConnectWithoutUserInputSchema), z.lazy(() => MagicTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MagicTokenCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MagicTokenWhereUniqueInputSchema), z.lazy(() => MagicTokenWhereUniqueInputSchema).array() ]).optional(),
});

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional(),
});

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional().nullable(),
});

export const EnumRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => RoleSchema).optional(),
});

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.strictObject({
  set: z.coerce.date().optional(),
});

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.strictObject({
  set: z.coerce.date().optional().nullable(),
});

export const UserUpdateOneWithoutStudentsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutStudentsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutStudentsInputSchema), z.lazy(() => UserUncheckedCreateWithoutStudentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutStudentsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutStudentsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutStudentsInputSchema), z.lazy(() => UserUpdateWithoutStudentsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutStudentsInputSchema) ]).optional(),
});

export const UserUpdateManyWithoutInstructorNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutInstructorNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutInstructorInputSchema), z.lazy(() => UserCreateWithoutInstructorInputSchema).array(), z.lazy(() => UserUncheckedCreateWithoutInstructorInputSchema), z.lazy(() => UserUncheckedCreateWithoutInstructorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutInstructorInputSchema), z.lazy(() => UserCreateOrConnectWithoutInstructorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutInstructorInputSchema), z.lazy(() => UserUpsertWithWhereUniqueWithoutInstructorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyInstructorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutInstructorInputSchema), z.lazy(() => UserUpdateWithWhereUniqueWithoutInstructorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutInstructorInputSchema), z.lazy(() => UserUpdateManyWithWhereWithoutInstructorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema), z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
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

export const InstructorAvailabilityUpdateManyWithoutInstructorNestedInputSchema: z.ZodType<Prisma.InstructorAvailabilityUpdateManyWithoutInstructorNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => InstructorAvailabilityCreateWithoutInstructorInputSchema), z.lazy(() => InstructorAvailabilityCreateWithoutInstructorInputSchema).array(), z.lazy(() => InstructorAvailabilityUncheckedCreateWithoutInstructorInputSchema), z.lazy(() => InstructorAvailabilityUncheckedCreateWithoutInstructorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InstructorAvailabilityCreateOrConnectWithoutInstructorInputSchema), z.lazy(() => InstructorAvailabilityCreateOrConnectWithoutInstructorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InstructorAvailabilityUpsertWithWhereUniqueWithoutInstructorInputSchema), z.lazy(() => InstructorAvailabilityUpsertWithWhereUniqueWithoutInstructorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InstructorAvailabilityCreateManyInstructorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InstructorAvailabilityWhereUniqueInputSchema), z.lazy(() => InstructorAvailabilityWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InstructorAvailabilityWhereUniqueInputSchema), z.lazy(() => InstructorAvailabilityWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InstructorAvailabilityWhereUniqueInputSchema), z.lazy(() => InstructorAvailabilityWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InstructorAvailabilityWhereUniqueInputSchema), z.lazy(() => InstructorAvailabilityWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InstructorAvailabilityUpdateWithWhereUniqueWithoutInstructorInputSchema), z.lazy(() => InstructorAvailabilityUpdateWithWhereUniqueWithoutInstructorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InstructorAvailabilityUpdateManyWithWhereWithoutInstructorInputSchema), z.lazy(() => InstructorAvailabilityUpdateManyWithWhereWithoutInstructorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InstructorAvailabilityScalarWhereInputSchema), z.lazy(() => InstructorAvailabilityScalarWhereInputSchema).array() ]).optional(),
});

export const MagicTokenUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.MagicTokenUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => MagicTokenCreateWithoutUserInputSchema), z.lazy(() => MagicTokenCreateWithoutUserInputSchema).array(), z.lazy(() => MagicTokenUncheckedCreateWithoutUserInputSchema), z.lazy(() => MagicTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MagicTokenCreateOrConnectWithoutUserInputSchema), z.lazy(() => MagicTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MagicTokenUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => MagicTokenUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MagicTokenCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MagicTokenWhereUniqueInputSchema), z.lazy(() => MagicTokenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MagicTokenWhereUniqueInputSchema), z.lazy(() => MagicTokenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MagicTokenWhereUniqueInputSchema), z.lazy(() => MagicTokenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MagicTokenWhereUniqueInputSchema), z.lazy(() => MagicTokenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MagicTokenUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => MagicTokenUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MagicTokenUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => MagicTokenUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MagicTokenScalarWhereInputSchema), z.lazy(() => MagicTokenScalarWhereInputSchema).array() ]).optional(),
});

export const UserUncheckedUpdateManyWithoutInstructorNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutInstructorNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutInstructorInputSchema), z.lazy(() => UserCreateWithoutInstructorInputSchema).array(), z.lazy(() => UserUncheckedCreateWithoutInstructorInputSchema), z.lazy(() => UserUncheckedCreateWithoutInstructorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutInstructorInputSchema), z.lazy(() => UserCreateOrConnectWithoutInstructorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutInstructorInputSchema), z.lazy(() => UserUpsertWithWhereUniqueWithoutInstructorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyInstructorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutInstructorInputSchema), z.lazy(() => UserUpdateWithWhereUniqueWithoutInstructorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutInstructorInputSchema), z.lazy(() => UserUpdateManyWithWhereWithoutInstructorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema), z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
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

export const InstructorAvailabilityUncheckedUpdateManyWithoutInstructorNestedInputSchema: z.ZodType<Prisma.InstructorAvailabilityUncheckedUpdateManyWithoutInstructorNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => InstructorAvailabilityCreateWithoutInstructorInputSchema), z.lazy(() => InstructorAvailabilityCreateWithoutInstructorInputSchema).array(), z.lazy(() => InstructorAvailabilityUncheckedCreateWithoutInstructorInputSchema), z.lazy(() => InstructorAvailabilityUncheckedCreateWithoutInstructorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InstructorAvailabilityCreateOrConnectWithoutInstructorInputSchema), z.lazy(() => InstructorAvailabilityCreateOrConnectWithoutInstructorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InstructorAvailabilityUpsertWithWhereUniqueWithoutInstructorInputSchema), z.lazy(() => InstructorAvailabilityUpsertWithWhereUniqueWithoutInstructorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InstructorAvailabilityCreateManyInstructorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InstructorAvailabilityWhereUniqueInputSchema), z.lazy(() => InstructorAvailabilityWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InstructorAvailabilityWhereUniqueInputSchema), z.lazy(() => InstructorAvailabilityWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InstructorAvailabilityWhereUniqueInputSchema), z.lazy(() => InstructorAvailabilityWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InstructorAvailabilityWhereUniqueInputSchema), z.lazy(() => InstructorAvailabilityWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InstructorAvailabilityUpdateWithWhereUniqueWithoutInstructorInputSchema), z.lazy(() => InstructorAvailabilityUpdateWithWhereUniqueWithoutInstructorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InstructorAvailabilityUpdateManyWithWhereWithoutInstructorInputSchema), z.lazy(() => InstructorAvailabilityUpdateManyWithWhereWithoutInstructorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InstructorAvailabilityScalarWhereInputSchema), z.lazy(() => InstructorAvailabilityScalarWhereInputSchema).array() ]).optional(),
});

export const MagicTokenUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.MagicTokenUncheckedUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => MagicTokenCreateWithoutUserInputSchema), z.lazy(() => MagicTokenCreateWithoutUserInputSchema).array(), z.lazy(() => MagicTokenUncheckedCreateWithoutUserInputSchema), z.lazy(() => MagicTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MagicTokenCreateOrConnectWithoutUserInputSchema), z.lazy(() => MagicTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MagicTokenUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => MagicTokenUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MagicTokenCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MagicTokenWhereUniqueInputSchema), z.lazy(() => MagicTokenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MagicTokenWhereUniqueInputSchema), z.lazy(() => MagicTokenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MagicTokenWhereUniqueInputSchema), z.lazy(() => MagicTokenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MagicTokenWhereUniqueInputSchema), z.lazy(() => MagicTokenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MagicTokenUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => MagicTokenUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MagicTokenUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => MagicTokenUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MagicTokenScalarWhereInputSchema), z.lazy(() => MagicTokenScalarWhereInputSchema).array() ]).optional(),
});

export const InstructorAvailabilityCreatehoursInputSchema: z.ZodType<Prisma.InstructorAvailabilityCreatehoursInput> = z.strictObject({
  set: z.number().array(),
});

export const UserCreateNestedOneWithoutAvailabilitiesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAvailabilitiesInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutAvailabilitiesInputSchema), z.lazy(() => UserUncheckedCreateWithoutAvailabilitiesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAvailabilitiesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.strictObject({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
});

export const InstructorAvailabilityUpdatehoursInputSchema: z.ZodType<Prisma.InstructorAvailabilityUpdatehoursInput> = z.strictObject({
  set: z.number().array().optional(),
  push: z.union([ z.number(),z.number().array() ]).optional(),
});

export const UserUpdateOneRequiredWithoutAvailabilitiesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAvailabilitiesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutAvailabilitiesInputSchema), z.lazy(() => UserUncheckedCreateWithoutAvailabilitiesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAvailabilitiesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAvailabilitiesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAvailabilitiesInputSchema), z.lazy(() => UserUpdateWithoutAvailabilitiesInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAvailabilitiesInputSchema) ]).optional(),
});

export const UserCreateNestedOneWithoutLessonsAsInstructorInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutLessonsAsInstructorInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutLessonsAsInstructorInputSchema), z.lazy(() => UserUncheckedCreateWithoutLessonsAsInstructorInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutLessonsAsInstructorInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const UserCreateNestedOneWithoutLessonsAsStudentInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutLessonsAsStudentInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutLessonsAsStudentInputSchema), z.lazy(() => UserUncheckedCreateWithoutLessonsAsStudentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutLessonsAsStudentInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const EnumLessonStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumLessonStatusFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => LessonStatusSchema).optional(),
});

export const UserUpdateOneRequiredWithoutLessonsAsInstructorNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutLessonsAsInstructorNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutLessonsAsInstructorInputSchema), z.lazy(() => UserUncheckedCreateWithoutLessonsAsInstructorInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutLessonsAsInstructorInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutLessonsAsInstructorInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutLessonsAsInstructorInputSchema), z.lazy(() => UserUpdateWithoutLessonsAsInstructorInputSchema), z.lazy(() => UserUncheckedUpdateWithoutLessonsAsInstructorInputSchema) ]).optional(),
});

export const UserUpdateOneRequiredWithoutLessonsAsStudentNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutLessonsAsStudentNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutLessonsAsStudentInputSchema), z.lazy(() => UserUncheckedCreateWithoutLessonsAsStudentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutLessonsAsStudentInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutLessonsAsStudentInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutLessonsAsStudentInputSchema), z.lazy(() => UserUpdateWithoutLessonsAsStudentInputSchema), z.lazy(() => UserUncheckedUpdateWithoutLessonsAsStudentInputSchema) ]).optional(),
});

export const UserCreateNestedOneWithoutMagicTokensInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutMagicTokensInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutMagicTokensInputSchema), z.lazy(() => UserUncheckedCreateWithoutMagicTokensInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMagicTokensInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const UserUpdateOneRequiredWithoutMagicTokensNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutMagicTokensNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutMagicTokensInputSchema), z.lazy(() => UserUncheckedCreateWithoutMagicTokensInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMagicTokensInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutMagicTokensInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutMagicTokensInputSchema), z.lazy(() => UserUpdateWithoutMagicTokensInputSchema), z.lazy(() => UserUncheckedUpdateWithoutMagicTokensInputSchema) ]).optional(),
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

export const NestedEnumRoleFilterSchema: z.ZodType<Prisma.NestedEnumRoleFilter> = z.strictObject({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
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

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
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

export const NestedEnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
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

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
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

export const UserCreateWithoutStudentsInputSchema: z.ZodType<Prisma.UserCreateWithoutStudentsInput> = z.strictObject({
  id: z.uuid().optional(),
  phoneNumber: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  instructor: z.lazy(() => UserCreateNestedOneWithoutStudentsInputSchema).optional(),
  lessonsAsInstructor: z.lazy(() => LessonCreateNestedManyWithoutInstructorInputSchema).optional(),
  lessonsAsStudent: z.lazy(() => LessonCreateNestedManyWithoutStudentInputSchema).optional(),
  availabilities: z.lazy(() => InstructorAvailabilityCreateNestedManyWithoutInstructorInputSchema).optional(),
  magicTokens: z.lazy(() => MagicTokenCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutStudentsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutStudentsInput> = z.strictObject({
  id: z.uuid().optional(),
  phoneNumber: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  instructorId: z.string().optional().nullable(),
  lessonsAsInstructor: z.lazy(() => LessonUncheckedCreateNestedManyWithoutInstructorInputSchema).optional(),
  lessonsAsStudent: z.lazy(() => LessonUncheckedCreateNestedManyWithoutStudentInputSchema).optional(),
  availabilities: z.lazy(() => InstructorAvailabilityUncheckedCreateNestedManyWithoutInstructorInputSchema).optional(),
  magicTokens: z.lazy(() => MagicTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutStudentsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutStudentsInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutStudentsInputSchema), z.lazy(() => UserUncheckedCreateWithoutStudentsInputSchema) ]),
});

export const UserCreateWithoutInstructorInputSchema: z.ZodType<Prisma.UserCreateWithoutInstructorInput> = z.strictObject({
  id: z.uuid().optional(),
  phoneNumber: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  students: z.lazy(() => UserCreateNestedManyWithoutInstructorInputSchema).optional(),
  lessonsAsInstructor: z.lazy(() => LessonCreateNestedManyWithoutInstructorInputSchema).optional(),
  lessonsAsStudent: z.lazy(() => LessonCreateNestedManyWithoutStudentInputSchema).optional(),
  availabilities: z.lazy(() => InstructorAvailabilityCreateNestedManyWithoutInstructorInputSchema).optional(),
  magicTokens: z.lazy(() => MagicTokenCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutInstructorInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutInstructorInput> = z.strictObject({
  id: z.uuid().optional(),
  phoneNumber: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  students: z.lazy(() => UserUncheckedCreateNestedManyWithoutInstructorInputSchema).optional(),
  lessonsAsInstructor: z.lazy(() => LessonUncheckedCreateNestedManyWithoutInstructorInputSchema).optional(),
  lessonsAsStudent: z.lazy(() => LessonUncheckedCreateNestedManyWithoutStudentInputSchema).optional(),
  availabilities: z.lazy(() => InstructorAvailabilityUncheckedCreateNestedManyWithoutInstructorInputSchema).optional(),
  magicTokens: z.lazy(() => MagicTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutInstructorInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutInstructorInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutInstructorInputSchema), z.lazy(() => UserUncheckedCreateWithoutInstructorInputSchema) ]),
});

export const UserCreateManyInstructorInputEnvelopeSchema: z.ZodType<Prisma.UserCreateManyInstructorInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => UserCreateManyInstructorInputSchema), z.lazy(() => UserCreateManyInstructorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const LessonCreateWithoutInstructorInputSchema: z.ZodType<Prisma.LessonCreateWithoutInstructorInput> = z.strictObject({
  id: z.uuid().optional(),
  startTime: z.coerce.date(),
  durationMin: z.number().int().optional(),
  status: z.lazy(() => LessonStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  student: z.lazy(() => UserCreateNestedOneWithoutLessonsAsStudentInputSchema),
});

export const LessonUncheckedCreateWithoutInstructorInputSchema: z.ZodType<Prisma.LessonUncheckedCreateWithoutInstructorInput> = z.strictObject({
  id: z.uuid().optional(),
  studentId: z.string(),
  startTime: z.coerce.date(),
  durationMin: z.number().int().optional(),
  status: z.lazy(() => LessonStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
});

export const LessonCreateOrConnectWithoutInstructorInputSchema: z.ZodType<Prisma.LessonCreateOrConnectWithoutInstructorInput> = z.strictObject({
  where: z.lazy(() => LessonWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LessonCreateWithoutInstructorInputSchema), z.lazy(() => LessonUncheckedCreateWithoutInstructorInputSchema) ]),
});

export const LessonCreateManyInstructorInputEnvelopeSchema: z.ZodType<Prisma.LessonCreateManyInstructorInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => LessonCreateManyInstructorInputSchema), z.lazy(() => LessonCreateManyInstructorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const LessonCreateWithoutStudentInputSchema: z.ZodType<Prisma.LessonCreateWithoutStudentInput> = z.strictObject({
  id: z.uuid().optional(),
  startTime: z.coerce.date(),
  durationMin: z.number().int().optional(),
  status: z.lazy(() => LessonStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  instructor: z.lazy(() => UserCreateNestedOneWithoutLessonsAsInstructorInputSchema),
});

export const LessonUncheckedCreateWithoutStudentInputSchema: z.ZodType<Prisma.LessonUncheckedCreateWithoutStudentInput> = z.strictObject({
  id: z.uuid().optional(),
  instructorId: z.string(),
  startTime: z.coerce.date(),
  durationMin: z.number().int().optional(),
  status: z.lazy(() => LessonStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
});

export const LessonCreateOrConnectWithoutStudentInputSchema: z.ZodType<Prisma.LessonCreateOrConnectWithoutStudentInput> = z.strictObject({
  where: z.lazy(() => LessonWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LessonCreateWithoutStudentInputSchema), z.lazy(() => LessonUncheckedCreateWithoutStudentInputSchema) ]),
});

export const LessonCreateManyStudentInputEnvelopeSchema: z.ZodType<Prisma.LessonCreateManyStudentInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => LessonCreateManyStudentInputSchema), z.lazy(() => LessonCreateManyStudentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const InstructorAvailabilityCreateWithoutInstructorInputSchema: z.ZodType<Prisma.InstructorAvailabilityCreateWithoutInstructorInput> = z.strictObject({
  id: z.uuid().optional(),
  dayOfWeek: z.number().int(),
  hours: z.union([ z.lazy(() => InstructorAvailabilityCreatehoursInputSchema), z.number().int().array() ]).optional(),
});

export const InstructorAvailabilityUncheckedCreateWithoutInstructorInputSchema: z.ZodType<Prisma.InstructorAvailabilityUncheckedCreateWithoutInstructorInput> = z.strictObject({
  id: z.uuid().optional(),
  dayOfWeek: z.number().int(),
  hours: z.union([ z.lazy(() => InstructorAvailabilityCreatehoursInputSchema), z.number().int().array() ]).optional(),
});

export const InstructorAvailabilityCreateOrConnectWithoutInstructorInputSchema: z.ZodType<Prisma.InstructorAvailabilityCreateOrConnectWithoutInstructorInput> = z.strictObject({
  where: z.lazy(() => InstructorAvailabilityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InstructorAvailabilityCreateWithoutInstructorInputSchema), z.lazy(() => InstructorAvailabilityUncheckedCreateWithoutInstructorInputSchema) ]),
});

export const InstructorAvailabilityCreateManyInstructorInputEnvelopeSchema: z.ZodType<Prisma.InstructorAvailabilityCreateManyInstructorInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => InstructorAvailabilityCreateManyInstructorInputSchema), z.lazy(() => InstructorAvailabilityCreateManyInstructorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const MagicTokenCreateWithoutUserInputSchema: z.ZodType<Prisma.MagicTokenCreateWithoutUserInput> = z.strictObject({
  id: z.uuid().optional(),
  token: z.uuid().optional(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
});

export const MagicTokenUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.MagicTokenUncheckedCreateWithoutUserInput> = z.strictObject({
  id: z.uuid().optional(),
  token: z.uuid().optional(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
});

export const MagicTokenCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.MagicTokenCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => MagicTokenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MagicTokenCreateWithoutUserInputSchema), z.lazy(() => MagicTokenUncheckedCreateWithoutUserInputSchema) ]),
});

export const MagicTokenCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.MagicTokenCreateManyUserInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => MagicTokenCreateManyUserInputSchema), z.lazy(() => MagicTokenCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const UserUpsertWithoutStudentsInputSchema: z.ZodType<Prisma.UserUpsertWithoutStudentsInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutStudentsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutStudentsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutStudentsInputSchema), z.lazy(() => UserUncheckedCreateWithoutStudentsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutStudentsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutStudentsInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutStudentsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutStudentsInputSchema) ]),
});

export const UserUpdateWithoutStudentsInputSchema: z.ZodType<Prisma.UserUpdateWithoutStudentsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instructor: z.lazy(() => UserUpdateOneWithoutStudentsNestedInputSchema).optional(),
  lessonsAsInstructor: z.lazy(() => LessonUpdateManyWithoutInstructorNestedInputSchema).optional(),
  lessonsAsStudent: z.lazy(() => LessonUpdateManyWithoutStudentNestedInputSchema).optional(),
  availabilities: z.lazy(() => InstructorAvailabilityUpdateManyWithoutInstructorNestedInputSchema).optional(),
  magicTokens: z.lazy(() => MagicTokenUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutStudentsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutStudentsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instructorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lessonsAsInstructor: z.lazy(() => LessonUncheckedUpdateManyWithoutInstructorNestedInputSchema).optional(),
  lessonsAsStudent: z.lazy(() => LessonUncheckedUpdateManyWithoutStudentNestedInputSchema).optional(),
  availabilities: z.lazy(() => InstructorAvailabilityUncheckedUpdateManyWithoutInstructorNestedInputSchema).optional(),
  magicTokens: z.lazy(() => MagicTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUpsertWithWhereUniqueWithoutInstructorInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutInstructorInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutInstructorInputSchema), z.lazy(() => UserUncheckedUpdateWithoutInstructorInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutInstructorInputSchema), z.lazy(() => UserUncheckedCreateWithoutInstructorInputSchema) ]),
});

export const UserUpdateWithWhereUniqueWithoutInstructorInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutInstructorInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutInstructorInputSchema), z.lazy(() => UserUncheckedUpdateWithoutInstructorInputSchema) ]),
});

export const UserUpdateManyWithWhereWithoutInstructorInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutInstructorInput> = z.strictObject({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema), z.lazy(() => UserUncheckedUpdateManyWithoutInstructorInputSchema) ]),
});

export const UserScalarWhereInputSchema: z.ZodType<Prisma.UserScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserScalarWhereInputSchema), z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereInputSchema), z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  passwordHash: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  firstName: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  instructorId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
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

export const LessonScalarWhereInputSchema: z.ZodType<Prisma.LessonScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => LessonScalarWhereInputSchema), z.lazy(() => LessonScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LessonScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LessonScalarWhereInputSchema), z.lazy(() => LessonScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  instructorId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  studentId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  startTime: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  durationMin: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  status: z.union([ z.lazy(() => EnumLessonStatusFilterSchema), z.lazy(() => LessonStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
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

export const InstructorAvailabilityUpsertWithWhereUniqueWithoutInstructorInputSchema: z.ZodType<Prisma.InstructorAvailabilityUpsertWithWhereUniqueWithoutInstructorInput> = z.strictObject({
  where: z.lazy(() => InstructorAvailabilityWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => InstructorAvailabilityUpdateWithoutInstructorInputSchema), z.lazy(() => InstructorAvailabilityUncheckedUpdateWithoutInstructorInputSchema) ]),
  create: z.union([ z.lazy(() => InstructorAvailabilityCreateWithoutInstructorInputSchema), z.lazy(() => InstructorAvailabilityUncheckedCreateWithoutInstructorInputSchema) ]),
});

export const InstructorAvailabilityUpdateWithWhereUniqueWithoutInstructorInputSchema: z.ZodType<Prisma.InstructorAvailabilityUpdateWithWhereUniqueWithoutInstructorInput> = z.strictObject({
  where: z.lazy(() => InstructorAvailabilityWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => InstructorAvailabilityUpdateWithoutInstructorInputSchema), z.lazy(() => InstructorAvailabilityUncheckedUpdateWithoutInstructorInputSchema) ]),
});

export const InstructorAvailabilityUpdateManyWithWhereWithoutInstructorInputSchema: z.ZodType<Prisma.InstructorAvailabilityUpdateManyWithWhereWithoutInstructorInput> = z.strictObject({
  where: z.lazy(() => InstructorAvailabilityScalarWhereInputSchema),
  data: z.union([ z.lazy(() => InstructorAvailabilityUpdateManyMutationInputSchema), z.lazy(() => InstructorAvailabilityUncheckedUpdateManyWithoutInstructorInputSchema) ]),
});

export const InstructorAvailabilityScalarWhereInputSchema: z.ZodType<Prisma.InstructorAvailabilityScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => InstructorAvailabilityScalarWhereInputSchema), z.lazy(() => InstructorAvailabilityScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InstructorAvailabilityScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InstructorAvailabilityScalarWhereInputSchema), z.lazy(() => InstructorAvailabilityScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  instructorId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  dayOfWeek: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  hours: z.lazy(() => IntNullableListFilterSchema).optional(),
});

export const MagicTokenUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.MagicTokenUpsertWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => MagicTokenWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MagicTokenUpdateWithoutUserInputSchema), z.lazy(() => MagicTokenUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => MagicTokenCreateWithoutUserInputSchema), z.lazy(() => MagicTokenUncheckedCreateWithoutUserInputSchema) ]),
});

export const MagicTokenUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.MagicTokenUpdateWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => MagicTokenWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MagicTokenUpdateWithoutUserInputSchema), z.lazy(() => MagicTokenUncheckedUpdateWithoutUserInputSchema) ]),
});

export const MagicTokenUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.MagicTokenUpdateManyWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => MagicTokenScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MagicTokenUpdateManyMutationInputSchema), z.lazy(() => MagicTokenUncheckedUpdateManyWithoutUserInputSchema) ]),
});

export const MagicTokenScalarWhereInputSchema: z.ZodType<Prisma.MagicTokenScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => MagicTokenScalarWhereInputSchema), z.lazy(() => MagicTokenScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MagicTokenScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MagicTokenScalarWhereInputSchema), z.lazy(() => MagicTokenScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const UserCreateWithoutAvailabilitiesInputSchema: z.ZodType<Prisma.UserCreateWithoutAvailabilitiesInput> = z.strictObject({
  id: z.uuid().optional(),
  phoneNumber: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  instructor: z.lazy(() => UserCreateNestedOneWithoutStudentsInputSchema).optional(),
  students: z.lazy(() => UserCreateNestedManyWithoutInstructorInputSchema).optional(),
  lessonsAsInstructor: z.lazy(() => LessonCreateNestedManyWithoutInstructorInputSchema).optional(),
  lessonsAsStudent: z.lazy(() => LessonCreateNestedManyWithoutStudentInputSchema).optional(),
  magicTokens: z.lazy(() => MagicTokenCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutAvailabilitiesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAvailabilitiesInput> = z.strictObject({
  id: z.uuid().optional(),
  phoneNumber: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  instructorId: z.string().optional().nullable(),
  students: z.lazy(() => UserUncheckedCreateNestedManyWithoutInstructorInputSchema).optional(),
  lessonsAsInstructor: z.lazy(() => LessonUncheckedCreateNestedManyWithoutInstructorInputSchema).optional(),
  lessonsAsStudent: z.lazy(() => LessonUncheckedCreateNestedManyWithoutStudentInputSchema).optional(),
  magicTokens: z.lazy(() => MagicTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutAvailabilitiesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAvailabilitiesInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAvailabilitiesInputSchema), z.lazy(() => UserUncheckedCreateWithoutAvailabilitiesInputSchema) ]),
});

export const UserUpsertWithoutAvailabilitiesInputSchema: z.ZodType<Prisma.UserUpsertWithoutAvailabilitiesInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutAvailabilitiesInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAvailabilitiesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAvailabilitiesInputSchema), z.lazy(() => UserUncheckedCreateWithoutAvailabilitiesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutAvailabilitiesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAvailabilitiesInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAvailabilitiesInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAvailabilitiesInputSchema) ]),
});

export const UserUpdateWithoutAvailabilitiesInputSchema: z.ZodType<Prisma.UserUpdateWithoutAvailabilitiesInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instructor: z.lazy(() => UserUpdateOneWithoutStudentsNestedInputSchema).optional(),
  students: z.lazy(() => UserUpdateManyWithoutInstructorNestedInputSchema).optional(),
  lessonsAsInstructor: z.lazy(() => LessonUpdateManyWithoutInstructorNestedInputSchema).optional(),
  lessonsAsStudent: z.lazy(() => LessonUpdateManyWithoutStudentNestedInputSchema).optional(),
  magicTokens: z.lazy(() => MagicTokenUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutAvailabilitiesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAvailabilitiesInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instructorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  students: z.lazy(() => UserUncheckedUpdateManyWithoutInstructorNestedInputSchema).optional(),
  lessonsAsInstructor: z.lazy(() => LessonUncheckedUpdateManyWithoutInstructorNestedInputSchema).optional(),
  lessonsAsStudent: z.lazy(() => LessonUncheckedUpdateManyWithoutStudentNestedInputSchema).optional(),
  magicTokens: z.lazy(() => MagicTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserCreateWithoutLessonsAsInstructorInputSchema: z.ZodType<Prisma.UserCreateWithoutLessonsAsInstructorInput> = z.strictObject({
  id: z.uuid().optional(),
  phoneNumber: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  instructor: z.lazy(() => UserCreateNestedOneWithoutStudentsInputSchema).optional(),
  students: z.lazy(() => UserCreateNestedManyWithoutInstructorInputSchema).optional(),
  lessonsAsStudent: z.lazy(() => LessonCreateNestedManyWithoutStudentInputSchema).optional(),
  availabilities: z.lazy(() => InstructorAvailabilityCreateNestedManyWithoutInstructorInputSchema).optional(),
  magicTokens: z.lazy(() => MagicTokenCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutLessonsAsInstructorInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutLessonsAsInstructorInput> = z.strictObject({
  id: z.uuid().optional(),
  phoneNumber: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  instructorId: z.string().optional().nullable(),
  students: z.lazy(() => UserUncheckedCreateNestedManyWithoutInstructorInputSchema).optional(),
  lessonsAsStudent: z.lazy(() => LessonUncheckedCreateNestedManyWithoutStudentInputSchema).optional(),
  availabilities: z.lazy(() => InstructorAvailabilityUncheckedCreateNestedManyWithoutInstructorInputSchema).optional(),
  magicTokens: z.lazy(() => MagicTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutLessonsAsInstructorInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutLessonsAsInstructorInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutLessonsAsInstructorInputSchema), z.lazy(() => UserUncheckedCreateWithoutLessonsAsInstructorInputSchema) ]),
});

export const UserCreateWithoutLessonsAsStudentInputSchema: z.ZodType<Prisma.UserCreateWithoutLessonsAsStudentInput> = z.strictObject({
  id: z.uuid().optional(),
  phoneNumber: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  instructor: z.lazy(() => UserCreateNestedOneWithoutStudentsInputSchema).optional(),
  students: z.lazy(() => UserCreateNestedManyWithoutInstructorInputSchema).optional(),
  lessonsAsInstructor: z.lazy(() => LessonCreateNestedManyWithoutInstructorInputSchema).optional(),
  availabilities: z.lazy(() => InstructorAvailabilityCreateNestedManyWithoutInstructorInputSchema).optional(),
  magicTokens: z.lazy(() => MagicTokenCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutLessonsAsStudentInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutLessonsAsStudentInput> = z.strictObject({
  id: z.uuid().optional(),
  phoneNumber: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  instructorId: z.string().optional().nullable(),
  students: z.lazy(() => UserUncheckedCreateNestedManyWithoutInstructorInputSchema).optional(),
  lessonsAsInstructor: z.lazy(() => LessonUncheckedCreateNestedManyWithoutInstructorInputSchema).optional(),
  availabilities: z.lazy(() => InstructorAvailabilityUncheckedCreateNestedManyWithoutInstructorInputSchema).optional(),
  magicTokens: z.lazy(() => MagicTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutLessonsAsStudentInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutLessonsAsStudentInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutLessonsAsStudentInputSchema), z.lazy(() => UserUncheckedCreateWithoutLessonsAsStudentInputSchema) ]),
});

export const UserUpsertWithoutLessonsAsInstructorInputSchema: z.ZodType<Prisma.UserUpsertWithoutLessonsAsInstructorInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutLessonsAsInstructorInputSchema), z.lazy(() => UserUncheckedUpdateWithoutLessonsAsInstructorInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutLessonsAsInstructorInputSchema), z.lazy(() => UserUncheckedCreateWithoutLessonsAsInstructorInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutLessonsAsInstructorInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutLessonsAsInstructorInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutLessonsAsInstructorInputSchema), z.lazy(() => UserUncheckedUpdateWithoutLessonsAsInstructorInputSchema) ]),
});

export const UserUpdateWithoutLessonsAsInstructorInputSchema: z.ZodType<Prisma.UserUpdateWithoutLessonsAsInstructorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instructor: z.lazy(() => UserUpdateOneWithoutStudentsNestedInputSchema).optional(),
  students: z.lazy(() => UserUpdateManyWithoutInstructorNestedInputSchema).optional(),
  lessonsAsStudent: z.lazy(() => LessonUpdateManyWithoutStudentNestedInputSchema).optional(),
  availabilities: z.lazy(() => InstructorAvailabilityUpdateManyWithoutInstructorNestedInputSchema).optional(),
  magicTokens: z.lazy(() => MagicTokenUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutLessonsAsInstructorInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutLessonsAsInstructorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instructorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  students: z.lazy(() => UserUncheckedUpdateManyWithoutInstructorNestedInputSchema).optional(),
  lessonsAsStudent: z.lazy(() => LessonUncheckedUpdateManyWithoutStudentNestedInputSchema).optional(),
  availabilities: z.lazy(() => InstructorAvailabilityUncheckedUpdateManyWithoutInstructorNestedInputSchema).optional(),
  magicTokens: z.lazy(() => MagicTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUpsertWithoutLessonsAsStudentInputSchema: z.ZodType<Prisma.UserUpsertWithoutLessonsAsStudentInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutLessonsAsStudentInputSchema), z.lazy(() => UserUncheckedUpdateWithoutLessonsAsStudentInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutLessonsAsStudentInputSchema), z.lazy(() => UserUncheckedCreateWithoutLessonsAsStudentInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutLessonsAsStudentInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutLessonsAsStudentInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutLessonsAsStudentInputSchema), z.lazy(() => UserUncheckedUpdateWithoutLessonsAsStudentInputSchema) ]),
});

export const UserUpdateWithoutLessonsAsStudentInputSchema: z.ZodType<Prisma.UserUpdateWithoutLessonsAsStudentInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instructor: z.lazy(() => UserUpdateOneWithoutStudentsNestedInputSchema).optional(),
  students: z.lazy(() => UserUpdateManyWithoutInstructorNestedInputSchema).optional(),
  lessonsAsInstructor: z.lazy(() => LessonUpdateManyWithoutInstructorNestedInputSchema).optional(),
  availabilities: z.lazy(() => InstructorAvailabilityUpdateManyWithoutInstructorNestedInputSchema).optional(),
  magicTokens: z.lazy(() => MagicTokenUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutLessonsAsStudentInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutLessonsAsStudentInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instructorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  students: z.lazy(() => UserUncheckedUpdateManyWithoutInstructorNestedInputSchema).optional(),
  lessonsAsInstructor: z.lazy(() => LessonUncheckedUpdateManyWithoutInstructorNestedInputSchema).optional(),
  availabilities: z.lazy(() => InstructorAvailabilityUncheckedUpdateManyWithoutInstructorNestedInputSchema).optional(),
  magicTokens: z.lazy(() => MagicTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserCreateWithoutMagicTokensInputSchema: z.ZodType<Prisma.UserCreateWithoutMagicTokensInput> = z.strictObject({
  id: z.uuid().optional(),
  phoneNumber: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  instructor: z.lazy(() => UserCreateNestedOneWithoutStudentsInputSchema).optional(),
  students: z.lazy(() => UserCreateNestedManyWithoutInstructorInputSchema).optional(),
  lessonsAsInstructor: z.lazy(() => LessonCreateNestedManyWithoutInstructorInputSchema).optional(),
  lessonsAsStudent: z.lazy(() => LessonCreateNestedManyWithoutStudentInputSchema).optional(),
  availabilities: z.lazy(() => InstructorAvailabilityCreateNestedManyWithoutInstructorInputSchema).optional(),
});

export const UserUncheckedCreateWithoutMagicTokensInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutMagicTokensInput> = z.strictObject({
  id: z.uuid().optional(),
  phoneNumber: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  instructorId: z.string().optional().nullable(),
  students: z.lazy(() => UserUncheckedCreateNestedManyWithoutInstructorInputSchema).optional(),
  lessonsAsInstructor: z.lazy(() => LessonUncheckedCreateNestedManyWithoutInstructorInputSchema).optional(),
  lessonsAsStudent: z.lazy(() => LessonUncheckedCreateNestedManyWithoutStudentInputSchema).optional(),
  availabilities: z.lazy(() => InstructorAvailabilityUncheckedCreateNestedManyWithoutInstructorInputSchema).optional(),
});

export const UserCreateOrConnectWithoutMagicTokensInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutMagicTokensInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutMagicTokensInputSchema), z.lazy(() => UserUncheckedCreateWithoutMagicTokensInputSchema) ]),
});

export const UserUpsertWithoutMagicTokensInputSchema: z.ZodType<Prisma.UserUpsertWithoutMagicTokensInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutMagicTokensInputSchema), z.lazy(() => UserUncheckedUpdateWithoutMagicTokensInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutMagicTokensInputSchema), z.lazy(() => UserUncheckedCreateWithoutMagicTokensInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutMagicTokensInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutMagicTokensInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutMagicTokensInputSchema), z.lazy(() => UserUncheckedUpdateWithoutMagicTokensInputSchema) ]),
});

export const UserUpdateWithoutMagicTokensInputSchema: z.ZodType<Prisma.UserUpdateWithoutMagicTokensInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instructor: z.lazy(() => UserUpdateOneWithoutStudentsNestedInputSchema).optional(),
  students: z.lazy(() => UserUpdateManyWithoutInstructorNestedInputSchema).optional(),
  lessonsAsInstructor: z.lazy(() => LessonUpdateManyWithoutInstructorNestedInputSchema).optional(),
  lessonsAsStudent: z.lazy(() => LessonUpdateManyWithoutStudentNestedInputSchema).optional(),
  availabilities: z.lazy(() => InstructorAvailabilityUpdateManyWithoutInstructorNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutMagicTokensInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutMagicTokensInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  instructorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  students: z.lazy(() => UserUncheckedUpdateManyWithoutInstructorNestedInputSchema).optional(),
  lessonsAsInstructor: z.lazy(() => LessonUncheckedUpdateManyWithoutInstructorNestedInputSchema).optional(),
  lessonsAsStudent: z.lazy(() => LessonUncheckedUpdateManyWithoutStudentNestedInputSchema).optional(),
  availabilities: z.lazy(() => InstructorAvailabilityUncheckedUpdateManyWithoutInstructorNestedInputSchema).optional(),
});

export const UserCreateManyInstructorInputSchema: z.ZodType<Prisma.UserCreateManyInstructorInput> = z.strictObject({
  id: z.uuid().optional(),
  phoneNumber: z.string().optional().nullable(),
  passwordHash: z.string().optional().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
});

export const LessonCreateManyInstructorInputSchema: z.ZodType<Prisma.LessonCreateManyInstructorInput> = z.strictObject({
  id: z.uuid().optional(),
  studentId: z.string(),
  startTime: z.coerce.date(),
  durationMin: z.number().int().optional(),
  status: z.lazy(() => LessonStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
});

export const LessonCreateManyStudentInputSchema: z.ZodType<Prisma.LessonCreateManyStudentInput> = z.strictObject({
  id: z.uuid().optional(),
  instructorId: z.string(),
  startTime: z.coerce.date(),
  durationMin: z.number().int().optional(),
  status: z.lazy(() => LessonStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
});

export const InstructorAvailabilityCreateManyInstructorInputSchema: z.ZodType<Prisma.InstructorAvailabilityCreateManyInstructorInput> = z.strictObject({
  id: z.uuid().optional(),
  dayOfWeek: z.number().int(),
  hours: z.union([ z.lazy(() => InstructorAvailabilityCreatehoursInputSchema), z.number().int().array() ]).optional(),
});

export const MagicTokenCreateManyUserInputSchema: z.ZodType<Prisma.MagicTokenCreateManyUserInput> = z.strictObject({
  id: z.uuid().optional(),
  token: z.uuid().optional(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
});

export const UserUpdateWithoutInstructorInputSchema: z.ZodType<Prisma.UserUpdateWithoutInstructorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  students: z.lazy(() => UserUpdateManyWithoutInstructorNestedInputSchema).optional(),
  lessonsAsInstructor: z.lazy(() => LessonUpdateManyWithoutInstructorNestedInputSchema).optional(),
  lessonsAsStudent: z.lazy(() => LessonUpdateManyWithoutStudentNestedInputSchema).optional(),
  availabilities: z.lazy(() => InstructorAvailabilityUpdateManyWithoutInstructorNestedInputSchema).optional(),
  magicTokens: z.lazy(() => MagicTokenUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutInstructorInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutInstructorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  students: z.lazy(() => UserUncheckedUpdateManyWithoutInstructorNestedInputSchema).optional(),
  lessonsAsInstructor: z.lazy(() => LessonUncheckedUpdateManyWithoutInstructorNestedInputSchema).optional(),
  lessonsAsStudent: z.lazy(() => LessonUncheckedUpdateManyWithoutStudentNestedInputSchema).optional(),
  availabilities: z.lazy(() => InstructorAvailabilityUncheckedUpdateManyWithoutInstructorNestedInputSchema).optional(),
  magicTokens: z.lazy(() => MagicTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateManyWithoutInstructorInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutInstructorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordHash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const LessonUpdateWithoutInstructorInputSchema: z.ZodType<Prisma.LessonUpdateWithoutInstructorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  durationMin: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => LessonStatusSchema), z.lazy(() => EnumLessonStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  student: z.lazy(() => UserUpdateOneRequiredWithoutLessonsAsStudentNestedInputSchema).optional(),
});

export const LessonUncheckedUpdateWithoutInstructorInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateWithoutInstructorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  durationMin: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => LessonStatusSchema), z.lazy(() => EnumLessonStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const LessonUncheckedUpdateManyWithoutInstructorInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateManyWithoutInstructorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  durationMin: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => LessonStatusSchema), z.lazy(() => EnumLessonStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const LessonUpdateWithoutStudentInputSchema: z.ZodType<Prisma.LessonUpdateWithoutStudentInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  durationMin: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => LessonStatusSchema), z.lazy(() => EnumLessonStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  instructor: z.lazy(() => UserUpdateOneRequiredWithoutLessonsAsInstructorNestedInputSchema).optional(),
});

export const LessonUncheckedUpdateWithoutStudentInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateWithoutStudentInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  instructorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  durationMin: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => LessonStatusSchema), z.lazy(() => EnumLessonStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const LessonUncheckedUpdateManyWithoutStudentInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateManyWithoutStudentInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  instructorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  durationMin: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => LessonStatusSchema), z.lazy(() => EnumLessonStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const InstructorAvailabilityUpdateWithoutInstructorInputSchema: z.ZodType<Prisma.InstructorAvailabilityUpdateWithoutInstructorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hours: z.union([ z.lazy(() => InstructorAvailabilityUpdatehoursInputSchema), z.number().int().array() ]).optional(),
});

export const InstructorAvailabilityUncheckedUpdateWithoutInstructorInputSchema: z.ZodType<Prisma.InstructorAvailabilityUncheckedUpdateWithoutInstructorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hours: z.union([ z.lazy(() => InstructorAvailabilityUpdatehoursInputSchema), z.number().int().array() ]).optional(),
});

export const InstructorAvailabilityUncheckedUpdateManyWithoutInstructorInputSchema: z.ZodType<Prisma.InstructorAvailabilityUncheckedUpdateManyWithoutInstructorInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hours: z.union([ z.lazy(() => InstructorAvailabilityUpdatehoursInputSchema), z.number().int().array() ]).optional(),
});

export const MagicTokenUpdateWithoutUserInputSchema: z.ZodType<Prisma.MagicTokenUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const MagicTokenUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.MagicTokenUncheckedUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const MagicTokenUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.MagicTokenUncheckedUpdateManyWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

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

export const InstructorAvailabilityFindFirstArgsSchema: z.ZodType<Prisma.InstructorAvailabilityFindFirstArgs> = z.object({
  select: InstructorAvailabilitySelectSchema.optional(),
  include: InstructorAvailabilityIncludeSchema.optional(),
  where: InstructorAvailabilityWhereInputSchema.optional(), 
  orderBy: z.union([ InstructorAvailabilityOrderByWithRelationInputSchema.array(), InstructorAvailabilityOrderByWithRelationInputSchema ]).optional(),
  cursor: InstructorAvailabilityWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InstructorAvailabilityScalarFieldEnumSchema, InstructorAvailabilityScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const InstructorAvailabilityFindFirstOrThrowArgsSchema: z.ZodType<Prisma.InstructorAvailabilityFindFirstOrThrowArgs> = z.object({
  select: InstructorAvailabilitySelectSchema.optional(),
  include: InstructorAvailabilityIncludeSchema.optional(),
  where: InstructorAvailabilityWhereInputSchema.optional(), 
  orderBy: z.union([ InstructorAvailabilityOrderByWithRelationInputSchema.array(), InstructorAvailabilityOrderByWithRelationInputSchema ]).optional(),
  cursor: InstructorAvailabilityWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InstructorAvailabilityScalarFieldEnumSchema, InstructorAvailabilityScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const InstructorAvailabilityFindManyArgsSchema: z.ZodType<Prisma.InstructorAvailabilityFindManyArgs> = z.object({
  select: InstructorAvailabilitySelectSchema.optional(),
  include: InstructorAvailabilityIncludeSchema.optional(),
  where: InstructorAvailabilityWhereInputSchema.optional(), 
  orderBy: z.union([ InstructorAvailabilityOrderByWithRelationInputSchema.array(), InstructorAvailabilityOrderByWithRelationInputSchema ]).optional(),
  cursor: InstructorAvailabilityWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InstructorAvailabilityScalarFieldEnumSchema, InstructorAvailabilityScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const InstructorAvailabilityAggregateArgsSchema: z.ZodType<Prisma.InstructorAvailabilityAggregateArgs> = z.object({
  where: InstructorAvailabilityWhereInputSchema.optional(), 
  orderBy: z.union([ InstructorAvailabilityOrderByWithRelationInputSchema.array(), InstructorAvailabilityOrderByWithRelationInputSchema ]).optional(),
  cursor: InstructorAvailabilityWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const InstructorAvailabilityGroupByArgsSchema: z.ZodType<Prisma.InstructorAvailabilityGroupByArgs> = z.object({
  where: InstructorAvailabilityWhereInputSchema.optional(), 
  orderBy: z.union([ InstructorAvailabilityOrderByWithAggregationInputSchema.array(), InstructorAvailabilityOrderByWithAggregationInputSchema ]).optional(),
  by: InstructorAvailabilityScalarFieldEnumSchema.array(), 
  having: InstructorAvailabilityScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const InstructorAvailabilityFindUniqueArgsSchema: z.ZodType<Prisma.InstructorAvailabilityFindUniqueArgs> = z.object({
  select: InstructorAvailabilitySelectSchema.optional(),
  include: InstructorAvailabilityIncludeSchema.optional(),
  where: InstructorAvailabilityWhereUniqueInputSchema, 
}).strict();

export const InstructorAvailabilityFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.InstructorAvailabilityFindUniqueOrThrowArgs> = z.object({
  select: InstructorAvailabilitySelectSchema.optional(),
  include: InstructorAvailabilityIncludeSchema.optional(),
  where: InstructorAvailabilityWhereUniqueInputSchema, 
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

export const MagicTokenFindFirstArgsSchema: z.ZodType<Prisma.MagicTokenFindFirstArgs> = z.object({
  select: MagicTokenSelectSchema.optional(),
  include: MagicTokenIncludeSchema.optional(),
  where: MagicTokenWhereInputSchema.optional(), 
  orderBy: z.union([ MagicTokenOrderByWithRelationInputSchema.array(), MagicTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: MagicTokenWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MagicTokenScalarFieldEnumSchema, MagicTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const MagicTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MagicTokenFindFirstOrThrowArgs> = z.object({
  select: MagicTokenSelectSchema.optional(),
  include: MagicTokenIncludeSchema.optional(),
  where: MagicTokenWhereInputSchema.optional(), 
  orderBy: z.union([ MagicTokenOrderByWithRelationInputSchema.array(), MagicTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: MagicTokenWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MagicTokenScalarFieldEnumSchema, MagicTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const MagicTokenFindManyArgsSchema: z.ZodType<Prisma.MagicTokenFindManyArgs> = z.object({
  select: MagicTokenSelectSchema.optional(),
  include: MagicTokenIncludeSchema.optional(),
  where: MagicTokenWhereInputSchema.optional(), 
  orderBy: z.union([ MagicTokenOrderByWithRelationInputSchema.array(), MagicTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: MagicTokenWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MagicTokenScalarFieldEnumSchema, MagicTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const MagicTokenAggregateArgsSchema: z.ZodType<Prisma.MagicTokenAggregateArgs> = z.object({
  where: MagicTokenWhereInputSchema.optional(), 
  orderBy: z.union([ MagicTokenOrderByWithRelationInputSchema.array(), MagicTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: MagicTokenWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const MagicTokenGroupByArgsSchema: z.ZodType<Prisma.MagicTokenGroupByArgs> = z.object({
  where: MagicTokenWhereInputSchema.optional(), 
  orderBy: z.union([ MagicTokenOrderByWithAggregationInputSchema.array(), MagicTokenOrderByWithAggregationInputSchema ]).optional(),
  by: MagicTokenScalarFieldEnumSchema.array(), 
  having: MagicTokenScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const MagicTokenFindUniqueArgsSchema: z.ZodType<Prisma.MagicTokenFindUniqueArgs> = z.object({
  select: MagicTokenSelectSchema.optional(),
  include: MagicTokenIncludeSchema.optional(),
  where: MagicTokenWhereUniqueInputSchema, 
}).strict();

export const MagicTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MagicTokenFindUniqueOrThrowArgs> = z.object({
  select: MagicTokenSelectSchema.optional(),
  include: MagicTokenIncludeSchema.optional(),
  where: MagicTokenWhereUniqueInputSchema, 
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

export const InstructorAvailabilityCreateArgsSchema: z.ZodType<Prisma.InstructorAvailabilityCreateArgs> = z.object({
  select: InstructorAvailabilitySelectSchema.optional(),
  include: InstructorAvailabilityIncludeSchema.optional(),
  data: z.union([ InstructorAvailabilityCreateInputSchema, InstructorAvailabilityUncheckedCreateInputSchema ]),
}).strict();

export const InstructorAvailabilityUpsertArgsSchema: z.ZodType<Prisma.InstructorAvailabilityUpsertArgs> = z.object({
  select: InstructorAvailabilitySelectSchema.optional(),
  include: InstructorAvailabilityIncludeSchema.optional(),
  where: InstructorAvailabilityWhereUniqueInputSchema, 
  create: z.union([ InstructorAvailabilityCreateInputSchema, InstructorAvailabilityUncheckedCreateInputSchema ]),
  update: z.union([ InstructorAvailabilityUpdateInputSchema, InstructorAvailabilityUncheckedUpdateInputSchema ]),
}).strict();

export const InstructorAvailabilityCreateManyArgsSchema: z.ZodType<Prisma.InstructorAvailabilityCreateManyArgs> = z.object({
  data: z.union([ InstructorAvailabilityCreateManyInputSchema, InstructorAvailabilityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const InstructorAvailabilityCreateManyAndReturnArgsSchema: z.ZodType<Prisma.InstructorAvailabilityCreateManyAndReturnArgs> = z.object({
  data: z.union([ InstructorAvailabilityCreateManyInputSchema, InstructorAvailabilityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const InstructorAvailabilityDeleteArgsSchema: z.ZodType<Prisma.InstructorAvailabilityDeleteArgs> = z.object({
  select: InstructorAvailabilitySelectSchema.optional(),
  include: InstructorAvailabilityIncludeSchema.optional(),
  where: InstructorAvailabilityWhereUniqueInputSchema, 
}).strict();

export const InstructorAvailabilityUpdateArgsSchema: z.ZodType<Prisma.InstructorAvailabilityUpdateArgs> = z.object({
  select: InstructorAvailabilitySelectSchema.optional(),
  include: InstructorAvailabilityIncludeSchema.optional(),
  data: z.union([ InstructorAvailabilityUpdateInputSchema, InstructorAvailabilityUncheckedUpdateInputSchema ]),
  where: InstructorAvailabilityWhereUniqueInputSchema, 
}).strict();

export const InstructorAvailabilityUpdateManyArgsSchema: z.ZodType<Prisma.InstructorAvailabilityUpdateManyArgs> = z.object({
  data: z.union([ InstructorAvailabilityUpdateManyMutationInputSchema, InstructorAvailabilityUncheckedUpdateManyInputSchema ]),
  where: InstructorAvailabilityWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const InstructorAvailabilityUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.InstructorAvailabilityUpdateManyAndReturnArgs> = z.object({
  data: z.union([ InstructorAvailabilityUpdateManyMutationInputSchema, InstructorAvailabilityUncheckedUpdateManyInputSchema ]),
  where: InstructorAvailabilityWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const InstructorAvailabilityDeleteManyArgsSchema: z.ZodType<Prisma.InstructorAvailabilityDeleteManyArgs> = z.object({
  where: InstructorAvailabilityWhereInputSchema.optional(), 
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

export const MagicTokenCreateArgsSchema: z.ZodType<Prisma.MagicTokenCreateArgs> = z.object({
  select: MagicTokenSelectSchema.optional(),
  include: MagicTokenIncludeSchema.optional(),
  data: z.union([ MagicTokenCreateInputSchema, MagicTokenUncheckedCreateInputSchema ]),
}).strict();

export const MagicTokenUpsertArgsSchema: z.ZodType<Prisma.MagicTokenUpsertArgs> = z.object({
  select: MagicTokenSelectSchema.optional(),
  include: MagicTokenIncludeSchema.optional(),
  where: MagicTokenWhereUniqueInputSchema, 
  create: z.union([ MagicTokenCreateInputSchema, MagicTokenUncheckedCreateInputSchema ]),
  update: z.union([ MagicTokenUpdateInputSchema, MagicTokenUncheckedUpdateInputSchema ]),
}).strict();

export const MagicTokenCreateManyArgsSchema: z.ZodType<Prisma.MagicTokenCreateManyArgs> = z.object({
  data: z.union([ MagicTokenCreateManyInputSchema, MagicTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const MagicTokenCreateManyAndReturnArgsSchema: z.ZodType<Prisma.MagicTokenCreateManyAndReturnArgs> = z.object({
  data: z.union([ MagicTokenCreateManyInputSchema, MagicTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const MagicTokenDeleteArgsSchema: z.ZodType<Prisma.MagicTokenDeleteArgs> = z.object({
  select: MagicTokenSelectSchema.optional(),
  include: MagicTokenIncludeSchema.optional(),
  where: MagicTokenWhereUniqueInputSchema, 
}).strict();

export const MagicTokenUpdateArgsSchema: z.ZodType<Prisma.MagicTokenUpdateArgs> = z.object({
  select: MagicTokenSelectSchema.optional(),
  include: MagicTokenIncludeSchema.optional(),
  data: z.union([ MagicTokenUpdateInputSchema, MagicTokenUncheckedUpdateInputSchema ]),
  where: MagicTokenWhereUniqueInputSchema, 
}).strict();

export const MagicTokenUpdateManyArgsSchema: z.ZodType<Prisma.MagicTokenUpdateManyArgs> = z.object({
  data: z.union([ MagicTokenUpdateManyMutationInputSchema, MagicTokenUncheckedUpdateManyInputSchema ]),
  where: MagicTokenWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const MagicTokenUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.MagicTokenUpdateManyAndReturnArgs> = z.object({
  data: z.union([ MagicTokenUpdateManyMutationInputSchema, MagicTokenUncheckedUpdateManyInputSchema ]),
  where: MagicTokenWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const MagicTokenDeleteManyArgsSchema: z.ZodType<Prisma.MagicTokenDeleteManyArgs> = z.object({
  where: MagicTokenWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();