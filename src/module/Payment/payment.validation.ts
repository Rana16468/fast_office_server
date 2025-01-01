// name:string;
// email:string;
// address:string;
// amount:number;
// contractNumber:string;

import { strict } from 'assert';
import {z} from 'zod';


const TPaymentValidationSchema=z.object({
    body:z.object({
        categorieId:z.string({required_error:"name is required"}),
        productdetailsId:z.string({required_error:"name is required"}),
        email:z.string({required_error:"email is required"}),
        address:z.string({required_error:"address is required"}),
        phone:z.string({required_error:"phonenumber is required"}),
        ipaddress:z.string({required_error:"ip address  is required"})
    })
});

export const PaymentValdation={
    TPaymentValidationSchema
}