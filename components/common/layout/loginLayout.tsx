import React from 'react'
import { ProtectedRouteLogin } from '../protectedRoute'

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    <ProtectedRouteLogin>
    {children}
    </ProtectedRouteLogin>
    </>
  )
}
export default LoginLayout