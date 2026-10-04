import z from "zod";



export const paymentSchema = z.object({
    city : z.string().min(1,'City name must be at least 2 characters').max(20,'City name is too long'),
    details : z.string().min(1,'Address details must be at least 10 characters') ,
    phone : z.string().min(1,'Please enter a valid Egyptian phone number').regex(/^01[0125][0-9]{8}$/,'Only Egyptian phone numbers are allowed'),
    
})


export type paymentSchemaType = z.infer<typeof paymentSchema>