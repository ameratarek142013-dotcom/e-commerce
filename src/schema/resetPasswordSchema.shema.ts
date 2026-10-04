import z from "zod";



export const resetPasswordSchema = z
    .object({
        newPassword: z.string().min(1,'Password is required').min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Please confirm your password"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });


export type resetPasswordSchemaType = z.infer<typeof resetPasswordSchema>