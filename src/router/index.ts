import express from 'express';
import { ContructRouter } from '../module/Contract/contract.routes';
import { UserRouter } from '../module/User/user.routes';
import { AuthRouter } from '../module/Auth/auth.routes';
import { OfficeCategorieRouter } from '../module/OfficeCategorie/officecategorie.routes';
import { OfficeProductRouter } from '../module/OfficeProduct/officeproduct.routes';
import { PaymentRouter } from '../module/Payment/payment.routes';


const router=express.Router();
const moduleRouth=[


    {path:"/user", route:UserRouter},
    {path:"/auth", route: AuthRouter},
    {path:"/office_categorie",route:OfficeCategorieRouter},
    {path:"/office_product",route:OfficeProductRouter},
    {path:'/contract',route:ContructRouter},
    {path:"/payment",route:PaymentRouter}
  
    
]

moduleRouth.forEach((v)=>router.use(v.path,v.route));

export default router;