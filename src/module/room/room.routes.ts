import express from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import validationRequest from '../../middleware/validationRequest';
import { MeetingRoomValidation } from './room.validation';
import { RoomController } from './room.controllers';

const router=express.Router();
router.post("/create_room",auth(USER_ROLE.ADMIN),validationRequest(MeetingRoomValidation.MeetingRoomZodSchema),RoomController.create_room);
router.get("/find_all_room",auth(USER_ROLE.EMPLOYEE,USER_ROLE.ADMIN,USER_ROLE.USER),RoomController.findAllRoom);
router.get("/find_specific_room/:id",auth(USER_ROLE.EMPLOYEE,USER_ROLE.ADMIN,USER_ROLE.USER),RoomController.findSpecificRoom);


export const RoomRouter = router;
