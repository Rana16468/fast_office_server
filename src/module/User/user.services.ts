import config from "../../app/config";
import { jwtHalpers } from "../../app/jwtHealpers/jwtHealpers";
import { TUser } from "./user.interface";
import { users } from "./user.model";
import { startSession } from 'mongoose';

const createUserIntoDb = async (payload: TUser) => {
    const session = await startSession();
    session.startTransaction(); 
    try {
        const isUserExist = await users.findOne({ email: payload?.email }).session(session);

        if (payload?.password === config.google_auth) {
            if (isUserExist) {
                const jwtPayload = {
                    id: isUserExist?.id,
                    role: isUserExist?.role,
                    email: isUserExist?.email,
                };
                if (isUserExist?.isVerify) {
                    const accessToken = jwtHalpers.generateToken(
                        jwtPayload,
                        config.jwt_access_srcret as string,
                        config.expries_in_token as string
                    );
                    await session.commitTransaction(); 
                    session.endSession();
                    return accessToken;
                }
            }

           
            const newUser = new users(payload);
            const result = await newUser.save({ session });

            const verified = await users.findByIdAndUpdate(
                result.id,
                { isVerify: true },
                { new: true, upsert: true, session }
            );

            const jwtPayload = {
                id: result?.id,
                role: result?.role,
                email: result?.email,
            };

            if (verified?.isVerify) {
                const accessToken = jwtHalpers.generateToken(
                    jwtPayload,
                    config.jwt_access_srcret as string,
                    config.expries_in_token as string
                );
                await session.commitTransaction(); // Commit the transaction
                session.endSession();
                return accessToken;
            }
        } else {
           
            const newUser = new users(payload);
            const result = await newUser.save({ session });
            await session.commitTransaction(); 
            session.endSession();
            return result;
        }
    } catch (error) {
      
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

export const UserService={

    createUserIntoDb
}
