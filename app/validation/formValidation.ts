import {z} from 'zod'

// Defining the schema 
export const schemaFormRegistration = z.object({
    username: z.string().min(5,"Username must be more than 5 character"),
    email: z.email('Please enter valid email.'),
    password: z.string().min(5,"Password must be more than 5 character")
})

export type formRegistration = z.infer<typeof schemaFormRegistration>

// Now you can use React Hook Form to track the error input 
// npm install react-hook-form @hookform/resolvers zod

