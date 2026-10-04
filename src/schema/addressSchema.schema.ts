import z from "zod";

export const addressSchema = z.object({
    name: z.string().min(2, "Address name must be at least 2 characters"),
    details: z.string().min(5, "Please enter the full address"),
    phone: z
        .string()
        .regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
    city: z.string().min(2, "City is required"),
});

export type addressSchemaType = z.infer<typeof addressSchema>;