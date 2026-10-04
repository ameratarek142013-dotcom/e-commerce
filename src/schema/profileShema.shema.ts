import { z } from "zod"

export const profileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().pipe(z.email("Enter a valid email")),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
})

export type profileSchemaType = z.infer<typeof profileSchema>