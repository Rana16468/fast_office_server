import express from 'express';

import validationRequest from '../../middleware/validationRequest';

import { UserValidation } from './user.zod.validation';
import { UserController } from './user.controllers';

const router= express.Router();

router.post('/',validationRequest(UserValidation.TUserZodSchema),UserController.createContract);

export const UserRouter=router;