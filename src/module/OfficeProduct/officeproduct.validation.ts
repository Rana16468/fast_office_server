import { z } from 'zod';

// Zod validation schemas

const TDesktopConfigurationSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  model: z.string({ required_error: 'Model is required' }),
  processor: z.string({ required_error: 'Processor is required' }),
  ram: z.string({ required_error: 'RAM is required' }),
  storage: z.string({ required_error: 'Storage is required' }),
  display: z.string({ required_error: 'Display is required' }),
  features: z.string({ required_error: 'Features are required' }),
});

const TUpdateDesktopConfigurationSchema = z.object({
    name: z.string({ required_error: 'Name is required' }).optional(),
    model: z.string({ required_error: 'Model is required' }).optional(),
    processor: z.string({ required_error: 'Processor is required' }).optional(),
    ram: z.string({ required_error: 'RAM is required' }).optional(),
    storage: z.string({ required_error: 'Storage is required' }).optional(),
    display: z.string({ required_error: 'Display is required' }).optional(),
    features: z.string({ required_error: 'Features are required' }).optional(),
  }).optional();

const TLaptopConfigurationSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  processor: z.string({ required_error: 'Processor is required' }),
  ram: z.string({ required_error: 'RAM is required' }),
  storage: z.string({ required_error: 'Storage is required' }),
  display: z.string({ required_error: 'Display is required' }),
  battery: z.string({ required_error: 'Battery is required' }),
});

const TUpdareLaptopConfigurationSchema = z.object({
    name: z.string({ required_error: 'Name is required' }).optional(),
    processor: z.string({ required_error: 'Processor is required' }).optional(),
    ram: z.string({ required_error: 'RAM is required' }).optional(),
    storage: z.string({ required_error: 'Storage is required' }).optional(),
    display: z.string({ required_error: 'Display is required' }).optional(),
    battery: z.string({ required_error: 'Battery is required' }).optional(),
  }).optional();

const TProjectorConfigurationSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  model: z.string({ required_error: 'Model is required' }),
  brightness: z.string({ required_error: 'Brightness is required' }),
  lamplife: z.string({ required_error: 'Lamp life is required' }),
  contrast_ratio: z.string({ required_error: 'Contrast ratio is required' }),
});
const TUpdateProjectorConfigurationSchema = z.object({
    name: z.string({ required_error: 'Name is required' }).optional(),
    model: z.string({ required_error: 'Model is required' }).optional(),
    brightness: z.string({ required_error: 'Brightness is required' }).optional(),
    lamplife: z.string({ required_error: 'Lamp life is required' }).optional(),
    contrast_ratio: z.string({ required_error: 'Contrast ratio is required' }).optional(),
  }).optional();

const TPrinterConfigurationSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  features: z.string({ required_error: 'Features are required' }),
  printspeed: z.string({ required_error: 'Print speed is required' }),
  connectivity: z.string({ required_error: 'Connectivity is required' }),
});

const TUpdatePrinterConfigurationSchema = z.object({
    name: z.string({ required_error: 'Name is required' }).optional(),
    features: z.string({ required_error: 'Features are required' }).optional(),
    printspeed: z.string({ required_error: 'Print speed is required' }).optional(),
    connectivity: z.string({ required_error: 'Connectivity is required' }).optional(),
  }).optional();
  

const TACConfigurationSchema = z.object({
  brand: z.string({ required_error: 'Brand is required' }),
  capacity: z.string({ required_error: 'Capacity is required' }),
  energy_rating: z.string().optional(),
  features: z.string({ required_error: 'Features are required' }),
  power_consumption: z.string().optional(),
});

const TUpdateACConfigurationSchema = z.object({
    brand: z.string({ required_error: 'Brand is required' }).optional(),
    capacity: z.string({ required_error: 'Capacity is required' }).optional(),
    energy_rating: z.string().optional(),
    features: z.string({ required_error: 'Features are required' }).optional(),
    power_consumption: z.string().optional(),
  }).optional();

const TProductSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  quantity: z.number({ required_error: 'Quantity is required' }),
  description: z.string({ required_error: 'Description is required' }),
  image: z.string({ required_error: 'Image is required' }),
});

const TUpdateProductSchema = z.object({
    name: z.string({ required_error: 'Name is required' }).optional(),
    quantity: z.number({ required_error: 'Quantity is required' }).optional(),
    description: z.string({ required_error: 'Description is required' }).optional(),
    image: z.string({ required_error: 'Image is required' }).optional(),
  })

const TRoomSchema = z.object({
  roomname: z.string({ required_error: 'Room name is required' }),
  image: z.string({ required_error: 'Image is required' }),
});

const TUpdateRoomSchema = z.object({
    roomname: z.string({ required_error: 'Room name is required' }).optional(),
    image: z.string({ required_error: 'Image is required' }).optional(),
  }).optional();

const TOfficeInfrastructureSchema = z.object({

  body: z.object({
    officecategorieId:z.string({required_error:"officecategorieId is required"}),
    furniture: z.string({ required_error: 'Furniture is required' }),
    furnitureproduct: TProductSchema,
    desk: z.string({ required_error: 'Desk is required' }),
    deskproduct: TProductSchema,
    electronics: z.string({ required_error: 'Electronics are required' }),
    electronicsproduct: TProductSchema.extend({
      desktopconfigration: TDesktopConfigurationSchema,
    }),
    laptopproduct: TProductSchema.extend({
      laptopconfigration: TLaptopConfigurationSchema,
    }),
    projector: z.string({ required_error: 'Projector is required' }),
    projectorproduct: TProductSchema.extend({
      projectorconfigration: TProjectorConfigurationSchema,
    }),
    officesupplies: z.string({
      required_error: 'Office supplies are required',
    }),
    officesuppliesproduct: TProductSchema,
    printerproduct: TProductSchema.extend({
      printerconfigration: TPrinterConfigurationSchema,
    }),
    stationery: z.string({ required_error: 'Stationery is required' }),
    stationeryproduct: TProductSchema,
    ac: z.string({ required_error: 'AC is required' }),
    acproduct: TProductSchema.extend({
      acconfigration: TACConfigurationSchema,
    }),
    officeinfastructure: z.array(TRoomSchema, {
      required_error: 'Office infrastructure is required',
    }),
  }),
});

const TUpdateOfficeInfrastructureSchema = z.object({

    body: z.object({
      officecategorieId:z.string({required_error:"officecategorieId is required"}).optional(),
      furniture: z.string({ required_error: 'Furniture is required' }).optional(),
      furnitureproduct:  TUpdateProductSchema.optional(),
      desk: z.string({ required_error: 'Desk is required' }).optional(),
      deskproduct:  TUpdateProductSchema.optional(),
      electronics: z.string({ required_error: 'Electronics are required' }).optional(),
      electronicsproduct: TUpdateProductSchema.extend({
        desktopconfigration: TUpdateDesktopConfigurationSchema.optional(),
      }).optional(),
      laptopproduct: TUpdateProductSchema.extend({
        laptopconfigration: TLaptopConfigurationSchema.optional(),
      }).optional(),
      projector: z.string({ required_error: 'Projector is required' }).optional(),
      projectorproduct: TUpdateProductSchema.extend({
        projectorconfigration: TUpdateProjectorConfigurationSchema,
      }).optional(),
      officesupplies: z.string({
        required_error: 'Office supplies are required',
      }).optional(),
      officesuppliesproduct: TUpdateProductSchema.optional(),
      printerproduct: TUpdateProductSchema.extend({
        printerconfigration: TUpdatePrinterConfigurationSchema.optional(),
      }).optional(),
      stationery: z.string({ required_error: 'Stationery is required' }).optional(),
      stationeryproduct: TUpdateProductSchema.optional(),
      ac: z.string({ required_error: 'AC is required' }).optional(),
      acproduct: TUpdateProductSchema.extend({
        acconfigration: TUpdateACConfigurationSchema.optional(),
      }),
      officeinfastructure: z.array(TUpdateRoomSchema.optional(), {
        required_error: 'Office infrastructure is required',
      }).optional(),
    }),
  });

export const OfficeProductValidation = {
  TOfficeInfrastructureSchema,
  TUpdateOfficeInfrastructureSchema
};
