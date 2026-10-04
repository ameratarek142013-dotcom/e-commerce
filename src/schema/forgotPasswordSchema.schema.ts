import z from "zod";



export const forgotPasswortSchema = z.object({
    email : z.string().min(1,'Email is required').pipe(z.email('Invalid email address')),
})


export type forgotPasswortSchemaType = z.infer<typeof forgotPasswortSchema>