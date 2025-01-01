import { Model, Types } from "mongoose";


// Define configurations for specific products
export interface TDesktopConfiguration {
    name: string;
    model: string;
    processor: string;
    ram: string;
    storage: string;
    display: string;
    features: string;
}

export interface TLaptopConfiguration {
    name: string;
    processor: string;
    ram: string;
    storage: string;
    display: string;
    battery: string;
}

export interface TProjectorConfiguration {
    name: string;
    model: string;
    brightness: string;
    lamplife: string;
    contrast_ratio: string;
}

export interface TPrinterConfiguration {
    name: string;
    features: string;
    printspeed: string;
    connectivity: string;
}

export interface TACConfiguration {
    brand: string;
    capacity: string;
    energy_rating: string;
    features: string;
    power_consumption: string;
}

// Define a generic product interface
export interface Product {
    name: string;
    quantity: number;
    description: string;
    image: string;
}

// Define a room interface
export interface TRoom {
    roomname: string;
    image: string;
}

// Define the main office infrastructure interface
export interface TOfficeInfrastructure {
    officecategorieId:Types.ObjectId;
    furniture: string;
    furnitureproduct: Product;
    desk: string;
    deskproduct: Product;
    electronics: string;
    electronicsproduct: Product & { desktopconfigration: TDesktopConfiguration };
    laptopproduct: Product & { laptopconfigration: TLaptopConfiguration };
    projector: string;
    projectorproduct: Product & { projectorconfigration: TProjectorConfiguration };
    officesupplies: string;
    officesuppliesproduct: Product;
    printerproduct: Product & { printerconfigration: TPrinterConfiguration };
    stationery: string;
    stationeryproduct: Product;
    ac: string;
    acproduct: Product & { acconfigration: TACConfiguration };
    officeinfastructure: TRoom[];
    isDeleteted?:Boolean
}





  export interface OfficeProductModal extends Model<TOfficeInfrastructure> {
    // eslint-disable-next-line no-unused-vars
    isOfficeProductExist(id:string):Promise<TOfficeInfrastructure>,
    

  }