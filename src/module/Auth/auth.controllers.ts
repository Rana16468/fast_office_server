import { RequestHandler } from "express";
import catchAsync from "../../utility/catchAsync";
import { AuthService } from "./auth.services";
import sendRespone from "../../utility/sendRespone";
import httpStatus from "http-status";




const  createValidationToken:RequestHandler=catchAsync(async(req,res)=>{

    const result=await  AuthService.createValidationTokenIntoDb(req.body);
    sendRespone(res,{success:true,statusCode:httpStatus.CREATED,message:"Sucessfulled Create Token",data:result});

});

export const AuthController={
    createValidationToken
}