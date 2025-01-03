import express from 'express';
import { ContractController } from './contract.controller';
import validationRequest from '../../middleware/validationRequest';
import { ContractValidation } from './contract.zod.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';

const router= express.Router();

router.post('/', auth(USER_ROLE.USER,USER_ROLE.ADMIN,USER_ROLE.EMPLOYEE),validationRequest(ContractValidation.ContractValidationSchema),ContractController.createContract);
router.get("/",auth(USER_ROLE.ADMIN,USER_ROLE.EMPLOYEE),ContractController.AllContract);
router.get('/:id',auth(USER_ROLE.ADMIN,USER_ROLE.EMPLOYEE),ContractController.SpecificContractId);
router.patch("/:id",auth(USER_ROLE.ADMIN,USER_ROLE.EMPLOYEE),validationRequest(ContractValidation.UpdateContractValidationSchema),ContractController.UpdateContract);
router.delete("/:id",auth(USER_ROLE.ADMIN,USER_ROLE.EMPLOYEE),ContractController.DeleteContract);
router.patch("/favorite/:id",auth(USER_ROLE.ADMIN,USER_ROLE.EMPLOYEE),ContractController.FavoriteContrcat);
export const ContructRouter=router;