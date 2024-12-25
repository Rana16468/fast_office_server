


import express from'express';
import validationRequest from '../../middleware/validationRequest';
import { OfficeProductValidation } from './officeproduct.validation';
import { OfficeProductController } from './officeproduct.controllers';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';


const router=express.Router();

router.post("/create_office_product",auth(USER_ROLE.ADMIN),validationRequest(OfficeProductValidation.TOfficeInfrastructureSchema),OfficeProductController.CreateOfficeProduct);
router.get("/specific_office_infastructure/:officecategorieId",auth(USER_ROLE.USER,USER_ROLE.EMPLOYEE,USER_ROLE.ADMIN),OfficeProductController.Find_Specific_Office_Infastructure);
router.get("/find_all_office_infastructure",auth(USER_ROLE.USER,USER_ROLE.EMPLOYEE,USER_ROLE.ADMIN),OfficeProductController.FindAll_Office_Infastructure);
router.get("/find_specific_office_infastructure/:id",auth(USER_ROLE.USER,USER_ROLE.EMPLOYEE,USER_ROLE.ADMIN),OfficeProductController.Find_Speciifc_Office_Infastructure_ById);
router.patch("/update_specific_office_infastructure/:id",auth(USER_ROLE.ADMIN),validationRequest(OfficeProductValidation.TUpdateOfficeInfrastructureSchema),OfficeProductController.UpdateOffice_Infastructure_FormDb);
router.delete("/delete_office_infastructure/:id",auth(USER_ROLE.ADMIN),OfficeProductController.Delete_Office_Infastructure);
router.get("/find_office_categorie_infastructure/:categorie_name",auth(USER_ROLE.USER,USER_ROLE.EMPLOYEE,USER_ROLE.ADMIN),OfficeProductController.Office_Categorie_Infastructure);
router.get("/find_specific_office_gallery/:officeproductId",auth(USER_ROLE.USER,USER_ROLE.EMPLOYEE,USER_ROLE.ADMIN),OfficeProductController.Find_Specific_Office_Gallery);


export const OfficeProductRouter=router;
