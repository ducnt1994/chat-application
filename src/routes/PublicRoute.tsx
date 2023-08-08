import React  from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../utils/hooks/useAuth'


const PublicRoute = () => {

    const { authenticated } = useAuth()
  
	return authenticated ? <Navigate to={''} /> : <Outlet/>
}

export default PublicRoute