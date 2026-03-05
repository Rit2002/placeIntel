const { z } = require('zod');
const { ROUND_TYPE, DIFFICULTY_LEVEL } = require('../utils/constants');
const objectId = require('mongoose').Types.ObjectId;

const academicsSchema = z.object({
    minCgpa:        z.number().min(0).max(10),
    maxBacklogs:    z.number().min(0).max(40).default(0),
    tenthPercent:   z.number().min(0).max(100),
    twelthPercent:  z.number().min(0).max(100),
    degreePercent:  z.number().min(0).max(100)
});

const educationSchema = z.object({
    allowedDegrees: z.array(z.string().trim()).min(1),
    allowedBranches: z.array(z.string().trim()).min(1),
    graduationYears: z.array(z.number()).optional()
});

const eligibilitySchema = z.object({
    academics: academicsSchema,
    education: educationSchema,
    additionalContraints: z.object({
        gapYearAllowed: z.number().default(0)
    }).optional()
});

const roleSchema = z.object({
    title: z.string().trim().min(1, 'Job title not found'),
    type: z.enum(['Intern', 'Full Time', 'Contract'], {
        message: 'type must be Intern, Full Time, or Contract'
    }),
    ctc: z.number().positive('CTC must be a positive number'),
    eligibility: eligibilitySchema
});


const roundSchema = z.object({
    name: z.string().min(1),
    type: z.enum(Object.values(ROUND_TYPE)),
    description: z.string().trim().optional(),
    order: z.number().int().positive(),
    durationMinutes: z.number().int().positive(),
    difficulty: z.enum(Object.values(DIFFICULTY_LEVEL)).optional(),
    topics: z.array(z.string())
});


const hiringCreateSchema = z.object({
    companyId: z.string().refine(val => objectId.isValid(val), {
        message: 'Invalid company id'
    }),
    roles: z.array(roleSchema).min(1, 'roles must not be empty'),
    rounds: z.array(roundSchema).optional(),
    year: z.number().int({ message: 'Year of visit not present' })
});

const hiringDeleteSchema = z.object({
    id: z.string().refine( val => objectId.isValid(val), {
        message: 'Invalid hiring id'
    })
});

const hiringUpdateSchema = hiringCreateSchema.partial().refine(
    data => Object.keys(data).length > 0,
    { message : 'At least one field must be provided for update' }
);

const hiringParamSchema = z.object({
    id: z.string().refine( val => objectId.isValid(val), {
        message: 'Invalid hiring id'
    })
})

module.exports = {
    hiringCreateSchema,
    hiringDeleteSchema,
    hiringUpdateSchema,
    hiringParamSchema
}