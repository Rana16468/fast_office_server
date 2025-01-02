import { RequestHandler } from "express";
import catchAsync from "../../utility/catchAsync";
import { OfficeCategorieServices } from "./officecategorie.services";
import httpStatus from "http-status";
import sendRespone from "../../utility/sendRespone";

const  CreateNewOfficeCategorie:RequestHandler=catchAsync(async(req,res)=>{

    const data=req.body;

    const result=await OfficeCategorieServices.CreateNewOfficeCategorieIntoDb(data);
  
    sendRespone(res,{success:true,statusCode:httpStatus.CREATED,message:"Create Categorie",data:result});

});

const  GetAllShoesOfficeCategorie:RequestHandler=catchAsync(async(req,res)=>{
   
    const result=await OfficeCategorieServices.GetAllOfficeCategorieFromDb(req.query);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find",data:result});
});

const GetAllSelleingOfficeCategorie:RequestHandler=catchAsync(async(req,res)=>{
    const result=await OfficeCategorieServices.GetAllSelleingOfficeCategorieFromDb(req.query);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Find All Selling Product",data:result});
})

const  GetSpecificOfficesCategorie:RequestHandler=catchAsync(async(req,res)=>{

    const {id}=req.params;
    const result=await OfficeCategorieServices.GetSpecificOfficesCategorieFromDb(id);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find Specific Categorie",data:result});
});

const GetSpecificSellingOfficeCategorie:RequestHandler=catchAsync(async(req,res)=>{
    const result=await OfficeCategorieServices.GetSpecificSellingOfficeCategorieFromDb(req.params.id);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find Selling Specific Categorie",data:result});
})

const  UpdateOfficeCategorie:RequestHandler=catchAsync(async(req,res)=>{

    const {id}=req.params;
    const data=req.body;
    const result=await OfficeCategorieServices.UpdateOfficeCategorieFromDb(id,data);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Update Categorie",data:result});
});

const  DeleteOfficeCategorie:RequestHandler=catchAsync(async(req,res)=>{
    const result=await OfficeCategorieServices.DeleteOfficeCategorieFromDb(req.params.id);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Delete Categorie",data:result});
})

export const OfficeCategorieController={
    CreateNewOfficeCategorie,
    GetAllShoesOfficeCategorie,
    GetSpecificOfficesCategorie,
    UpdateOfficeCategorie,
    DeleteOfficeCategorie,
    GetAllSelleingOfficeCategorie,
    GetSpecificSellingOfficeCategorie
}