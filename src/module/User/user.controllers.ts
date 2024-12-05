import { RequestHandler } from "express";
import catchAsync from "../../utility/catchAsync";
import { UserService } from "./user.services";
import sendRespone from "../../utility/sendRespone";
import httpStatus from "http-status";


const createContract:RequestHandler=catchAsync(async(req,res)=>{

    const result=await UserService.createUserIntoDb(req.body);
    sendRespone(res,{success:true,statusCode:httpStatus.CREATED,message:"Sucessfulled Create Account",data:result});


});

const  myprofile:RequestHandler=catchAsync(async(req,res)=>{

    const {id}=req.user;
    const result=await UserService.myprofileIntoDb(id);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Sucessfulled Find My Profile",data:result});
})


export const UserController={
    createContract,
    myprofile
}