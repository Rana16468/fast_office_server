
import { NextFunction, Request, Response } from "express";

import catchAsync from "../utility/catchAsync";
import jwt, { JwtPayload } from 'jsonwebtoken';

import httpStatus from "http-status";
import { TUser } from "../module/User/user.interface";
import AppError from "../app/error/AppError";
import config from "../app/config";
import { users } from "../module/User/user.model";

const auth=(...requireRoles:TUser[])=>{

    return catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
        const token=req.headers.authorization;
        if(!token)
        {
            throw new AppError(httpStatus.UNAUTHORIZED,'You are not Authorized','')
        }

        let decoded;
        try{
            decoded = jwt.verify(token, config.jwt_access_srcret as string) as JwtPayload;
        }
        catch(error)
        {
            throw new AppError(httpStatus.UNAUTHORIZED,'Unauthorized','');
            
        }

       const {email,role}=decoded;
       const isUserExist=users.findOne({email});
       if(!isUserExist)
       {
        throw new AppError(httpStatus.NOT_FOUND,'This User is Not Founded','')
       }
       if(requireRoles && !requireRoles.includes(role))
        {
            throw new AppError(httpStatus.UNAUTHORIZED,'Yout Role Not Exist','') 
        }
        req.user=decoded as JwtPayload


        next();

    })
}

export default auth;