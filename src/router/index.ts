import express from 'express';
import { ContructRouter } from '../module/Contract/contract.routes';
import { UserRouter } from '../module/User/user.routes';
import { AuthRouter } from '../module/Auth/auth.routes';


const router=express.Router();
const moduleRouth=[


    {path:"/user", route:UserRouter},
    {path:"/auth", route: AuthRouter},
    {path:'/contract',route:ContructRouter},
  
    
]

moduleRouth.forEach((v)=>router.use(v.path,v.route));

export default router;