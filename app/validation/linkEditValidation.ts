import {z} from 'zod'

// Define the schema
export const editLinkValidation = z.object({
    short_url: z.url(),
    long_url: z.url('Please Enter a valid URL that starts with "htttps://"'),
    description: z.string().min(5,"Description require more than 5 character"),
    is_active: z.boolean()
})

export type schemaEditLink = z.infer<typeof editLinkValidation>