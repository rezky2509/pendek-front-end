'use client';
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Form from 'next/form'


// Form React Handler
import { useForm, SubmitHandler } from 'react-hook-form';
// Form Validation 
import { loginFormValidation, loginForm } from '../validation/loginValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginUser } from '../services/api';
import { errorResponse } from '../types/types';
import axios from 'axios';
// import { apiLoginResponse } from '../types/types';

const Page = () => {
    const [active, setActive] = useState<boolean>(true);
    const [errorDb,setErrorDb] = useState<boolean>(false);
    const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
    const [apiResponse,setErrorApiResponse] = useState<errorResponse>()

    // useRouter nextjs hook 
    const router = useRouter()

    useEffect(() => {
        const interval = setInterval(() => {
            setActive(prev => !prev);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // The type of useform is the one who infer to the zod schema
    const {register, handleSubmit, formState: {errors}} = useForm<loginFormValidation>({
        // Following zod schema
        resolver: zodResolver(loginForm)
    })

    const loginHandler: SubmitHandler<loginFormValidation> = async (data: loginFormValidation) => {
        setErrorDb(false)
        setIsAuthenticating(true)
        const loginValidation = loginForm.safeParse(data)
        if(loginValidation.success == true){
            const resultApi = await loginUser(data)
            console.log(resultApi)
            // If return Boolean true, redirect
            if(resultApi.success === true){
                router.push('/dashboard')
                // If error because of fail validation
            } else if (resultApi.success === false && resultApi.errorType === 'VALIDATION_ERROR') {
                console.info(resultApi.data?.errors)
                // This is not right since it does not give hint
                if(resultApi.data?.errors){
                    setErrorApiResponse({
                        errors:{
                            username: resultApi.data.errors                        }
                    })
                    setIsAuthenticating(false)
                }
                setIsAuthenticating(false)
            } else if(resultApi.success === false && resultApi.errorType =='SERVER_ERROR'){
                setErrorDb(true)
                setIsAuthenticating(false)
                setErrorApiResponse({
                    errors:{
                        serverError: resultApi.message
                    }
                })
            }
            setIsAuthenticating(false)
        }
    }


    return (
        <>
            <header>
                <div>Pendek</div>
            </header>

            <main>
                <div className="login-container">
                    <div className="login-header">
                        <h1 className="login-title mb-2 text-lg">LOGIN</h1>
                    </div>
                    {/* use the handlesubmit function from react hook form 
                    and send as loginhandler constant or variable */}
                    <Form action={''} onSubmit={handleSubmit(loginHandler)} id="login-form">
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">Username</label>
                            <input
                            {...register('username',{required: true})}
                            type="text" id="username" className="form-input" placeholder="monyet@boleh.com" required />
                        </div>

                        <div className="form-group" style={{ marginTop: '16px' }}>
                            <label className="form-label" htmlFor="password">PASSWORD</label>
                            <input 
                            {...register('password',{required: true})   }
                            type="password" id="password" className="form-input" placeholder="••••••••" required />
                        </div>
                        {apiResponse?.errors.username && 
                        <div className='bg-red-50 border border-red-500 p-5 text-red-600'>
                            {apiResponse.errors.username}
                        </div>
                        }
                        {apiResponse?.errors.serverError && 
                        <div className='bg-red-50 border border-red-500 p-5 pt-3 text-red-600'>
                            {apiResponse.errors.serverError}
                        </div>
                        }
                        <button type="submit" className="btn-submit" disabled={isAuthenticating}>
                            {isAuthenticating ? "AUTHENTICATING..." : "LOGIN"}
                        </button>
                    </Form>
                </div>
            </main>

            <footer>
                <div className="status-item">
                    <div className={`status-icon ${active ? 'active' : ''}`} id="pulse-icon"></div>
                    <span>API STATUS: READY</span>
                </div>
            </footer>
        </>
    )
}

export default Page