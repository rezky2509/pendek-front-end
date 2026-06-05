import { LoaderCircle,X, CircleAlert } from 'lucide-react'
import Form from 'next/form'
import { useEffect, useState } from 'react'
import { recentlyAddedLinkData } from '@/app/types/types'

// Type props definition
interface ModalProps {
    isOpen: boolean,
    // Reverting boolean values
    onClose: ()=>void
    // Not to be confuse with short url, but the id of the short url
    // Why optional ? because the data from the API response could be undefined. 
    payload?: recentlyAddedLinkData
}

// FC is react functional Component
const DeleteModal: React.FC<ModalProps> = ({isOpen, onClose, payload}) => {
// disable button during process
    const [isSubmitting,setIsSubmitting] = useState<boolean>(false)
        // Modal animation  
    const [isAnimated,setIsAnimated] = useState<boolean>(false)
        // IF the props recieve as isOpen false 
    const [isLoading,setIsLoading] = useState<boolean>(false)

    useEffect(()=>{
        console.log('Click from delete component')
        if(isOpen){
            const timerOpen = setTimeout(()=>setIsAnimated(true),5)
            return ()=>clearTimeout(timerOpen)
        }else{
            setIsAnimated(false)
        }
    },[isOpen])

    if(isOpen === undefined || isOpen === false){
        return null
    }

    // useForm hook is not require since the body request is not require in the API contract

    // No need to send zod validation because the body is not require 
    const handleDelete = async(payload: recentlyAddedLinkData) => {
        console.log(`Deleting`)
        setIsLoading(true)
        setIsSubmitting(true)
    }

    // Just reminder 
    // https://tailwindcss.com/docs/flex
    // https://tailwindcss.com/docs/grid-template-columns

  return (
    <>
        <div 
        className={`fixed inset-0 z-40 bg-gray-900/50 transition-opacity duration-300 ease-out ${
          isAnimated ? 'opacity-100' : 'opacity-0'
        }`} 
        onClick={onClose}>
        <div className="flex justify-center items-center fixed inset-0 bg-gray-900/50 dark:bg-gray-900/80"
        onClick={(e)=>{e.stopPropagation()}}>
            <div className="relative p-4 w-full max-w-xl max-h-full bg-fuchsia-50">
                {/* <!-- Modal content --> */}
                <div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                        <div className='grid gr'>
                            <CircleAlert className='flex items-center'/>
                        </div>
                        <h3 className="text-lg font-medium text-heading">
                            Delete Short url
                        </h3>
                        <button onClick={onClose} type="button" className='hover:text-black' style={{ padding: '0px' }}>
                            <X className='text-white hover:text-black'/>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <Form action={''}
                        onSubmit={(e) => { 
                        e.preventDefault(); 
                        // If payload exist, render or run the handle delete handler
                        if (payload) handleDelete(payload); }}>
                    {/* <Form action={''}> */}
                    <div className="grid grid-cols-1">
                        <div className="grid-cols-1">
                            <h1 className=''>You are about to delete the long url of <span className='font-bold'>{payload.long_url}</span></h1>
                        </div>
                        <div className="grid-cols-1 pt-5">
                            <h3 className=''>With the description of  <span className='font-bold'>{payload.description}</span></h3>
                        </div>
                    </div>
                        <div className="flex items-center space-x-4 border-t border-default pt-4 md:pt-6">
                            <button disabled={isSubmitting} type="submit" className="inline-flex items-center text-white bg-brand hover:bg-brand-red box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                                {/* Use flex when you one to have entire html tag within same line */}
                                {isLoading ?                             
                                    <div className='flex items-center gap-5'>
                                        <LoaderCircle className='animate-spin'/>
                                        <div className='ease-linear'>Deleting</div>
                                    </div>:
                                    <span className=''>Delete</span> 
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

export default DeleteModal