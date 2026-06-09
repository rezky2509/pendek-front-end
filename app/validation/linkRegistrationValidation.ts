import {z} from 'zod'

// Define the schema
export const schemaLinkRegistration = z.object({
    long_url: z.url('Please Enter a valid URL that starts with "https://"'),
    description: z.string().min(5,"Description require more than 5 character"),

    is_active: z.boolean(),
    // Coerce convert string into the type that is exist on zod. 
    // Refer Zod Coercion.
    // is_active: z.coerce.boolean()
    // BUT using coercion, can make value truthy and falsy. 

    // The safest is to convert it using pre-process 
    // is_active: z.preprocess(
    //     (value)=>{
    //     if(value === 'true') return true;
    //     if(value === 'false') return false;
    //     return value
    //     }, z.boolean())

    // is_active: z.preprocess(
    //     (value:unknown) => {
    //         if (value === 'true') return true;
    //         if (value === 'false') return false;
    //         return value; //  Keeps your boolean true default value safe!
    //     },
    //  z.boolean()) as z.ZodType<boolean>
})

export type linkRegistration = z.infer<typeof schemaLinkRegistration>