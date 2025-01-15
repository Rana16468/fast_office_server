import httpStatus from 'http-status';
import AppError from '../../app/error/AppError';
import { TContract } from './contract.interface';
import { Contract } from './contract.model';
import QueryBuilder from '../../app/builder/QueryBuilder';

const createContractIntoDb = async (payload: TContract) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const existingRecord = await Contract.findOne({
      email: payload?.email,
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    if (existingRecord) {
      throw new AppError(
        httpStatus.BAD_GATEWAY,
        'Already Exists, Your Info',
        '',
      );
    }

    // Save the new contract if no record exists
    const buildInShoes = new Contract(payload);
    const result = await buildInShoes.save();
    return result;
  } catch (error) {
    throw new AppError(
      httpStatus.SERVICE_UNAVAILABLE,
      'Service Unavailable',
      '',
    );
  }
};

const AllContractIntoDb = async () => {
  try {
    const officeQuery = new QueryBuilder(Contract.find({}), {})
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
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Error fetching Office Product',
      '',
    );
  }
};

const SpecificContractIdIntoDb = async (id: string) => {
  const result = await Contract.findById(id);
  return result;
};

const UpdateContractFromDb = async (
  id: string,
  payload: Partial<TContract>,
) => {
  const isExistUser = await Contract.findById(id);
  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Not Exist in System', '');
  }
  const result = await Contract.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const DeleteContractFromDb = async (id: string) => {
  try {
    const result = await Contract.findByIdAndDelete(id);
    if (!result) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Contract Information Not Founded',
        '',
      );
    }
    return {
      message: result ? 'Successfully Delete Contact Information' : '',
    };
  } catch (error) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Not Exist in System', '');
  }
};

const FavoriteContrcatFromDb = async (id: string) => {
  const isExistUser = await Contract.findById(id);
  if (!isExistUser) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User Not Exist in the System',
      '',
    );
  }
  const result = await Contract.updateOne(
    { _id: id },
    { isfavorite: isExistUser?.isfavorite ? false : true },
  );
  return result;
};

export const ContractService = {
  createContractIntoDb,
  AllContractIntoDb,
  SpecificContractIdIntoDb,
  UpdateContractFromDb,
  DeleteContractFromDb,
  FavoriteContrcatFromDb,
};
