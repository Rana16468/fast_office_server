import { z } from 'zod';
import { CURRENCY, OFFICE_CATEGORIE } from './officecategorie.constant';

const CURRENCYSCHEMA = z.enum([CURRENCY.USD, CURRENCY.BDT]);
const OFFICE_CATEGORIE_SCHEMA = z.enum([
  OFFICE_CATEGORIE.Basic,
  OFFICE_CATEGORIE.Minimalist,
  OFFICE_CATEGORIE.Luxury,
  OFFICE_CATEGORIE.DIY,
  OFFICE_CATEGORIE.Bootstrapped,
  OFFICE_CATEGORIE.BareBones,
  OFFICE_CATEGORIE.Frugal,
]);

// Create the Zod validation schema
const TOfficeCategorieSchema = z.object({
  body: z.object({
    squareFootage: z
      .number({
        required_error: 'Number is required',
      })
      .min(1, 'Square footage must be a positive number'), // Optional additional validation for positive numbers
    location: z.string({ required_error: 'Location is required' }),
    currency: CURRENCYSCHEMA,
    amount: z
      .number({
        required_error: 'Number is required',
      })
      .min(1, 'Amount must be a positive number'), // Optional additional validation for positive numbers
    office_categorie: OFFICE_CATEGORIE_SCHEMA,
    maplocation: z
      .string({
        required_error: 'Map location is required',
      })
      .url('Map location must be a valid URL'), // Optional additional validation for URLs
    isDelete: z.boolean().default(false),
  }),
});

// update validation


const TUpdateOfficeCategorieSchema = z.object({
    body: z
      .object({
        squareFootage: z
          .number({
            required_error: 'Number is required',
          })
          .min(1, 'Square footage must be a positive number')
          .optional(), // Optional additional validation for positive numbers
        location: z
          .string({ required_error: 'Location is required' })
          .optional(),
        currency: CURRENCYSCHEMA.optional(),
        amount: z
          .number({
            required_error: 'Number is required',
          })
          .min(1, 'Amount must be a positive number')
          .optional(), // Optional additional validation for positive numbers
        office_categorie: OFFICE_CATEGORIE_SCHEMA.optional(),
        maplocation: z
          .string({
            required_error: 'Map location is required',
          })
          .url('Map location must be a valid URL')
          .optional(), // Optional additional validation for URLs
        isDelete: z.boolean().default(false).optional(),
      })
      .optional(),
  });

  const AiAnalysisSchema=z.object({
      body:z.object({
        prompt:z.string({required_error:"promt is required"})
      })
  });
  

export const OfficeValidationSchema = {
  TOfficeCategorieSchema,
  TUpdateOfficeCategorieSchema,
  AiAnalysisSchema
};
