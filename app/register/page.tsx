'use client';
import React, { useState, useEffect, useRef, use } from 'react'
import Link from 'next/link'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import Form from 'next/form'
// Form validation tracks 
import {useForm, SubmitHandler} from 'react-hook-form'
// npm install react-hook-form
// This react hook form to track any error or invalid form 
import { formRegistration, schemaFormRegistration } from '../validation/formValidation';
import { zodResolver } from "@hookform/resolvers/zod";
import Footer from '@/components/Footer';
import { registerUser } from '../services/api';
import { redirect } from 'next/navigation';
import { errorResponse } from '../types/types';
// import { RegisterSchema, RegisterInput } from "../validation/formValidation";

const Page = () => {
    const [active, setActive] = useState(true);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [canAccept, setCanAccept] = useState(false);
    const [errorMessage,setErrorMessage] = useState<errorResponse>()
    const scrollRef = useRef<HTMLDivElement>(null);

    // This is the form module 
    // This register, handlesubmit and formstate
    const {register, handleSubmit, formState: {errors}} = useForm<formRegistration>({
        // Follow the schema that had been defined
        resolver: zodResolver(schemaFormRegistration)
    })

    useEffect(() => {
        const interval = setInterval(() => {
            setActive(prev => !prev);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
            // Allow a small margin of error (e.g. 10px) for bottom detection
            if (scrollTop + clientHeight >= scrollHeight - 10) {
                setCanAccept(true);
            }
        }
    };

    const handleCheckboxClick = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (!termsAccepted) {
            setDialogOpen(true);
            setCanAccept(false); // Reset acceptance state when opening
        } else {
            // Uncheck naturally if already accepted
            setTermsAccepted(false);
        }
    };

    const handleAcceptTerms = () => {
        setTermsAccepted(true);
        setDialogOpen(false);
    };
    
    // Custom submit handler
    // To access the value, need one argument whihch is the data that is type of the z objec
    // Need to be async because the data must wait the response from the server
    const submitForm: SubmitHandler<formRegistration> = async (data: formRegistration) =>{
        // You can do wiring to the backend using 'use server'
        // but it need to be asynchronous
        const resultValidate = schemaFormRegistration.safeParse(data)
        if(resultValidate.success){
            const result = await registerUser(resultValidate.data)
            if(result === true){
                redirect('/login')
            }
            else if(result){
                setErrorMessage(result)
            }
        }   
    }


    return (
        <>
            <header>
                <div>Pendek</div>
                <div className="nav-group">
                    <Link href="/login" className="nav-link">LOGIN</Link>
                </div>
            </header>

            <main>
                <Form action={''} onSubmit={handleSubmit(submitForm)}>
                <div className="register-container">
                    <div className="form-header">
                        <h1 className="form-title">CREATE_ACCOUNT</h1>
                    </div>

                    <div className="form-group">
                        {/* To store the input value, you can use the {...register('variableName')} within the input tag */}
                        <label className="form-label">USER_NAME</label>
                        <input type="text" {...register('username')} className="form-input" placeholder="your username" />
                        {errors.username && <span className='text-red-500 mb-2 mt-0'>{errors.username.message}</span>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">EMAIL_ADDRESS</label>
                        <input type="text" 
                        {...register('email',{required: true})} 
                        className="form-input" placeholder="your email" />
                        {/* // Error handle from react hook form  */}
                        {errors.email && <span className='text-red-500 mb-2 mt-0'>{errors.email.message}</span>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">PASSWORD</label>
                        <input type="password" {...register('password')} className="form-input" placeholder="••••••••••••" />
                        {errors.password && <span className='text-red-500 mb-2 mt-0'>{errors.password.message}</span>}
                    </div>

                    <div className="checkbox-group">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={termsAccepted}
                            required
                            onClick={handleCheckboxClick}
                            onChange={() => { }} // React controlled component notice suppression
                        />
                        <label htmlFor="terms">I accept the terms and condition.</label>
                    </div>
                    {errorMessage && <span className='text-red-500 mb-2 mt-5'>{ errorMessage.errors }</span>}
                    <button type="submit" className="btn-submit" >REGISTER</button>
                    <div className="form-footer">
                        Already have an account? <Link href="/login" className="form-link">LOGIN</Link>
                    </div>
                </div>
                </Form>
            </main>
            <Footer/>
            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <AlertDialogContent className="max-w-md max-h-[80vh] flex flex-col">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Terms and Conditions</AlertDialogTitle>
                        <AlertDialogDescription>
                            Please scroll to the bottom to accept the terms and conditions.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="my-4 overflow-y-auto flex-1 rounded-md border p-4 text-sm"
                        style={{ maxHeight: '40vh' }}
                    >
                        <p className="mb-4">
                            <strong className="mb-2">📄 Terms of Service for Pendek.ly</strong><br />
                            ⚠️ Service Disclaimer
                            This is a free service provided for personal use. It is not recommended for mission-critical business links, high-traffic marketing campaigns, or any use where 100% uptime is required
                        </p>
                        <p className="mb-4">
                            <strong>1. Acceptance of Terms</strong><br />
                            By accessing or using Pendek.ly, you agree to be bound by these Terms. If you do not agree, you are prohibited from using this service.
                        </p>
                        <p className="mb-4">
                            <strong>3. Service "As Is" & Availability</strong><br />
                            The service is provided on an "AS IS" and "AS AVAILABLE" basis.
                            No Uptime Guarantee: We cannot guarantee that the service or your shortened URLs will be available at all times.
                            No Liability for Downtime: We are not responsible for any server failures, maintenance, or technical glitches that may cause your links to stop working or make the website inaccessible.
                            Personal Use Only: Users acknowledge that this service is not designed for mission-critical enterprise use.
                        </p>
                        <p className="mb-4">
                            <strong>4. Prohibited Content</strong><br />
                            You are strictly prohibited from using Pendek.ly for:<br />
                            Adult Content: Pornography, sexually explicit material, or "NSFW" content.<br />
                            Illegal Activity: Malware, phishing, scams, or illegal substances.<br />
                            Abuse: Harassment, stalking, or any content that violates the rights of others.<br />
                            Penalty: We reserve the right to delete any link and ban any email address found violating these rules immediately and without notice.
                        </p>
                        <p className="mb-4">
                            <strong>5. Limitation of Liability</strong><br />
                            Under no circumstances shall Pendek.ly be liable for any direct, indirect, incidental, or consequential damages (including loss of profit, loss of data, or business interruption) arising out of the use or inability to use the service, even if we have been advised of the possibility of such damages.
                        </p>
                        <p className="mb-4">
                            <strong>6. Termination & Link Expiration</strong><br />
                            We reserve the right to modify, suspend, or discontinue the service, or delete any user account or shortened link, at any time and for any reason without prior notice or liability.
                        </p>
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={(e) => {
                                if (!canAccept) e.preventDefault();
                                else handleAcceptTerms();
                            }}
                            disabled={!canAccept}
                            className={!canAccept ? "opacity-50 cursor-not-allowed" : ""}
                        >
                            I Accept
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default Page
