

import { z } from "zod";
import { USER_ROLE } from "./user.constant";




 const TUserZodSchema = z.object({
  body:z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format").optional(),
    password: z.string().min(6, "Password is required and should be at least 6 characters"),
    photo: z.string().optional(),
    role: z.enum([USER_ROLE.Admin, USER_ROLE.Employee, USER_ROLE.User], {
    errorMap: (issue) => ({ message: `${issue} is not a valid role` }),
   }),
   os: z.string().min(1, "OS is required"),
   browser: z.string().min(1, "Browser is required"),
   creationTime: z.string().min(1, "Creation time is required"),
   device: z.string().min(1, "Device is required"),
   districtName: z.string().min(1, "District name is required"),
   isDelete: z.boolean().optional(),
  })
});

export  const UserValidation={
      TUserZodSchema
}


