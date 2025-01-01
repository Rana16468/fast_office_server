import { Model, Types } from 'mongoose';

export type TPayment = {
  categorieId: Types.ObjectId;
  productdetailsId: Types.ObjectId;
  userId?: Types.ObjectId;
  email: string;
  address: string;
  price: number;
  phone: string;
  ipaddress:string,
  transactionId?: string;
  payment?: boolean;
  isDeleted?: boolean;
};

export interface PaymentModal extends Model<TPayment> {
  // eslint-disable-next-line no-unused-vars
  isPaymentExist(id: string): Promise<TPayment>;
}
