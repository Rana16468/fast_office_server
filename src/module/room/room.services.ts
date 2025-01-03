import httpStatus from 'http-status';
import AppError from '../../app/error/AppError';
import { TMeetingRoom } from './room.interface';
import { rooms } from './room.modal';
import { officecategories } from '../OfficeCategorie/officecategorie.modal';
import QueryBuilder from '../../app/builder/QueryBuilder';
import common_room from '../../utility/rooms';

const create_room_IntoDb = async (payload: TMeetingRoom, userId: string) => {
  const isExistCategorie = await officecategories.isOfficeCategorieExist(
    payload?.categorieId.toString(),
  );
  if (!isExistCategorie) {
    throw new AppError(httpStatus.FOUND, 'Categorie Not Founded', '');
  }
  const isRoomExist = await rooms.findOne({
    $and: [{ categorieId: payload.categorieId }, { roomId: payload.roomId }],
  });

  if (isRoomExist) {
    throw new AppError(httpStatus.FOUND, 'Room is Already Exist', '');
  }

  try {
    const roomBuilder = new rooms({ ...payload, userId });
    const result = await roomBuilder.save();
    if (!result) {
      throw new AppError(
        httpStatus.BAD_GATEWAY,
        'Room is Not Created Successfully',
        '',
      );
    }
    return {
      message: 'Room is Create Successfully',
    };
  } catch (error) {
    throw new AppError(httpStatus.NOT_FOUND, 'room error builder', '');
  }
};

const findAllRoomFromDb = async (query: Record<string, unknown>) => {
  try {
    const officeQuery = new QueryBuilder(
      rooms.find({}).populate('categorieId'),
      query,
    )

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
    throw new AppError(httpStatus.NOT_FOUND, 'room  fatching error', '');
  }
};

const findSpecificRoomFromDb = async (id: string) => {
  try {
    const result = await rooms.findOne({ _id: id }).populate('categorieId');
    return result;
  } catch (error) {
    throw new AppError(httpStatus.NOT_FOUND, 'room  fatching error', '');
  }
};

const  deleteSpecificRoomFromDb=async(id:string)=>{
  try{
    const result=await rooms.findByIdAndDelete(id);
    return result;

  }
  catch(error){
    throw new AppError(httpStatus.NOT_FOUND, 'room  fatching error', '');
  }
}

export const RoomServices = {
  create_room_IntoDb,
  findAllRoomFromDb,
  findSpecificRoomFromDb,
  deleteSpecificRoomFromDb
  
};
