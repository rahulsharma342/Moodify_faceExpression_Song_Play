import axios from "axios";

const api=axios.create({
    baseURL:"http://localhost:3000/",
    withCredentials:true
})

export async function registerUser({email,password,username}){
    try {
        const response=await api.post("/api/auth/register",{email,password,username})
        return response.data
    } catch (error) {
        throw error.response.data
    }
}

export async function loginUser({email,password}){
    try {
        const response=await api.post("/api/auth/login",{email,password})
        return response.data
    } catch (error) {
        throw error.response.data
    }
}


export async function getCurrentUser(){
    try {
        const response =await api.get('/api/auth/get-me')
        return response.data
    } catch (err){
        throw err.response.data
    }
}


export async function logoutUser(){
    try {
        const response=await api.post("/api/auth/logout")
        return response.data
    } catch (error) {
        throw error.response.data
    }   
}