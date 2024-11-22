



import express from 'express';


import validationRequest from '../../middleware/validationRequest';
import { AuthSchema } from './auth.zod.validation';
import { AuthController } from './auth.controllers';

const router= express.Router();

router.post('/token',validationRequest(AuthSchema.TAuthScehema),AuthController.createValidationToken);

export const AuthRouter=router;