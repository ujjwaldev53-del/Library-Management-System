import React from 'react'
import { createContext , useContext , useState , useEffect } from 'react'
const AuthContext = createContext ()

export const useAuth = () =>{
 return useContext(AuthContext)
}
export const AuthProvider = ({children}) =>{
const [user , setUser] = useState(null)
const [token , setToken ] = useState(null)

 useEffect (() =>{
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')
    if(storedToken && storedUser){
    setToken(storedToken)
    setUser(JSON.parse(storedUser))
}

},[])
 const login = (userData , tokenData) =>{
 setUser(userData)
 setToken(tokenData)
 localStorage.setItem('user' , JSON.stringify(userData))
 localStorage.setItem('token' , tokenData)
 }
 const logout = () =>{
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
 }
 return <AuthContext.Provider value={{user, token, login, logout}}>{children}</AuthContext.Provider>
}
