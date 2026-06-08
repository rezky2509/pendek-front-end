"use client"

import React, { useState, useEffect } from 'react'
import {X,LoaderCircle} from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { linkRegistration, schemaLinkRegistration } from '@/app/validation/linkRegistrationValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import Form from 'next/form'
import { errorResponse, userLinkRegistration } from '@/app/types/types'
import { linkURLRegistration } from '@/app/services/api'
// The props 
interface ModalProps {
    isOpen: boolean,
    // This onclose is just reverting the boolean value does not return any value
    onClose: ()=> void,
    // Call the urllist once the api call is sucess
    // run whatever function within this function definition. 
    onSuccess: ()=> void
}

const ModalFormURL: React.FC<ModalProps> = ({isOpen, onClose, onSuccess}) => {
    // IF the props recieve as isOpen false 
    const [isLoading,setIsLoading] = useState<boolean>(false)

    // Modal animation  
    const [isAnimated,setIsAnimated] = useState<boolean>(false)

    // disable button during process
    const [isSubmitting,setIsSubmitting] = useState<boolean>(false)

    const [errorMessage,setErrorMessage] = useState<errorResponse>({
        errors:''
    })

    // Form Handler 
    const {register, handleSubmit, formState: {errors}} = useForm<linkRegistration>({
        // Resolver 
        resolver: zodResolver(schemaLinkRegistration)
    })


    // https://www.youtube.com/watch?v=GtPPT-qSXj8

    // Handling Link Form Registration
    // Using type of submit handler from react-hook-form
    const submitLinkRegistration: SubmitHandler<linkRegistration> = async(data: userLinkRegistration) =>{
        setIsLoading(true)
        setIsSubmitting(true)        
        console.log('Checking input validation')
        const validation = schemaLinkRegistration.safeParse(data)
        if(validation.success){
            const result = await linkURLRegistration(data)
            if(result?.success === true){
                setIsLoading(false)
                setIsSubmitting(false)
                // revert the boolean value to true. 
                // Previously it was set to false
                onClose()
                // set to call onSucess function
                onSuccess()
            }else{
                // setErrorMessage(result?.message)
                // Here implement toast when the server not responding.
            }
            setIsLoading(false)
            setIsSubmitting(false)
            setErrorMessage({
                errors: !result?.data?.errors
            })
        }
        return false
    }

    useEffect(() => {
    if (isOpen) {
      // Small timeout ensures the DOM has rendered the element before animating
        //   set delay for 5 seconds
      const timer = setTimeout(() => setIsAnimated(true), 5);
      return () => clearTimeout(timer);
    } else {
      setIsAnimated(false);
    }
    console.log(`The error from db is ${errorMessage.errors}`)
    }, [isOpen,errorMessage]);

    if(!isOpen){
        return null
    }


  return (
    <>  
    <div 
        className={`fixed inset-0 z-40 bg-gray-900/50 transition-opacity duration-300 ease-out ${
          isAnimated ? 'opacity-100' : 'opacity-0'
        }`} >
        <div className="flex justify-center items-center fixed inset-0 bg-gray-900/50 dark:bg-gray-900/80">
            <div className="relative p-4 w-full max-w-md max-h-full overflow-y-auto bg-fuchsia-50">
                {/* <!-- Modal content --> */}
                <div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                        <h3 className="text-lg font-medium text-heading">
                            Add New Link 
                        </h3>
                        <button onClick={onClose} type="button" className='hover:text-black' style={{ padding: '0px' }}>
                            <X className='text-white hover:text-black'/>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <Form action={''} onSubmit={handleSubmit(submitLinkRegistration)}>
                        <div className="grid gap-4 grid-cols-2 py-4 md:py-6">
                            <div className="col-span-2">
                                <label className="block mb-2.5 text-sm font-medium text-heading">Long URL</label>
                                <input type="text" placeholder='www.google.com' {...register('long_url',{required:true})} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"/>
                                {errors.long_url && <span className='text-red-500 mt-5'>{errors.long_url.message}</span>}
                            </div>
                            <div className="col-span-2">
                                <label className="block mb-2.5 text-sm font-medium text-heading">Description</label>
                                <textarea {...register('description',{required:true})} id="description" rows={4} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body" placeholder="Description here"></textarea>    
                                {errors.description && <span className='text-red-500 mt-5'>{errors.description.message}</span>}                
                            </div>
                            <div className="col-span-3">
                                <label className="block mb-2.5 text-sm font-medium text-heading">Short URL Link Activation Status</label>
                                <select {...register('is_active',{
                                    required:true,
                                    // Set value convert the value as booleans
                                    // allows you to transform or mutate an input's value before it is sent to the form state
                                    // Mutate the value type 
                                    setValueAs: (value) => value == 'true'
                                    } )} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs">
                                    <option value='true' defaultChecked>Active</option>
                                    <option value='false'>Not Active</option>
                                </select>
                                {errors.is_active && <span className='text-red-500 mt-5'>{errors.is_active.message}</span>}                
                            </div>
                            <div className='col-span-3'>
                                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-xs">
                                <div className="flex items-start gap-2">
                                    <span className="font-bold">⚠️ Notice:</span>
                                    <p>
                                    <span className="font-semibold">pendek</span> is a redirection service. We do not host or take responsibility for any third-party content. Users assume all liability for links created or visited.
                                    </p>
                                </div>
                                </div>                         
                            </div>
                            {
                                errorMessage && (
                                <div className='col-span-1'>
                                        <h3 className='text-red-500 mt-5'>{errorMessage.errors}</h3>
                                </div>
                                )
                            }
  
                        </div>
                        <div className="flex items-center space-x-4 border-t border-default pt-4 md:pt-6">
                            <button disabled={isSubmitting} type="submit" className="inline-flex items-center  text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                                {/* Use flex when you one to have entire html tag within same line */}
                                {isLoading ?                             
                                    <div className='flex items-center gap-5'>
                                        <LoaderCircle className='animate-spin'/>
                                        <div className='ease-linear'>Creating</div>
                                    </div>:
                                    <span className=''>Create</span> 
                                }
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div> 
    </div>

    </>
  )
}

export default ModalFormURL