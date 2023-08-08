import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

const ProtectedRoute = () => {

	const location = useLocation()

	return <Outlet />
}

export default ProtectedRoute