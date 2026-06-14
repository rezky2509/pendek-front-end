"use server"
// This tells Next.js: "Run this code only on the server"

// This is the api call defintion.
// const API_TOKEN = turborepoTraceAccess
// Cannot use VITE because NextJS had built in runtime turbopack

// Axios 
import axios, { AxiosError, isAxiosError } from 'axios'

// Store the token on cookies
import { cookies, headers } from 'next/headers';

// Type Safety
import { formRegistration } from '../validation/formValidation';
import { loginFormValidation } from '../validation/loginValidation';
import { apiLoginResponse, dashboardMetaData, errorResponse, API_RESPONSE, recentlyAddedLinksData, userLinkRegistration, errorAddURLResponse, errorsAddURLResponse } from '../types/types';
import { linkRegistration } from '../validation/linkRegistrationValidation';

const BASE_URL = process.env.NEXT_DEVELOPMENT_BASE_URL;
// const BASE_URL = process.env.NEXT_AWS_EC2_BASE_URL;


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
// Refactor
export async function registerUser(userData: formRegistration):Promise<API_RESPONSE<errorResponse>>{
    try {
        console.log('Registering')
        const result = await axios.post(BASE_URL+"/api/users",{            
            username:userData.username,
            password:userData.password,
            email:userData.email
        }, {
            validateStatus: () => true // Don't throw on any status code
        })
        if(result.status == 201){
            return {success: true}
        }
        // Safety net if the result http response is not 200
        // as axios only accept 200 as success
        return {success: false, errorType: "VALIDATION_ERROR", data: result.data as errorResponse}
    } catch (error: unknown) {
        if(axios.isAxiosError(error)){
            // Enter here to handle either 500 server error
            console.log('Enter Axios Error')
            console.info(error.cause)
            if(error.response?.status === 500){
                return {success: false, errorType:'SERVER_ERROR', message:'Unable to reach server. Please try again later'}
            }
            // Unable to reach server and no response from server
            else if(error.code === 'ECONNREFUSED'){
                return {success: false, errorType:'SERVER_ERROR', message:'Unable to reach server. Please try again later'}
            }
            // Axios handle 400 as an error
            // Handle for bad request from the user input
            return {success: false, errorType: "VALIDATION_ERROR", data: error.response?.data}
        }
        return {success: false, errorType: "SERVER_ERROR", message: "Unable to reach server. Please try again later"}
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
                    expires: 30,
                    // Keeps it alive for 30 days instead of a "Session"
                    maxAge: 60 * 60 * 24 * 30,
                })
                return  {success: true}
            }
        }
        // Handle response 401 ???
        console.log('Returning as an error')
        console.log(result)
        return {success: false, errorType: "VALIDATION_ERROR", data: result.data}
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
            },
            validateStatus: () => true // Don't throw on any status code
        })
        if(result.status === 200){
            // not suitable using type API_RESPONSE
            // It need to return the data as well
            return {success: true, payload: result.data.data}
        }
        return {success: false, errorType: "VALIDATION_ERROR", data: result.data.data as errorResponse}
        
    } catch (error) {
        return {success: false, errorType: "SERVER_ERROR", message: "Unable to connect server. Please try again later"}
    }
}

export async function patchURL(urlDetail: linkRegistration, urlID: string): Promise<API_RESPONSE<recentlyAddedLinksData>> {
    try {
        console.log(`The url id ${urlID}`)
        const userCookies = await cookies()
        const token = userCookies.get('token')
        const result = await axios.patch(BASE_URL+"/api/url_mapper/"+urlID,{
            long_url: urlDetail.long_url,
            description: urlDetail.description,
            is_active: urlDetail.is_active
        },{
            headers: {
                Authorization: token?.value
            },
            validateStatus: () => true // Don't throw on any status code
        })
        console.info(result.data)
        if(result.status === 200){
            return {success: true}
        }
        return {success: false, errorType: "VALIDATION_ERROR", data:result.data}
    } catch (error) {
        return {success: false, errorType: "SERVER_ERROR",message:"Unable to connect to server. Please try again later"}
    }
}

// Calling Dashboard Metadata
export async function dashboardData():Promise<API_RESPONSE<dashboardMetaData>>{
        try {
        const userCookies = await cookies()
        const token = userCookies.get('token')?.value
        const result = await axios.get(BASE_URL+"/api/url_mapper/dashboard/overview",{
            headers: {
                Authorization: token
            },
            validateStatus: () => true // Don't throw on any status code
        })
        if (result.status === 200) {
            // The .data and .data. The first is from axios and second chaining is from API response
            return {success:true, payload: result.data.data}
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            // return error.response?.data
            return {success: false, errorType: "SERVER_ERROR", message:'Unable to reach server. Please try again'}
        }else if(! axios.isAxiosError(error)){
            // Validation Error 
            return {success: false, errorType:"VALIDATION_ERROR", data: error}
        }
        
    }

    return {success: false, errorType:"SERVER_ERROR",message:"Please Try again later"}
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

export async function linkURLRegistration(userData: userLinkRegistration):Promise<API_RESPONSE<errorsAddURLResponse>>{
    try {
        const userCookies = await cookies()
        const token = userCookies.get('token')?.value
        const result = await axios.post(BASE_URL+"/api/url_mapper",{
                // long_url: userData.long_url,
                // description: userData.description,
                // is_active: userData.is_active
        },{
            headers:{
                Authorization: token
            },
            validateStatus: () => true // Don't throw on any status code
        }) 
        console.log("Checking Result")

        if(result.status === 201) {
            return { success: true}
        }
        return {success: false, errorType:"VALIDATION_ERROR", data: result.data as errorsAddURLResponse}
    } catch (error) {

        // AxiosERror can use generics 
        // const axiosError = error as AxiosError<ValidationErrorResponse>;

        // Axios handle HTTP response 400, 500 within the catch error scope
        if(axios.isAxiosError(error)){
            if(error.code === 'ECONNREFUSED'){
                return {success: false, errorType:"SERVER_ERROR", message:'Unable to Reach Server'}
            }else if(error.status === 500){
                return {success: false, errorType:"SERVER_ERROR", message:'Unable to Reach Server'}
            }
            // If none of these, it should return 400 error
            return {success: false, errorType:"VALIDATION_ERROR", data: error.response?.data as errorsAddURLResponse}
        }
        return {success: false, errorType:"SERVER_ERROR", message:'Unable to Reach Server'}

    }
}

export async function deleteLink(link_id: string){
    console.log(`The url ID is ${link_id}`)
    try {
        const userCookies = await cookies()
        const token = userCookies.get('token')?.value
        const result = await axios.delete(BASE_URL+"/api/url_mapper/"+link_id,{
            headers: {
                Authorization: token
            },
            validateStatus: () => true // Don't throw on any status code
        })
        if(result.status === 204){
            return {success: true}
        }
    } catch (error) {
        return {success:false, errorType: "Server Error", data: "ERROR"}
    }   
}
