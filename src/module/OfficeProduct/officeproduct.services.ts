import httpStatus from 'http-status';
import AppError from '../../app/error/AppError';
import { officecategories } from '../OfficeCategorie/officecategorie.modal';
import { TOfficeInfrastructure } from './officeproduct.interface';
import { officeproducts } from './officeproduct.model';
import QueryBuilder from '../../app/builder/QueryBuilder';
import { excludeField } from './officeproduct.constant';


const CreateOfficeProductIntoDb = async (payload: TOfficeInfrastructure) => {
  const isExistProductCategorie = await officecategories.isOfficeCategorieExist(
    payload.officecategorieId.toString(),
  );
  if (!isExistProductCategorie) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Not Founded Office Categorie',
      '',
    );
  }
  try {
    const result = await officeproducts.create(payload);
    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Error By the Office Product Create',
        '',
      );
    }
    return {
      message: 'Successfully  Recorded',
    };
  } catch (error) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Error fetching Office Product',
      '',
    );
  }
};

const Find_Specific_Office_Infastructure_FormDb = async (
  officecategorieId: string,
  query: Record<string, unknown>,
) => {
  try {
    const officeQuery = new QueryBuilder(
      officeproducts.find({ officecategorieId }).populate('officecategorieId'),
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
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Error fetching Office Product',
      '',
    );
  }
};

// selling office product
const Find_Specific_Selling_Office_Infastructure_FormDb = async (
  officecategorieId: string,
  query: Record<string, unknown>,
) => {
  try {
    const officeQuery = new QueryBuilder(
      officeproducts.find({ officecategorieId,isDeleteted:true },null, { includeDeleted: true }).populate('officecategorieId'),
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
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Error fetching Office Product',
      '',
    );
  }
};



const FindAll_Office_Infastructure_FormDb = async () => {
  try {
    const officeQuery = new QueryBuilder(officeproducts.find({}).populate('officecategorieId'), {})
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

const Find_Speciifc_Office_Infastructure_ById_FromDb = async (id: string) => {
  try {
    const result = await officeproducts.isOfficeProductExist(id);
    return result;
  } catch (error) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Error fetching Office Product',
      '',
    );
  }
};

const UpdateOffice_Infastructure_FormDb = async (
  payload: TOfficeInfrastructure,
  id: string,
) => {
  const isExistOfficeProduct = await officeproducts?.findOne(
    { _id: id },
    {
      _id: true,
      officecategorieId: true,
    },
  );

  

  if (!isExistOfficeProduct) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `Office product with ID ${id} does not exist.`,
      '',
    );
  }

  const isExistOfficeCategorie = await officecategories.isOfficeCategorieExist(
    isExistOfficeProduct?.officecategorieId?.toString(),
  );
  if (!isExistOfficeCategorie) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `Office Categorie with ID ${id} does not exist.`,
      '',
    );
  }

  try {
    const result = await officeproducts.findByIdAndUpdate(id, payload, {
      new: true,
      upsert: true,
    });
    if (!result) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        `Office Product Update  Failed`,
        '',
      );
    }
    return 'Successfully Updated Office Products';
  } catch (error) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Error fetching Office Product',
      '',
    );
  }
};

// delete office product

const Delete_Office_Infastructure_FromDb = async (id: string) => {
  try {
    const deleteOffice_Product = await officeproducts.findByIdAndDelete(id);
    if (!deleteOffice_Product) {
      throw new AppError(httpStatus.NOT_FOUND, 'Failed Office Product', '');
    }
    return 'delete Office Product';
  } catch (error) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Error fetching Office Product',
      '',
    );
  }
};

// categorie ways data filtering 

const Office_Categorie_Infastructure_FromDb = async (categorie_name:string) => {
    try {
        const result = await officeproducts.aggregate([
            {
                $lookup: {
                    from: 'officecategories',
                    localField: 'officecategorieId',
                    foreignField: '_id',
                    as: 'officeproducts',
                },
            },
            {
                $unwind: '$officeproducts',
            },
            {
                $match: {
                    'officeproducts.office_categorie': categorie_name, 
                },
              
            },
            {
                $sort: { createdAt: -1 }
            },
        ]);
        return result ;
    } catch (error) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'Error fetching Office Product',
            '' // Include the error message for debugging
        );
    }
};

const Find_Specific_Office_Gallery_FromDb=async(officeproductId:string)=>{

  try{

    const result=await officeproducts.findById(officeproductId).select({
      'furnitureproduct.name': 1,
      'furnitureproduct.image': 1,
      'deskproduct.name': 1,
      'deskproduct.image': 1,
      'electronicsproduct.name': 1,
      'electronicsproduct.image': 1,
      'laptopproduct.name': 1,
      'laptopproduct.image': 1,
      'projectorproduct.name': 1,
      'projectorproduct.image': 1,
      'printerproduct.name': 1,
      'printerproduct.image': 1,
      'officesuppliesproduct.name': 1,
      'officesuppliesproduct.image': 1,
      'stationeryproduct.name': 1,
      'stationeryproduct.image': 1,
      'acproduct.name': 1,
      'acproduct.image': 1,
      'officeinfastructure': 1
    });
    return result;


  }
  catch(error){
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Error fetching Office Product',
      '' // Include the error message for debugging
  );
  }
}

const DeleteOfficeProductFromDb=async(officeproductId:string)=>{
  try{

    const deleteOfficeProduct=await officeproducts.findByIdAndDelete(officeproductId);
    if(!deleteOfficeProduct){
      throw new AppError(httpStatus.NOT_FOUND, 'Failed Office Product', '');
    }

    return {
        message:deleteOfficeProduct?"Successfully Delete Office Product":""
    }

  }
  catch(error){
    throw new AppError(
      httpStatus.SERVICE_UNAVAILABLE,
      'Error fetching Office Product',
      '' // Include the error message for debugging
  );
  }





  

}




export const OfficeProductServices = {
  CreateOfficeProductIntoDb,
  Find_Specific_Office_Infastructure_FormDb,
  Find_Specific_Selling_Office_Infastructure_FormDb,
  FindAll_Office_Infastructure_FormDb,
  Find_Speciifc_Office_Infastructure_ById_FromDb,
  UpdateOffice_Infastructure_FormDb,
  Delete_Office_Infastructure_FromDb,
  Office_Categorie_Infastructure_FromDb,
  Find_Specific_Office_Gallery_FromDb,
  DeleteOfficeProductFromDb
};
