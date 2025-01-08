import express from 'express';
import validationRequest from '../../middleware/validationRequest';
import { OfficeValidationSchema } from './officecategorie.validation';
import { OfficeCategorieController } from './officecategorie.controllers';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';



const router= express.Router();

router.post('/create_office_categorie',auth(USER_ROLE.ADMIN),validationRequest(OfficeValidationSchema.TOfficeCategorieSchema),OfficeCategorieController.CreateNewOfficeCategorie);
router.get("/get_all_office_categorie",auth(USER_ROLE.EMPLOYEE,USER_ROLE.ADMIN,USER_ROLE.USER),OfficeCategorieController.GetAllShoesOfficeCategorie);
router.get("/get_specific_office_categorie/:id",auth(USER_ROLE.EMPLOYEE,USER_ROLE.ADMIN,USER_ROLE.USER), OfficeCategorieController.GetSpecificOfficesCategorie);
router.patch("/update_office_categorie/:id",auth(USER_ROLE.ADMIN),validationRequest(OfficeValidationSchema.TUpdateOfficeCategorieSchema),OfficeCategorieController.UpdateOfficeCategorie);
router.delete("/delete_office_categorie/:id",auth(USER_ROLE.ADMIN),OfficeCategorieController.DeleteOfficeCategorie);
// selling-product
router.get("/get_all_selling_office_categorie",auth(USER_ROLE.ADMIN,USER_ROLE.EMPLOYEE,USER_ROLE.USER), OfficeCategorieController.GetAllSelleingOfficeCategorie);
router.get("/get_specific_office_selling_categorie/:id",auth(USER_ROLE.ADMIN,USER_ROLE.EMPLOYEE,USER_ROLE.USER),OfficeCategorieController.GetSpecificSellingOfficeCategorie);
router.post("/ai_base_costbenefit_analysis",validationRequest(OfficeValidationSchema.AiAnalysisSchema),OfficeCategorieController.AiBaseCostBenefitAnalysis);
export const OfficeCategorieRouter=router;