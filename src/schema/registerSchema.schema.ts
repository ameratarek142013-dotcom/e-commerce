import z from "zod";



export const registerSchema = z.object({
    name : z.string().min(1,'Please enter your name').min(2,'Name is too short').max(20,'Name is too long'),
    email : z.string().min(1,'Please enter your email').pipe(z.email('Invalid email address')),
    password : z.string().min(1,'Please enter your password').min(8,'Password must be at least 8 characters long and contain at least one uppercase letter and one number'),
    rePassword : z.string().min(1,'Please confirm your password'),
    phone : z.string().min(1,'Please enter your phone number').regex(/^01[0125][0-9]{8}$/,'Only Egyptian phone numbers are allowed'),
    terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and privacy policy",}),
}).refine((object)=> object.password === object.rePassword , {
    path : ["rePassword"],
    error : "password and confirm password must be match"
})


export type registerSchemaType = z.infer<typeof registerSchema>