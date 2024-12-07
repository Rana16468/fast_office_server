import { model, Schema } from "mongoose";
import { OfficeCategorieModal, TOfficeCategorie } from "./officecategorie.interfaces";
import { CURRENCY, OFFICE_CATEGORIE } from "./officecategorie.constant";

const TOfficeCategorieSchema = new Schema<TOfficeCategorie,OfficeCategorieModal>({

    squareFootage: {
        type: Number,
        required: [true,'Number is Required']
    },
    location: {
        type: String,
        required: [true,'Location is Not Required']
    },
    currency: {
        type: String,
        enum:{
            values:[CURRENCY.BDT,CURRENCY.USD],
            message:'{VALUE} is Not Required'
        }
        
    },
    amount : {
        type: Number,
        required: [true,'Number is Required']
    },
    office_categorie:{
         type:String,
         enum:{
             values:[OFFICE_CATEGORIE.Basic,OFFICE_CATEGORIE.Minimalist,OFFICE_CATEGORIE.Luxury,OFFICE_CATEGORIE.DIY,OFFICE_CATEGORIE.Frugal,OFFICE_CATEGORIE.Bootstrapped,OFFICE_CATEGORIE.BareBones],
              message:'{VALUE} is Not Required'
            }
           },
    maplocation:{
        type:String,
        required: [true,'maplocation is Required']
     },
    
    isDelete: {
        type: Boolean,
        required: true,
        default: false
    }
   
},{
    timestamps:true
});

  // midlewere 
TOfficeCategorieSchema.pre('find',function(next){
    this.find({ isDelete:{$ne:true}})
    next();
  });
  TOfficeCategorieSchema.pre('aggregate',function(next){

    this.pipeline().unshift({$match:{isDelete:{$ne:true}}})
    next();
  });
  TOfficeCategorieSchema.pre('findOne',function(next){
  
    this.find({ isDelete:{$ne:true}})
  
    next();
  });

  TOfficeCategorieSchema.statics.isOfficeCategorieExist=async function(id:string)
{
    return await officecategories.findById(id);
}

// Export the model

export const officecategories=model<TOfficeCategorie,OfficeCategorieModal>('officecategories',TOfficeCategorieSchema)


