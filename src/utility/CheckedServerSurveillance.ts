
import httpStatus from "http-status";

import { payments } from "../module/Payment/payment.model";
import AppError from "../app/error/AppError";

const CheckedPaymentSurveillance=async()=>{
    try{
       
        await payments.deleteMany({payment:false});

    }
    catch(error){
        throw new AppError(
            httpStatus.BAD_REQUEST,
            'Failed Payment Collection Checked',
            '',
          );
    }
}

export const CheckedServerSurveillance={
    CheckedPaymentSurveillance
}