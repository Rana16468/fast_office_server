


import { z } from "zod";
import { USER_ROLE } from "../User/user.constant";


const TAuthScehema=z.object({
    body:z.object({
        email:z.string({message:"email is required"})
    })

});
const TUpdateProfileSchema=z.object({
    body:z.object({
        name:z.string({required_error:"name is required"}).optional(),
        photo:z.string({required_error:"photo is required"}).optional()
    }).optional()
});

const TUpdateUserStatusSchema=z.object({

    body:z.object({
        role: z.enum([USER_ROLE.ADMIN, USER_ROLE.EMPLOYEE, USER_ROLE.USER], {
            errorMap: (issue) => ({ message: `${issue} is not a valid role` }),
           }),
    })
})

export const AuthSchema={
    TAuthScehema,
    TUpdateProfileSchema,
    TUpdateUserStatusSchema
}