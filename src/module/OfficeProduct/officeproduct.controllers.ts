import { RequestHandler } from "express";
import catchAsync from "../../utility/catchAsync";
import sendRespone from "../../utility/sendRespone";
import httpStatus from "http-status";
import { OfficeProductServices } from "./officeproduct.services";




const CreateOfficeProduct:RequestHandler=catchAsync(async(req,res)=>{

    const result=await OfficeProductServices.CreateOfficeProductIntoDb(req.body);
    sendRespone(res,{success:true,statusCode:httpStatus.CREATED,message:"Successfully Reecorded",data:result});

});

const Find_Specific_Office_Infastructure:RequestHandler=catchAsync(async(req,res)=>{
    const result=await OfficeProductServices.Find_Specific_Office_Infastructure_FormDb(req.params.officecategorieId,req.params);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find",data:result});
});

const FindAll_Office_Infastructure:RequestHandler=catchAsync(async(req,res)=>{
    const result=await OfficeProductServices.FindAll_Office_Infastructure_FormDb();
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find",data:result});

});

const Find_Speciifc_Office_Infastructure_ById:RequestHandler=catchAsync(async(req,res)=>{

    const result=await OfficeProductServices.Find_Speciifc_Office_Infastructure_ById_FromDb(req.params.id);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find Specific Infastructure",data:result});

});

const UpdateOffice_Infastructure_FormDb:RequestHandler=catchAsync(async(req,res)=>{

    const result=await OfficeProductServices.UpdateOffice_Infastructure_FormDb(req.body,req.params.id);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Update  Infastructure",data:result});

});

const Delete_Office_Infastructure:RequestHandler=catchAsync(async(req,res)=>{

    const result=await OfficeProductServices.Delete_Office_Infastructure_FromDb(req.params.id);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Delete",data:result});
});

const  Office_Categorie_Infastructure:RequestHandler=catchAsync(async(req,res)=>{

    const result=await OfficeProductServices.Office_Categorie_Infastructure_FromDb(req.params.categorie_name);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Fine Categorie Infastructure",data:result});

});



export const OfficeProductController={
    CreateOfficeProduct,
    Find_Specific_Office_Infastructure,
    FindAll_Office_Infastructure,
    Find_Speciifc_Office_Infastructure_ById,
    UpdateOffice_Infastructure_FormDb,
    Delete_Office_Infastructure,
    Office_Categorie_Infastructure
}