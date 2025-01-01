



import express from 'express';


import validationRequest from '../../middleware/validationRequest';
import { AuthSchema } from './auth.zod.validation';
import { AuthController } from './auth.controllers';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';

const router= express.Router();

router.post('/token',validationRequest(AuthSchema.TAuthScehema),AuthController.createValidationToken);
router.patch("/update_profile",auth(USER_ROLE.ADMIN,USER_ROLE.EMPLOYEE,USER_ROLE.USER),validationRequest(AuthSchema.TUpdateProfileSchema),AuthController.updateMyProfile)
router.patch("/chnage_role_status/:userId",auth(USER_ROLE.ADMIN),validationRequest(AuthSchema.TUpdateUserStatusSchema),AuthController.chnageUserRoleStatus);
router.get("/my_roll",auth(USER_ROLE.ADMIN,USER_ROLE.EMPLOYEE,USER_ROLE.USER),AuthController.specificUserRoll);
router.get('/all_users', auth(USER_ROLE.ADMIN), AuthController.findAllUsers);

export const AuthRouter=router;