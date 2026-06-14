"use-client"

import React, { useEffect, useRef, useState } from 'react'
import { LoaderCircle, X } from 'lucide-react'

import QRCodeStyling from "qr-code-styling"

interface ModalQRProps {
    isOpen: boolean, 
    onClose: ()=> void,
    onSuccess:()=> void,
    short_url: string
}

const ModalQr: React.FC<ModalQRProps> = ({isOpen, onClose, short_url,onSuccess}:ModalQRProps) => {


    const [isAnimated, setIsAnimated] = useState<boolean>(false)

    // Image references
    const ref = useRef<HTMLDivElement>(null)
    const shortURLQRCode = useRef<QRCodeStyling | null>(null)

    const downloadQR = () => {
        setDownloadLoading(true)
        // When click 
        if(buttonRef.current){
            buttonRef.current.disabled = true
            // Take the current qrcode metadata
            setTimeout(()=>{
                setDownloadLoading(false)
                if(buttonRef.current){
                    buttonRef.current.disabled = false
                }
                shortURLQRCode.current?.download({
                    extension:"png",
                    name:short_url
                })
                // Close The modal
                onClose()
                // Run any function within the onSuccess
                onSuccess()
            },2000)
        }
        // Can use try catch instead nested if
        //           const handleSave = async () => {
        //     if (!buttonRef.current) return;

        //     try {
        //       // 1. Disable immediately
        //       buttonRef.current.disabled = true;

        //       // 2. Perform async operation
        //       await fetch('https://example.com', { method: 'POST' });
            
        //     } catch (error) {
        //       console.error('Failed to save:', error);
        //     } finally {
        //       // 3. Always re-enable in the 'finally' block to catch errors
        //       if (buttonRef.current) {
        //         buttonRef.current.disabled = false;
        //       }
        //     }
        //   };
    }
    const [downloadLoading,setDownloadLoading] = useState<boolean>(false)
    // Mutate the Button Tag 
    const buttonRef = useRef<HTMLButtonElement>(null)
    const generateQR = () => {
        if(ref.current && short_url){
            // Instantiate when first rendered
            // if the value current is null 
            if(!shortURLQRCode.current){
                shortURLQRCode.current = new QRCodeStyling({
                    dotsOptions:{
                        type: "extra-rounded"
                    },
                    cornersDotOptions:{
                        type:"extra-rounded"
                    },
                    qrOptions:{
                        typeNumber: 3,
                        mode: "Byte"
                    }
                })
            }
            // Clear previous content
            ref.current.innerHTML = ""
            shortURLQRCode.current.update({
                data: short_url
            })
            shortURLQRCode.current.append(ref.current)
        }
    }

    useEffect(()=>{
        generateQR()
        if(isOpen){
            const timerOpen = setTimeout(()=>setIsAnimated(true),5)
            return ()=>clearTimeout(timerOpen)
        }else{
            setIsAnimated(false)
        }
    },[])



  return (
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
                        </div>
                        <h3 className="text-lg font-medium text-heading">
                            QR Code
                        </h3>
                        <button onClick={onClose} type="button" className='hover:text-black' style={{ padding: '0px' }}>
                            <X className='text-white hover:text-black'/>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <div className="grid grid-cols-1 text-center">
                        <div className="grid-cols-1">
                            <h1 className=''>Your Short URL QR Code for {short_url}</h1>
                        </div>
                        {/* Always use flex when need to make content center */}
                        <div className="pt-5 flex justify-center rounded-2xl">
                            <div ref={ref}/>
                        </div> 
                        <div className='pt-5 flex justify-center'>
                            <button ref={buttonRef} onClick={downloadQR} className='bg-white rounded-2xl'>
                            {downloadLoading ? <LoaderCircle className='animate-spin'/> : <span>Download</span>}
                            </button>
                        </div> 
                    </div>
                        <div className="flex items-center space-x-4 border-t border-default pt-4 md:pt-6">
                        </div>
                </div>
            </div>
        </div> 
    </div>


  )
}

export default ModalQr
