"use server"
// This tells Next.js: "Run this code only on the server"

// This is the api call defintion.
// const API_TOKEN = turborepoTraceAccess
// Cannot use VITE because NextJS had built in runtime turbopack

// Axios 
import axios, { AxiosError } from 'axios'

// Store the token on cookies
import { cookies, headers } from 'next/headers';

// Type Safety
import { formRegistration } from '../validation/formValidation';
import { loginFormValidation } from '../validation/loginValidation';
import { apiLoginResponse, dashboardMetaData, errorResponse, API_RESPONSE, recentlyAddedLinksData, userLinkRegistration } from '../types/types';
import { success } from 'zod';
import { fa } from 'zod/v4/locales';


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


export async function apiStatus(){
    console.log('Calling Server')
    // console.log(BASE_URL)
    if(BASE_URL == undefined){
        console.error('Server is not configured. Please contact the owner')
        return false
    }
    // try{
    //      const statusApi = await fetch(BASE_URL+'/api-test')
    //      if(statusApi.ok){
    //         console.log('Connected')
    //         return true
    //      }
    //      return true
    // }catch(error){
    //     console.error(error)
    //     return false
    // }
}   

// This work. Need to return the result only. 
export async function registerUser(userData: formRegistration){
    try {
        const result = await axios.post(BASE_URL+"/api/users",{            
            username:userData.username,
            password:userData.password,
            email:userData.email
        })
        if(result.status == 201){
            return true
        }
        else if(result.status == 400){
            return result.data as errorResponse
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        }
        return false
    }
}

export async function loginUser(userData: loginFormValidation){
    try {
        const result = await axios.post(BASE_URL+"/api/users/login",{
            username: userData.username,
            password: userData.password
        }, {
            validateStatus: () => true // Don't throw on any status code
        })

        if (result.status === 200) {
            const payload = result.data as apiLoginResponse
            if (payload.data.token) {
                const storeCookie = await cookies()
                storeCookie.set("token", payload.data.token, {
                    httpOnly: true,
                    sameSite : 'strict',
                    path: '/'
                })
                return  {success: true}
            }
        }

        console.log('Returning as an error')
        return {success: false, errorType: "VALIDATION_ERROR", data: result.data as errorResponse}
    } catch (error: unknown) {
        return {success: false, errorType: 'SERVER_ERROR', message:"Unable to reach the server. Please try again later"}
    }
}

export async function getURLlist():Promise<API_RESPONSE<recentlyAddedLinksData>>{
    try 
    {   
        const userCookies = await cookies()
        const token = userCookies.get('token')
        const result = await axios.get(BASE_URL+"/api/url_mapper/lists",{
            headers:{
                Authorization: token?.value 
            }
        })
        if(result.status === 200){
            // not suitable using type API_RESPONSE
            // It need to return the data as well
            return {success: true, payload: result.data}
        }
        return {success: false, errorType: "VALIDATION_ERROR", data: result.data as errorResponse}
        
    } catch (error) {
        return {success: false, errorType: "SERVER_ERROR", message: "Unable to connect server. Please try again later"}
    }
}

// Calling Dashboard Metadata
export async function dashboardData(){
        try {
        const userCookies = await cookies()
        const token = userCookies.get('token')?.value
        const result = await axios.get(BASE_URL+"/api/url_mapper/dashboard/overview",{
            headers: {
                Authorization: token
            }
        })
        if (result.status === 200) {
            // console.log(result.data)
            return result.data
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        }
        return false
    }
}

// Logging Out (Calling the API to delete the token and the cookies)
export async function logoutUser(){
    try{
        const userCookies = await cookies()
        const token = userCookies.get('token')?.value
        const result = await axios.delete(BASE_URL+"/api/users/current",{
            headers:{
                Authorization: token ? `Bearer ${token}` : ''
            }
        })
        return result.status == 200
    }catch{
        return false
    }
}

// check token Validity 
export async function isTokenValid(){
    console.log('Token Validity Function Called')
    try{
        console.log('Calling API...')
        const userCookies = await cookies()
        const token = userCookies.get('token')?.value
        if (!token) {
            return false
        }
        const result = await axios.get(BASE_URL+"/api/users/current",{
            headers:{
                Authorization: token
            }
        })
        if(result.status == 200){
            console.log('Token is Valid')
            return true
        }
        return false
    }
    catch{
        return false
    }
}

export async function linkURLRegistration(userData: userLinkRegistration){
    try {
        const userCookies = await cookies()
        const token = userCookies.get('token')?.value
        // if(!token){
        //     return {success: false, errorType: "VALIDATION_ERROR", data: ""}
        // }
        // Axios function 
        // axios.(httpmethod).(BASEURL+ENDPOINT+{THIS IS THE PAYLOAD},{header})
        const result = await axios.post<userLinkRegistration>(BASE_URL+"/api/url_mapper",{
                long_url: userData.long_url,
                description: userData.description,
                is_active: userData.is_active
        },{
            headers:{
                Authorization: token
            }
        }) 
        console.log("Checking Result")

        if(result.status === 201) {
            return { success: true, payload: result.data}
        }else if(result.status === 400 ){
            return { success: false, errorType: "VALIDATION_ERROR", data:result.data}
        } else if(result.status === 401) {
            return { success: false, errorType: "VALIDATION_ERROR", data:result.data}
        }
    } catch (error) {
        console.error('Server Error')
        return {success: false, errorType:"SERVER_ERROR",message:"Server is not responding"}
    }
}
