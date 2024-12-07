import { OfficeCategorieList } from "./officecategorie.interfaces";

export const OFFICE_CATEGORIE={
    Basic:'Basic',
    Minimalist:'Minimalist',
    Luxury:"Luxury",
    Bootstrapped:"Bootstrapped",
    DIY:'DIY',
    BareBones:'Bare Bones',
    Frugal:'Frugal'
} as const ;


export const CURRENCY={
    USD:'USD',
    BDT:'BDT'
}




export const  material: OfficeCategorieList[]=['Basic' , 'Minimalist' , 'Luxury' , 'Bootstrapped' , 'DIY' , 'Bare Bones' , 'Frugal'];
export  const excludeField = ['squareFootage','location', 'currency','amount','office_categorie'];