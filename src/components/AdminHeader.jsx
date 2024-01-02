import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/features/adminSlice'
import { baseURL } from '../utils/constant'
function AdminHeader() {
    const dispatch = useDispatch()

    const [drop, isDrop] = useState(false)
    const { admin } = useSelector(state => state.admin)
    const handleLogout = () => {
        dispatch(logout())
        window.sessionStorage.removeItem('admin')
    }
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Admin Dashboard</title>
            </Helmet>
            <header className="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-indigo-600">
                <div className="flex items-center">
                    <button className="text-gray-500 focus:outline-none lg:hidden">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <div className="flex items-center justify-between w-full">
                    <div className="w-78 whitespace-nowrap overflow-hidden">
                        <p className="banner__cycle text-3xl font-medium">Admin Dashborad - use <span className='font-bold'>{admin?.username || 'ralp'}</span> right now</p>
                    </div>
                    <div className="relative">
                        <div className='flex items-center gap-5'>
                            <p className='font-bold'>{admin?.username}</p>
                            <button onClick={() => isDrop(true)} className="relative block w-12 h-12 overflow-hidden rounded-full shadow focus:outline-none">
                                <img className="object-cover w-12 h-12" src={`${baseURL}/${admin?.avatar}`} alt="Your avatar" />
                            </button>
                        </div>

                        <div onClick={() => isDrop(false)} x-show="dropdownOpen" className={drop ? "fixed inset-0 z-10 w-full h-full" : "hidden fixed inset-0 z-10 w-full h-full"}></div>

                        <div x-show="dropdownOpen" className={drop ? "absolute right-0 z-10 w-36 mt-2 overflow-hidden bg-white rounded-md shadow-xl" : "absolute hidden right-0 z-10 w-36 mt-2 overflow-hidden bg-white rounded-md shadow-xl"}>
                            <button onClick={handleLogout} className="block border w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Logout</button>
                        </div>
                    </div >
                </div >
            </header >
        </div >
    )
}

export default AdminHeader