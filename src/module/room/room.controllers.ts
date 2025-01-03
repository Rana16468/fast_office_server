import { RequestHandler } from "express";
import catchAsync from "../../utility/catchAsync";
import { RoomServices } from "./room.services";
import sendRespone from "../../utility/sendRespone";
import httpStatus from "http-status";


const create_room:RequestHandler=catchAsync(async(req,res)=>{
    
    const result=await RoomServices.create_room_IntoDb(req.body,req.user.id);
    sendRespone(res,{success:true,statusCode:httpStatus.CREATED,message:"Successfully Create Room",data:result});

});

 const findAllRoom:RequestHandler=catchAsync(async(req,res)=>{
    const result=await RoomServices.findAllRoomFromDb(req.params);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find Room",data:result});
 });

 const  findSpecificRoom:RequestHandler=catchAsync(async(req,res)=>{
    const result=await RoomServices.findSpecificRoomFromDb(req.params.id);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find Specific Room",data:result});

 });

 


export const RoomController={
    create_room,
    findAllRoom,
    findSpecificRoom,
    
}