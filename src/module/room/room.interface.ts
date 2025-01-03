import { Model, Types } from "mongoose";

export type TMeetingRoom={

    name:string;
    email:string;
    userId:Types.ObjectId;
    categorieId:Types.ObjectId;
    roomId:number;
    isDelete:boolean;
 
};

export interface MettingRoomModal extends Model<TMeetingRoom> {
  
  isMettingRoomExist(id: string): Promise<TMeetingRoom>;
}



