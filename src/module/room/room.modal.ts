import { Query, Schema,PipelineStage, model } from "mongoose";
import { TMeetingRoom,MettingRoomModal } from "./room.interface";

const TMeetingRoomSchema: Schema<TMeetingRoom,MettingRoomModal> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
    categorieId: { type: Schema.Types.ObjectId, required: true, ref: 'officecategories' },
    roomId: { type: Number, required: true, unique: true },
    isDelete: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  });

  TMeetingRoomSchema.pre<Query<any, any>>("find", function (next) {
      const options = this.getOptions(); // Get custom options
      if (!options?.includeDeleted) {
        this.find({ isDelete: { $ne: true } });
      }
      next();
    });
    
    
    
    TMeetingRoomSchema.pre("aggregate", function (next) {
      const pipelineOptions = this.pipeline();
      if (
        !pipelineOptions.find(
          (stage): stage is PipelineStage.Match => "$match" in stage && stage.$match?.isDeleted !== undefined
        )
      ) {
        this.pipeline().unshift({ $match: { isDelete: { $ne: true } } });
      }
    
      next();
    });
    
    TMeetingRoomSchema.pre<Query<any, any>>("findOne", function (next) {
      const options = this.getOptions();
      if (!options?.includeDeleted) {
        this.find({ isDelete: { $ne: true } });
      }
      next();
    });


  TMeetingRoomSchema.statics.isMeetingRoomExist = async function (id: string): Promise<TMeetingRoom | null> {
    return this.findById(id);
  };

  export const rooms = model<TMeetingRoom,MettingRoomModal >('rooms',TMeetingRoomSchema);
  
  