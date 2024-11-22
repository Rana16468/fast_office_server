

import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import { USER_ROLE } from "./user.constant";

// Define the TSales schema
const TUserSchema = new Schema({

    name: {
        type: String,
        required: [true,'name is Required']
    },
    email: {
        type: String,
        unique:true,
        required: [false,'Email is Not Required']
    },
    password: {
        type: String,
        required: [true,'password is Required'], select:0
    },
    photo : {
        type: String,
        required: [false,'photo is Required']
    },
     role:{
         type:String,
         enum:{
             values:[USER_ROLE.Admin,USER_ROLE.Employee,USER_ROLE.User],
              message:'{VALUE} is Not Required'
            }
           },
    os:{
        type:String,
        required: [true,'os is Required']
     },
     browser:{
        type:String,
         require:[true,'browser is Required']
     },
     creationTime:{
        type:String,
        require:[true,'creationTime is Required']
     },
     device:{
        type:String,
        require:[true,'device is required']
     },
     districtName:{
        type:String,
        require:[true,'districtName is required']
     },
     isVerify:{
        type: Boolean,
        required: true,
        default: false
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
TUserSchema .pre('find',function(next){
    this.find({ isDelete:{$ne:true}})
    next();
  });
  TUserSchema.pre('aggregate',function(next){

    this.pipeline().unshift({$match:{isDelete:{$ne:true}}})
    next();
  });
 TUserSchema.pre('findOne',function(next){
  
    this.find({ isDelete:{$ne:true}})
  
    next();
  })

// Export the model
export const users=model<TUser>('users',TUserSchema)
