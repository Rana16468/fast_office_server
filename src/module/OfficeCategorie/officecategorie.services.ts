import httpStatus from 'http-status';
import QueryBuilder from '../../app/builder/QueryBuilder';
import AppError from '../../app/error/AppError';
import { excludeField } from './officecategorie.constant';
import { TOfficeCategorie } from './officecategorie.interfaces';
import { officecategories } from './officecategorie.modal';
import { officeproducts } from '../OfficeProduct/officeproduct.model';
import mongoose from 'mongoose';
import { GoogleGenerativeAI } from '@google/generative-ai';
import config from '../../app/config';

const CreateNewOfficeCategorieIntoDb = async (payload: TOfficeCategorie) => {
  const result = await officecategories.create(payload);
  return result;
};
const GetAllOfficeCategorieFromDb = async (query: Record<string, unknown>) => {
  const officeQuery = new QueryBuilder(officecategories.find({}), query)
    .search(excludeField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await officeQuery.modelQuery;
  const meta = await officeQuery.countTotal();
  result?.filter((item) => item?.isDelete !== true);
  return {
    meta,
    result,
  };
};

const GetAllSelleingOfficeCategorieFromDb = async (
  query: Record<string, unknown>,
) => {
  const officeQuery = new QueryBuilder(
    officecategories.find({ isDelete: true }, null, { includeDeleted: true }),
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
};

const GetSpecificOfficesCategorieFromDb = async (id: string) => {
  const result = await officecategories.isOfficeCategorieExist(id);
  return result;
};

const GetSpecificSellingOfficeCategorieFromDb = async (id: string) => {
  try {
    const result = await officecategories.findById(id, null, {
      includeDeleted: true,
    });

    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, 'Office category not found', '');
    }

    return result;
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error fetching specific office category',
      '',
    );
  }
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

    const isExistOfficeCategorie = await officecategories
      .findOne({ $and: [{ _id: id }, { isDelete: false }] })
      .select({ _id: 1 })
      .session(session);

    if (!isExistOfficeCategorie) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `This Category is already sold or does not exist`,
        '',
      );
    }

    const isExistOfficeProduct = await officeproducts
      .findOne({
        $and: [
          { officecategorieId: isExistOfficeCategorie?._id },
          { isDeleteted: false },
        ],
      })
      .select({ _id: 1 })
      .session(session);
    if (!isExistOfficeProduct) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `This Office Product is already sold or does not exist`,
        '',
      );
    }

    const deleteOfficeProduct = await officeproducts
      .deleteMany({ officecategorieId: isExistOfficeCategorie._id })
      .session(session);

    if (!deleteOfficeProduct) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Issue occurred while deleting office products',
        '',
      );
    }

    const deleteOfficeCategorie = await officecategories
      .deleteOne({ _id: id })
      .session(session);

    if (!deleteOfficeCategorie) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Issue occurred while deleting office category',
        '',
      );
    }

    await session.commitTransaction();
    return {
      message: 'Delete successfully',
      id,
    };
  } catch (error) {
    await session.abortTransaction();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Failed to delete office category`,
      '',
    );
  } finally {
    session.endSession();
  }
};

const AiBaseCostBenefitAnalysisFromDb = async (payload: { prompt: string }) => {
  const googleAI = new GoogleGenerativeAI(config.gemini_api_key as string);

  try {
    const geminiConfig: {
      temperature: number;
      topP: number;
      topK: number;
      maxOutputTokens: number;
    } = {
      temperature: 0.9,
      topP: 1,
      topK: 1,
      maxOutputTokens: 4096,
    };
    const geminiModel = await googleAI.getGenerativeModel({
      model: 'gemini-pro',
      ...geminiConfig,
    });
    const result = await geminiModel.generateContent(payload?.prompt);
    const response = result?.response
      .text()
      .replace(/\n/g, ' ')
      .replace(/\*/g, '');
    return response;
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to generate AI analysis',
      '',
    );
  }
};

// Enhanced error handling and validation

export const OfficeCategorieServices = {
  CreateNewOfficeCategorieIntoDb,
  GetAllOfficeCategorieFromDb,
  GetSpecificOfficesCategorieFromDb,
  UpdateOfficeCategorieFromDb,
  DeleteOfficeCategorieFromDb,
  GetAllSelleingOfficeCategorieFromDb,
  GetSpecificSellingOfficeCategorieFromDb,
  AiBaseCostBenefitAnalysisFromDb,
};
