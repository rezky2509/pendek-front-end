import {z} from 'zod'

// Defining the schema 
// This as zod type
export const loginForm = z.object({
    // username: z.string().min(5,"Username must be more than 5 character"),
    username: z.string(),
    password: z.string()
})

// Export as type
export type loginFormValidation = z.infer<typeof loginForm>

// Now you can use React Hook Form to track the error input 
// npm install react-hook-form @hookform/resolvers zod

