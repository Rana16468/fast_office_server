import httpStatus from 'http-status';
import QueryBuilder from '../../app/builder/QueryBuilder';
import AppError from '../../app/error/AppError';
import { excludeField } from './officecategorie.constant';
import { TOfficeCategorie } from './officecategorie.interfaces';
import { officecategories } from './officecategorie.modal';
import { officeproducts } from '../OfficeProduct/officeproduct.model';
import mongoose from 'mongoose';

const CreateNewOfficeCategorieIntoDb = async (payload: TOfficeCategorie) => {
  const result = await officecategories.create(payload);
  return result;
};
const GetAllOfficeCategorieFromDb = async (query: Record<string, unknown>) => {
  const officeQuery = new QueryBuilder(officecategories.find(), query)
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
};

const GetSpecificOfficesCategorieFromDb = async (id: string) => {
  const result = await officecategories.isOfficeCategorieExist(id);
  return result;
};

const UpdateOfficeCategorieFromDb = async (
  id: string,
  payload: TOfficeCategorie,
) => {
  const isExistOfficeCategorie =
    await officecategories.isOfficeCategorieExist(id);
  if (!isExistOfficeCategorie) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Not Founded Office Categorie',
      '',
    );
  }
  const result = await officecategories.findByIdAndUpdate(id, payload, {
    new: true,
    upsert: true,
  });
  return result;
};

// delete

const DeleteOfficeCategorieFromDb = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deleteOfficeProduct = await officeproducts
      .deleteOne({ officecategorieId: id })
      .session(session);

    const deleteOfficeCategorie = await officecategories
      .findByIdAndDelete(id)
      .session(session);
    if (!deleteOfficeProduct || !deleteOfficeCategorie) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Failed to delete office category or associated products',
        '',
      );
    }
    await session.commitTransaction();

    return {
      message: 'Delete Successfull',
    };
  } catch (error) {
    await session.abortTransaction();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to delete office category',
      '',
    );
  } finally {
    await session.endSession();
  }
};



// Enhanced error handling and validation

export const OfficeCategorieServices = {
  CreateNewOfficeCategorieIntoDb,
  GetAllOfficeCategorieFromDb,
  GetSpecificOfficesCategorieFromDb,
  UpdateOfficeCategorieFromDb,
  DeleteOfficeCategorieFromDb
};
