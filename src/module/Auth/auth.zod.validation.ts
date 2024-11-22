


import { z } from "zod";


const TAuthScehema=z.object({
    body:z.object({
        email:z.string({message:"email is required"})
    })

});

export const AuthSchema={
    TAuthScehema
}