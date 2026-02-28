const { z } = require('zod');

const baseEmail = z.
    email({ 
        required_error : 'Email is required',
        message : 'Please enter valid email'
    })
    .toLowerCase()
    .trim()

const basePassword = z
    .string({ message : 'Password required' })
    .min(8, 'Password must be at least 8 characters')

const createUserSchema = z.object({
    firstName: z
        .string({ required_error: 'first name is required'})
        .min(3, 'first name must be at least 3 characters')
        .max(20, 'first name must be at most 20 characters')
        .trim(),

    lastName: z
        .string()
        .min(3, 'Last name must be at least 3 characters')
        .max(20, 'Last name must be at most 20 characters')
        .trim()
        .optional(),

    email: baseEmail,

    password: basePassword

});

const studentRegisterSchema = createUserSchema.extend({
    branch: z
        .string({ required_error : 'branch is required' })
        .min(2, 'Branch must be at least 2 characters')
        .max(15, 'Branch must be at max 10 characters')
        .trim(),

    year: z.enum(['1', '2', '3', '4'], {
        required_error : 'Year is required'
    })
});

const tpoRegisterSchema = createUserSchema.extend({
    department: z
        .string({ required_error : 'department is required' })
        .min(2, 'Branch must be at least 2 characters')
        .max(15, 'Branch must be at max 10 characters')
        .trim()
})

// this simply means copy the validation of createUserSchema to update schema but except email(do not need to update) & .partial() means validate only if they are provided by user
const updateUserSchema = createUserSchema
    .omit({ email: true })
    .partial();

const signInSchema = z.object({
    email : baseEmail,
    password : basePassword            
});


module.exports = {
    studentRegisterSchema,
    tpoRegisterSchema,
    updateUserSchema,
    signInSchema
}