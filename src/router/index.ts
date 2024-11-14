import express from 'express';
import { ContructRouter } from '../module/contract.routes';


const router=express.Router();
const moduleRouth=[
    {path:'/contract',route:ContructRouter},
  
    
]

moduleRouth.forEach((v)=>router.use(v.path,v.route));

export default router;