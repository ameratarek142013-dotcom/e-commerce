import z from "zod";



export const verifyCodeSchema = z.object({
    resetCode :  z.string().min(1,'Reset code is required').length(6, "Reset code must be 6 digits"),
})


export type verifyCodeSchemaType = z.infer<typeof verifyCodeSchema>