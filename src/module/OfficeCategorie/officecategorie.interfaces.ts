import { Model } from "mongoose";
import { CURRENCY, OFFICE_CATEGORIE } from "./officecategorie.constant";

export type OfficeCategorieList='Basic' | 'Minimalist' | 'Luxury' | 'Bootstrapped' | 'DIY' | 'Bare Bones' | 'Frugal'

export type TOfficeCategorie={

    squareFootage:number;
    location:string;
    currency:'USD' | 'BDT';
    amount:number;
    office_categorie: OfficeCategorieList,
    maplocation:string,
    isDelete?:boolean;

}

export interface OfficeCategorieModal extends Model<TOfficeCategorie> {
    // eslint-disable-next-line no-unused-vars
    isOfficeCategorieExist(id:string):Promise<TOfficeCategorie>,
    
  
  }

export type OfficeCategorie=keyof typeof OFFICE_CATEGORIE;
export type Currency=keyof typeof CURRENCY;
