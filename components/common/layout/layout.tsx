import React, { useEffect, useState } from 'react'
import Navbar from '../elements/navbar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [user,setUser] = useState<any>();
  useEffect(()=>{
    setUser(localStorage.getItem("logindata") || '')
  },[])
  return (
    <>
    <Navbar user={user}/>    
    {children}
    </>
  )
}
export default Layout