import { RequestHandler } from "express";
import catchAsync from "../../utility/catchAsync";
import { AuthService } from "./auth.services";
import sendRespone from "../../utility/sendRespone";
import httpStatus from "http-status";




const  createValidationToken:RequestHandler=catchAsync(async(req,res)=>{

    const result=await  AuthService.createValidationTokenIntoDb(req.body);
    sendRespone(res,{success:true,statusCode:httpStatus.CREATED,message:"Sucessfulled Create Token",data:result});

});

const  updateMyProfile:RequestHandler=catchAsync(async(req,res)=>{

    const data=req.body;
    const {id}=req.user;
    const result=await AuthService.updateMyProfileFromDb(data,id);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Sucessfulled Update Profile",data:result});
});

const chnageUserRoleStatus:RequestHandler=catchAsync(async(req,res)=>{


    const {userId}=req.params;
    const data=req.body;
    const result=await AuthService.chnageUserRoleStatusFromDb(userId,data);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Chnage User Status",data:result});
});

const  specificUserRoll:RequestHandler=catchAsync(async(req,res)=>{
    
    const {id}=req.user;
    const result=await AuthService.specificUserRollIntoDb(id);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find User Roll",data:result});
})




export const AuthController={
    createValidationToken,
    updateMyProfile,
    chnageUserRoleStatus,
    specificUserRoll
}