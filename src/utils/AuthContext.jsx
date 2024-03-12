// eslint-disable-next-line no-unused-vars
import React, { createContext ,useState,useEffect, useContext } from "react";
import { account } from "../appwriteconfig";
import { useNavigate } from 'react-router-dom';
const AuthContext =createContext();

export const AuthProvider=({children})=>{
    const navigate=useNavigate();
    const [loading,setLoading]=useState(true);
    const [user,setUser]=useState(null);
    useEffect(()=>{ 
        getUserOnLoad();
        
    },[]);
    const getUserOnLoad=async()=>{
        try{
            const accountDetails=await account.get();
            setUser(accountDetails);
            console.log("userloaded")
            
        }catch(error){
            console.error(error)    
        }
        setLoading(false)
        
    }

    const handleUserLogin=async (e, credentials)=>{
        e.preventDefault()
        try{
            const response = await account.createEmailSession(credentials.email, credentials.password);
            console.log(response)
            const accountDetails=await account.get();
            setUser(accountDetails);
            navigate('/')
            
        }catch(error){
            console.error(error)
        }
    }
    const handleLogout=async ()=>{
        await account.deleteSession('current')
        setUser(null)
    }
    const contextData ={
        user,handleUserLogin,handleLogout
    }

    return <AuthContext.Provider value={contextData}>
        {loading?<p>Loading...</p>:children}
    </AuthContext.Provider>
}
export const userAuth =()=>{return useContext(AuthContext) }
export default AuthContext