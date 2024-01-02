import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AdminHeader from './AdminHeader'
import { isAdminHere } from '../redux/features/adminSlice'
import AdminSidebar from './AdminSidebar'
function AdminLayout() {
    const navigate = useNavigate()
    const { status } = useSelector(state => state.admin)
    const isAuthAdmin = useSelector(isAdminHere)
    useEffect(() => {
        setTimeout(() => {
            if (!isAuthAdmin) navigate('/admin/login')
        }, 100)
    }, [status, isAuthAdmin])
    return (
        <div className='flex'>
            <AdminSidebar />
            <div className='flex-1'>
                <AdminHeader />
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout