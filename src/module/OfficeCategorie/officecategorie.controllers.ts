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

const  GetSpecificOfficesCategorie:RequestHandler=catchAsync(async(req,res)=>{

    const {id}=req.params;
    const result=await OfficeCategorieServices.GetSpecificOfficesCategorieFromDb(id);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Find Specific Categorie",data:result});
});

const  UpdateOfficeCategorie:RequestHandler=catchAsync(async(req,res)=>{

    const {id}=req.params;
    const data=req.body;
    const result=await OfficeCategorieServices.UpdateOfficeCategorieFromDb(id,data);
    sendRespone(res,{success:true,statusCode:httpStatus.OK,message:"Successfully Update Categorie",data:result});
})

export const OfficeCategorieController={
    CreateNewOfficeCategorie,
    GetAllShoesOfficeCategorie,
    GetSpecificOfficesCategorie,
    UpdateOfficeCategorie
}