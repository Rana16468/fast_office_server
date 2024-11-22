import httpStatus from "http-status";
import AppError from "../../app/error/AppError";
import { users } from "../User/user.model";
import { TAuth } from "./auth.interface";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../../app/config";
import { jwtHalpers } from "../../app/jwtHealpers/jwtHealpers";


const createValidationTokenIntoDb=async(payload:TAuth)=>{

    const isUserExits=await users.findOne({email:payload.email},{
        email:true,
        _id:true,role:true,isVerify:true
    });
    const jwtPayload={
        id:isUserExits?.id,
        role:isUserExits?.role,
        email:isUserExits?.email
    }

    if(isUserExits?.isVerify){

        const accessToken= jwtHalpers.generateToken(jwtPayload,config.jwt_access_srcret as string, config.expries_in_token as string);
        return accessToken;
    }
    else{

        const verified=await users.findOneAndUpdate(isUserExits?._id,{isVerify:true},{new:true,upsert:true});
       if(!verified){
        throw new AppError(httpStatus.UNAUTHORIZED,'varified issues','');

       }
       const accessToken= jwtHalpers.generateToken(jwtPayload,config.jwt_access_srcret as string, config.expries_in_token as string);
        return accessToken;
    }
}
export const AuthService={
    createValidationTokenIntoDb
}