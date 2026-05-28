'use client';
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Form from 'next/form'

// Redirect import 
import { redirect } from 'next/navigation';

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
                setErrorApiResponse(resultApi.data)
                setErrorDb(false)
                setIsAuthenticating(false)
                // IF the error return as server error
            } else if(resultApi.success === false && resultApi.errorType =='SERVER_ERROR'){
                setErrorDb(true)
                setIsAuthenticating(false)
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
                        {apiResponse?.errors && <div className='pt-3 text-red-400'>{apiResponse.errors}</div>}

                        <button type="submit" className="btn-submit" disabled={isAuthenticating}>
                            {isAuthenticating ? "AUTHENTICATING..." : "LOGIN"}
                        </button>
                         { errorDb && <div className='pt-3 text-red-400'>Unable to connect to server. Please try again later</div>}
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