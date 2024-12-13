import { model, Schema } from "mongoose";
import {
  OfficeProductModal,
  TOfficeInfrastructure,
  TDesktopConfiguration,
  TLaptopConfiguration,
  TProjectorConfiguration,
  TPrinterConfiguration,
  TACConfiguration,
  TRoom,
  Product,
} from "./officeproduct.interface";

// Configuration Schemas
const DesktopConfigurationSchema = new Schema<TDesktopConfiguration>({
  name: { type: String, required: [true, "Name is required"] },
  model: { type: String, required: [true, "Model is required"] },
  processor: { type: String, required: [true, "Processor is required"] },
  ram: { type: String, required: [true, "RAM is required"] },
  storage: { type: String, required: [true, "Storage is required"] },
  display: { type: String, required: [true, "Display is required"] },
  features: { type: String, required: [true, "Features are required"] },
});

const LaptopConfigurationSchema = new Schema<TLaptopConfiguration>({
  name: { type: String, required: [true, "Name is required"] },
  processor: { type: String, required: [true, "Processor is required"] },
  ram: { type: String, required: [true, "RAM is required"] },
  storage: { type: String, required: [true, "Storage is required"] },
  display: { type: String, required: [true, "Display is required"] },
  battery: { type: String, required: [true, "Battery is required"] },
});

const ProjectorConfigurationSchema = new Schema<TProjectorConfiguration>({
  name: { type: String, required: [true, "Name is required"] },
  model: { type: String, required: [true, "Model is required"] },
  brightness: { type: String, required: [true, "Brightness is required"] },
  lamplife: { type: String, required: [true, "Lamp life is required"] },
  contrast_ratio: { type: String, required: [true, "Contrast ratio is required"] },
});

const PrinterConfigurationSchema = new Schema<TPrinterConfiguration>({
  name: { type: String, required: [true, "Name is required"] },
  features: { type: String, required: [true, "Features are required"] },
  printspeed: { type: String, required: [true, "Print speed is required"] },
  connectivity: { type: String, required: [true, "Connectivity is required"] },
});

const ACConfigurationSchema = new Schema<TACConfiguration>({
  brand: { type: String, required: [true, "Brand is required"] },
  capacity: { type: String, required: [true, "Capacity is required"] },
  energy_rating: { type: String },
  features: { type: String, required: [true, "Features are required"] },
  power_consumption: { type: String },
});

// Product Schema
const ProductSchema = new Schema<Product>({
  name: { type: String, required: [true, "Name is required"] },
  quantity: { type: Number, required: [true, "Quantity is required"] },
  description: { type: String, required: [true, "Description is required"] },
  image: { type: String, required: [true, "Image is required"] },
});

// Room Schema
const RoomSchema = new Schema<TRoom>({
  roomname: { type: String, required: [true, "Room name is required"] },
  image: { type: String, required: [true, "Image is required"] },
});

// Main Office Infrastructure Schema
const OfficeInfrastructureSchema = new Schema<TOfficeInfrastructure, OfficeProductModal>(
  {
    officecategorieId:{type:Schema.Types.ObjectId,required:[true,'officecategorieId is Required'],ref:'officecategories'},
    furniture: { type: String, required: [true, "Furniture is required"] },
    furnitureproduct: { type: ProductSchema, required: [true, "Furniture product is required"] },
    desk: { type: String, required: [true, "Desk is required"] },
    deskproduct: { type: ProductSchema, required: [true, "Desk product is required"] },
    electronics: { type: String, required: [true, "Electronics are required"] },
    electronicsproduct: {
      ...ProductSchema.obj,
      desktopconfigration: { type: DesktopConfigurationSchema, required: true },
    },
    laptopproduct: {
      ...ProductSchema.obj,
      laptopconfigration: { type: LaptopConfigurationSchema, required: true },
    },
    projector: { type: String, required: [true, "Projector is required"] },
    projectorproduct: {
      ...ProductSchema.obj,
      projectorconfigration: { type: ProjectorConfigurationSchema, required: true },
    },
    officesupplies: { type: String, required: [true, "Office supplies are required"] },
    officesuppliesproduct: { type: ProductSchema, required: [true, "Office supplies product is required"] },
    printerproduct: {
      ...ProductSchema.obj,
      printerconfigration: { type: PrinterConfigurationSchema, required: true },
    },
    stationery: { type: String, required: [true, "Stationery is required"] },
    stationeryproduct: { type: ProductSchema, required: [true, "Stationery product is required"] },
    ac: { type: String, required: [true, "AC is required"] },
    acproduct: {
      ...ProductSchema.obj,
      acconfigration: { type: ACConfigurationSchema, required: true },
    },
    officeinfastructure: { type: [RoomSchema], required: [true, "Office infrastructure is required"] },
  },
  { timestamps: true }
);

// Middleware
OfficeInfrastructureSchema.pre("find", function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

OfficeInfrastructureSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

OfficeInfrastructureSchema.statics.isOfficeProductExist = async function (id: string) {
  return this.findById(id);
};

export const officeproducts = model<TOfficeInfrastructure, OfficeProductModal>(
  " officeproducts",
  OfficeInfrastructureSchema
);
