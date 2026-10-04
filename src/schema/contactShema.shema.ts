import z from "zod";

export const contactSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.email("Please enter a valid email"),
    subject: z.string().min(1, "Please select a subject"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormType = z.infer<typeof contactSchema>; 