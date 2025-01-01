import express from 'express';

import validationRequest from '../../middleware/validationRequest';

import { UserValidation } from './user.zod.validation';
import { UserController } from './user.controllers';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';

const router= express.Router();

router.post('/',validationRequest(UserValidation.TUserZodSchema),UserController.createContract);
router.get("/myprofile",auth(USER_ROLE.ADMIN,USER_ROLE.EMPLOYEE,USER_ROLE.USER),UserController.myprofile);



export const UserRouter=router;