import {z} from 'zod'

// Define the schema
export const schemaLinkRegistration = z.object({
    long_url: z.url('Please Enter a valid URL that starts with "htttps://"'),
    description: z.string().min(5,"Description require more than 5 character"),
    is_active: z.boolean()
})

export type linkRegistration = z.infer<typeof schemaLinkRegistration>