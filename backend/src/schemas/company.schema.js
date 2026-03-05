const { z } = require('zod');
const { INDUSTRY_TYPE } = require('../utils/constants');
const objectId = require('mongoose').Types.ObjectId;

const companyCreateSchema = z.object({
  name: z.string({ required_error : 'name is required' }).trim(), 

  description: z.string({ required_error : 'description is required' }).trim(),

  website: z.string().trim(),

  industryType: z.enum(Object.values(INDUSTRY_TYPE), {
    message: 'Invalid industry type'
  }),

  foundedYear: z.number().int().min(1900).max(new Date().getFullYear()),

  headquaters: z.string().trim().optional(),
  
  active: z.boolean().optional()

});

const companyUpdateSchema = companyCreateSchema.partial().refine(
    data => Object.keys(data).length > 0,
    { message : 'At least one field must be provided for update' }
);

const companyParamSchema = z.object({
    id: z.string().refine( val => objectId.isValid(val), {
      message: 'Invalid company id'
    })
});


module.exports = {
  companyCreateSchema,
  companyUpdateSchema,
  companyParamSchema
}