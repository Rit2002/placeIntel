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

// this simply means copy the validation of createUserSchema to update schema but except email(do not need to update) & .partial() means validate only if they are provided by user
const updateUserSchema = createUserSchema
    .omit({ email: true })
    .partial();

const signInSchema = z.object({
    email : baseEmail,
    password : basePassword            
});


module.exports = {
    createUserSchema,
    updateUserSchema,
    signInSchema
}