import httpStatus from 'http-status';
import AppError from '../../app/error/AppError';
import { TPayment } from './payment.interface';
import config from '../../app/config';
import axios from 'axios';
import { payments } from './payment.model';
import mongoose from 'mongoose';
import QueryBuilder from '../../app/builder/QueryBuilder';
import { excludeField } from './payment.constant';
import { users } from '../User/user.model';
import { officecategories } from '../OfficeCategorie/officecategorie.modal';
import { officeproducts } from '../OfficeProduct/officeproduct.model';
import { rooms } from '../room/room.modal';

const PaymentGetWayFromDb = async (payload: TPayment, userId: string) => {
  const isExistOfficeCategorie = await officecategories.findById(
    payload.categorieId,
    {
      _id: true,
    },
  );
  if (!isExistOfficeCategorie) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'office categorie is not founded',
      '',
    );
  }
  const isExistOfficeProduct = await officeproducts.findById(
    payload?.productdetailsId,
    {
      _id: true,
    },
  );
  if (!isExistOfficeProduct) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'office product is not founded',
      '',
    );
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const isUserExist = await users.findById(userId, {
      name: true,
    });
    if (!isUserExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found', '');
    }
    const transactionId = Math.floor(Math.random() * 1000000000000);
    const data = {
      store_id: config.ssl_commerce.store_id,
      store_passwd: config.ssl_commerce.store_passwd,
      total_amount: payload?.price,
      currency: 'BDT',
      tran_id: transactionId,
      success_url: config.ssl_commerce.success_url,
      fail_url: config.ssl_commerce.fail_url,
      cancel_url: config.ssl_commerce.cancel_url,
      ipn_url: 'https://fast-office-server.vercel.app/ipn',
      shipping_method: 'N/A',
      product_name: 'Appointment',
      product_category: 'Electronic',
      product_profile: 'general',
      cus_name: isUserExist?.name,
      cus_email: payload?.email,
      cus_add1: payload?.address,
      cus_add2: 'N/A',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: payload?.phone,
      cus_fax: '01711111111',
      ship_name: 'N/A',
      ship_add1: 'N/A',
      ship_add2: 'N/A',
      ship_city: 'N/A',
      ship_state: 'N/A',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
    };

    const paymentBuilder = new payments({ ...payload, userId, transactionId });
    const paymentResponse = await paymentBuilder.save({ session });
    if (!paymentResponse) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Payment response not found',
        '',
      );
    }
    const response = await axios({
      method: 'POST',
      url: config.ssl_commerce.ssl_payment_api,
      data: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    await session.commitTransaction();
    session.endSession();

    return {
      paymentUrl: response.data?.GatewayPageURL,
      transactionId,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const validitePayment = async (payload: any) => {
  try {
    const respone = await axios({
      method: 'GET',
      url: `${config.ssl_commerce.ssl_validation_api}?val_id=${payload.val_id}&store_id=${config.ssl_commerce.store_id}&store_passwd=${config.ssl_commerce.store_passwd}&format=json`,
    });

    return respone?.data;
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, 'payment validation error', '');
  }
};

const FindAllPaymentListFromDb = async (query: Record<string, unknown>) => {
  try {
    const officeQuery = new QueryBuilder(
      payments.find({ payment: true }).populate('userId'),
      query,
    )
      .search(excludeField)
      .filter()
      .sort()
      .paginate()
      .fields();

    const result = await officeQuery.modelQuery;
    const meta = await officeQuery.countTotal();

    return {
      meta,
      result,
    };
  } catch (error) {
    throw new AppError(httpStatus.NOT_FOUND, 'Error fetching payment data', '');
  }
};

const FindAllPaymentListAdminFromDb = async (
  query: Record<string, unknown>,
) => {
  try {
    const officeQuery = new QueryBuilder(
      payments
        .find({ payment: true }, null, { includeDeleted: true })
        .populate('userId'),
      query,
    )
      .search(excludeField)
      .filter()
      .sort() 
      .paginate()
      .fields();

    const result = await officeQuery.modelQuery;
    const meta = await officeQuery.countTotal();

    return {
      meta,
      result,
    };
  } catch (error) {
    throw new AppError(httpStatus.NOT_FOUND, 'Error fetching payment Data', '');
  }
};

const UpdatePaymentStatusFromDb = async (transactionId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existingPayment = await payments
      .findOne(
        { transactionId },
        { _id: 1, categorieId: 1, productdetailsId: 1 },
      )
      .session(session);

    if (!existingPayment) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'This Transaction Id Does Not Exist',
        '',
      );
    }

    const [updatedCategorie, updatedProduct, updatedPayment,deleteConference] =
      await Promise.all([
        officecategories.findByIdAndUpdate(
          existingPayment.categorieId,
          { isDelete: true },
          { new: true, runValidators: true, session },
        ),
        officeproducts.findByIdAndUpdate(
          existingPayment.productdetailsId,
          { isDeleteted: true },
          { new: true, runValidators: true, session },
        ),
        payments.findByIdAndUpdate(
          existingPayment._id,
          { payment: true },
          { new: true, runValidators: true, session },
        ),
        rooms.deleteMany({_id:existingPayment.categorieId},{session})

      ]);

    if (!updatedCategorie || !updatedProduct || !updatedPayment || !deleteConference) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Failed to update all required documents',
        '',
      );
    }
    await session.commitTransaction();
    return {
      message: 'Payment Recorded Successfully',
      success: true,

      data: {
        message:
          updatedPayment && updatedCategorie && updatedProduct && deleteConference
            ? 'Successfully Recorded'
            : '',
      },
    };
  } catch (error) {
    await session.abortTransaction();
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error processing payment update',
      '',
    );
  } finally {
    await session.endSession();
  }
};

const FailedPaymentStatusDeleteFromDb = async (transactionId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existingPayment = await payments
      .findOne(
        { transactionId },
        {
          _id: 1,
        },
      )
      .session(session);

    if (!existingPayment) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'This Transaction Id Does Not Exist',
        '',
      );
    }

    const result = await payments.deleteOne(
      {
        transactionId,
        payment: false,
      },
      { session },
    );
    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error updating payment status',
      '',
    );
  } finally {
    session.endSession();
  }
};

const Find_My_Payment_Payment_Laser_FromDb = async (userId: string) => {
  try {
    const result = await payments.find({ userId, payment: true }, null, {
      includeDeleted: true,
    });
    return result;
  } catch (error) {
    throw new AppError(
      httpStatus.BAD_GATEWAY,
      'my payment laser fetching error',
      '',
    );
  }
};

const UserDashboardFormDb = async (userId: string) => {
  try {
    const paymentLaserInfo = await payments.find(
      { userId, payment: true },
      {
        categorieId: 1,
        price: 1,
        email: 1,
        ipaddress: 1,
        transactionId: 1,
      },
      {
        includeDeleted: true,
      }
    );

    const officeCategories = await Promise.all(
      paymentLaserInfo.map(async (payment) => {
        try {
          if (!payment?.categorieId) {
            throw new AppError( httpStatus.NOT_FOUND,`Missing categorieId for payment: ${payment._id}`,'');
          }
          const categoryDetails = await officecategories
            .findById(payment.categorieId, null, { includeDeleted: true })
            .select({
              amount: 1,
              currency: 1,
              squareFootage: 1,
              office_categorie: 1,
            });

          if (!categoryDetails) {
             throw new AppError(httpStatus.NOT_FOUND,`No category found for ID: ${payment.categorieId}`,'');
          }

          return categoryDetails;
        } catch (error) {
          throw new AppError(httpStatus.NOT_FOUND,`Error fetching category for ID ${payment?.categorieId}:`,'');
          
        }
      })
    );
    return {
      officeCategories,
      paymentLaserInfo,
    };
  } catch (error) {
    throw new AppError(httpStatus.NOT_FOUND,`Unable to retrieve dashboard data. Please try again later.`,'');
  }
};

const AdminDashboardFormDb=async() =>{

  try {
    const paymentLaserInfo = await payments.find(
      {  payment: true },
      {
        categorieId: 1,
        price: 1,
        email: 1,
        ipaddress: 1,
        transactionId: 1,
      },
      {
        includeDeleted: true,
      }
    );

    const officeCategories = await Promise.all(
      paymentLaserInfo.map(async (payment) => {
        try {
          if (!payment?.categorieId) {
            throw new AppError( httpStatus.NOT_FOUND,`Missing categorieId for payment: ${payment._id}`,'');
          }
          const categoryDetails = await officecategories
            .findById(payment.categorieId, null, { includeDeleted: true })
            .select({
              amount: 1,
              currency: 1,
              squareFootage: 1,
              office_categorie: 1,
            });

          if (!categoryDetails) {
             throw new AppError(httpStatus.NOT_FOUND,`No category found for ID: ${payment.categorieId}`,'');
          }

          return categoryDetails;
        } catch (error) {
          throw new AppError(httpStatus.NOT_FOUND,`Error fetching category for ID ${payment?.categorieId}:`,'');
          
        }
      })
    );
    return {
      officeCategories,
      paymentLaserInfo,
    };
  } catch (error) {
    throw new AppError(httpStatus.NOT_FOUND,`Unable to retrieve dashboard data. Please try again later.`,'');
  }
}



export const PaymentServices = {
  PaymentGetWayFromDb,
  validitePayment,
  FindAllPaymentListFromDb,
  FindAllPaymentListAdminFromDb,
  UpdatePaymentStatusFromDb,
  FailedPaymentStatusDeleteFromDb,
  Find_My_Payment_Payment_Laser_FromDb,
  UserDashboardFormDb,
  AdminDashboardFormDb
};
