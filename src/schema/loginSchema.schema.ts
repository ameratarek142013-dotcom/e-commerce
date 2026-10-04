import z from "zod";



export const loginSchema = z.object({
    email : z.string().min(1,'Email is required').pipe(z.email('Invalid email address')),
    password : z.string().min(1,'Password is required').min(8,'Password must be at least 8 characters long and contain at least one uppercase letter and one number'),
})


export type loginSchemaType = z.infer<typeof loginSchema>