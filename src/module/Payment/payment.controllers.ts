import { RequestHandler } from "express";
import catchAsync from "../../utility/catchAsync";
import { PaymentServices } from "./payment.services";
import sendRespone from "../../utility/sendRespone";
import httpStatus from "http-status";




const PaymentGetWay:RequestHandler=catchAsync(async(req,res)=>{

    const {id}=req.user;
    const data=req.body;
    const result=await  PaymentServices.PaymentGetWayFromDb(data,id);
    sendRespone(res,{success:true,statusCode:httpStatus.CREATED,message:"Sucessfulled Recorded",data:result});

});
const FindAllPaymentList:RequestHandler=catchAsync(async(req,res)=>{
    const result=await PaymentServices.FindAllPaymentListFromDb(req.query);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find All Payment",data:result});
    
});

const FindAllPaymentListAdmin:RequestHandler=catchAsync(async(req,res)=>{

    const result=await PaymentServices.FindAllPaymentListAdminFromDb(req.query);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find All Payment",data:result});

});

const UpdatePaymentStatus:RequestHandler=catchAsync(async(req,res)=>{
    const result=await PaymentServices.UpdatePaymentStatusFromDb(req.params.transactionId);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Update Payment Status",data:result});
});

const FailedPaymentStatusDelete:RequestHandler=catchAsync(async(req,res)=>{
    const result=await PaymentServices.FailedPaymentStatusDeleteFromDb(req.params.transactionId);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Delete Payment Status",data:result});
});

const  Find_My_Payment_Payment_Laser:RequestHandler=catchAsync(async(req,res)=>{
    const result=await PaymentServices.Find_My_Payment_Payment_Laser_FromDb(req.user.id);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find My Payment Lease",data:result});

});

const UserDashboard:RequestHandler=catchAsync(async(req,res)=>{
    const result=await PaymentServices.UserDashboardFormDb(req.user.id);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find User Dashboard",data:result});
});
const AdminDashboard:RequestHandler=catchAsync(async(req,res)=>{
    const result=await PaymentServices.AdminDashboardFormDb();
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find Admin Dashboard",data:result});
});


export const PaymentController={
    PaymentGetWay,
    FindAllPaymentList,
    FindAllPaymentListAdmin,
    UpdatePaymentStatus,
    FailedPaymentStatusDelete,
    Find_My_Payment_Payment_Laser,
    UserDashboard,
    AdminDashboard


}