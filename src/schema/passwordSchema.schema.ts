import { z } from "zod"

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    password: z.string().min(6, "Must be at least 6 characters"),
    rePassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((object) => object.password === object.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match",
  })

  export type passwordSchemaType = z.infer<typeof passwordSchema>