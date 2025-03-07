import express from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import validationRequest from '../../middleware/validationRequest';
import { PaymentValdation } from './payment.validation';
import { PaymentController } from './payment.controllers';
const router = express.Router();
router.post(
  '/create_payment',
  auth(USER_ROLE.USER,USER_ROLE.EMPLOYEE),
  validationRequest(PaymentValdation.TPaymentValidationSchema),
  PaymentController.PaymentGetWay,
);
router.get(
  '/all_payment_list',
  auth(USER_ROLE.EMPLOYEE, USER_ROLE.ADMIN),
  PaymentController.FindAllPaymentList,
);
router.get(
  '/all_payment_list_admin',
  auth(USER_ROLE.ADMIN),
  PaymentController.FindAllPaymentListAdmin,
);
router.patch(
  '/update_payment_status/:transactionId',
  auth(USER_ROLE.USER,USER_ROLE.EMPLOYEE),
  PaymentController.UpdatePaymentStatus,
);
router.delete(
  '/delete_failed_payment_status/:transactionId',
  auth(USER_ROLE.USER,USER_ROLE.EMPLOYEE),
  PaymentController.FailedPaymentStatusDelete,
);

router.get("/find_my_payment_leaser",auth(USER_ROLE.USER,USER_ROLE.EMPLOYEE),PaymentController.Find_My_Payment_Payment_Laser);
router.get("/user_dashboard",auth(USER_ROLE.USER,USER_ROLE.EMPLOYEE),PaymentController.UserDashboard);
router.get("/admin_dashboard",auth(USER_ROLE.EMPLOYEE,USER_ROLE.ADMIN),PaymentController.AdminDashboard);

export const PaymentRouter = router;
