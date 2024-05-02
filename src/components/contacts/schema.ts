import {z} from 'zod'

export const MIN_LENGTH = 3
export const MAX_LENGTH = 2000

export const FormSchema = z.object({
  name: z.string().trim().min(1),
  lastname: z.string().optional(),
  email: z.string().trim().email(),
  message: z.string().trim().min(MIN_LENGTH).max(MAX_LENGTH),
})
