import { model, Query, Schema,PipelineStage } from 'mongoose';
import { PaymentModal, TPayment } from './payment.interface';

const TPaymentSchema = new Schema<TPayment, PaymentModal>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, 'User Id is Required'],
      ref: 'users',
    },
    categorieId: {
      type: Schema.Types.ObjectId,
      required: [true, 'categorie Id'],
      ref: 'officecategories',
    },
    productdetailsId: {
      type: Schema.Types.ObjectId,
      required: [true, 'productdetailsId  is Required'],
      ref: ' officeproducts',
    },
    email: { type: String, required: [true, 'email is required'] },
    address: { type: String, required: [true, 'address is required'] },
    phone: { type: String, required: [true, 'amount is required'] },
    price: { type: Number, required: [true, 'price is required'] },
    ipaddress: { type: String, required: [true, 'ip address is required'] },
    transactionId: { type: String, required: true },
    payment: {
      type: Boolean,
      default: false,
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// // midlewere
// TPaymentSchema.pre('find', function (next) {
//   this.find({ isDelete: { $ne: true } });
//   next();
// });
// TPaymentSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { isDelete: { $ne: true } } });
//   next();
// });
// TPaymentSchema.pre('findOne', function (next) {
//   this.find({ isDelete: { $ne: true } });

//   next();
// });

// midlewere 

TPaymentSchema.pre<Query<any, any>>("find", function (next) {
    const options = this.getOptions(); // Get custom options
    if (!options?.includeDeleted) {
      this.find({ isDeleted: { $ne: true } });
    }
    next();
  });
  
  
  
  TPaymentSchema.pre("aggregate", function (next) {
    const pipelineOptions = this.pipeline();
    if (
      !pipelineOptions.find(
        (stage): stage is PipelineStage.Match => "$match" in stage && stage.$match?.isDeleted !== undefined
      )
    ) {
      this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    }
  
    next();
  });
  
  TPaymentSchema.pre<Query<any, any>>("findOne", function (next) {
    const options = this.getOptions();
    if (!options?.includeDeleted) {
      this.find({ isDeleted: { $ne: true } });
    }
    next();
  });

TPaymentSchema.statics.isCompanyApplyExist = async function (id: string) {
  return await payments.findById(id);
};

export const payments = model<TPayment, PaymentModal>(
  'payments',
  TPaymentSchema,
);
