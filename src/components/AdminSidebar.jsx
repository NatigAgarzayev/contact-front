import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../redux/features/adminSlice'

function AdminSidebar() {
    const dispatch = useDispatch()
    const [isDash, setIsDash] = useState({ dash: true, form: false, report: false })
    const handleLogout = () => {
        dispatch(logout())
        window.sessionStorage.removeItem('admin')
    }
    return (
        <div className=''>
            <div className="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"></div>

            <div className="min-h-screen h-full fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0">
                <div className="flex items-center justify-center mt-8">
                    <div className="flex items-center">
                        <svg className="w-12 h-12" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z" fill="#4C51BF" stroke="#4C51BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z" fill="white" />
                        </svg>

                        <span className="mx-2 text-2xl font-semibold text-white">Dashboard</span>
                    </div>
                </div>
                <nav className="mt-10">
                    <Link onClick={() => setIsDash({ dash: true, form: false, report: false })} className={isDash.dash ? "flex items-center px-6 py-2 mt-4 text-gray-100 bg-gray-700 bg-opacity-25 hover:bg-opacity-25 hover:text-gray-100" : "flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"} to="/admin">
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                        </svg>
                        <span className="mx-3">Dashboard</span>
                    </Link>

                    <Link onClick={() => setIsDash({ dash: false, form: true, report: false })} className={!isDash.form ? "flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100" : "flex items-center px-6 py-2 mt-4 text-gray-100 bg-gray-700 bg-opacity-25 hover:bg-opacity-25 hover:text-gray-100"} to="/admin/forms">
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span className="mx-3">Forms</span>
                    </Link>
                    <Link onClick={() => setIsDash({ dash: false, form: false, report: true })} className={!isDash.report ? "flex items-center fill-[#6B7280] px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100 hover:fill-white" : "flex items-center px-6 py-2 mt-4 fill-white text-gray-100 bg-gray-700 bg-opacity-25 hover:bg-opacity-25 hover:text-gray-100"} to="/admin/reports">
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M48 24C48 10.7 37.3 0 24 0S0 10.7 0 24V64 350.5 400v88c0 13.3 10.7 24 24 24s24-10.7 24-24V388l80.3-20.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L48 52V24zm0 77.5l96.6-24.2c27-6.7 55.5-3.6 80.4 8.8c54.9 27.4 118.7 29.7 175 6.8V334.7l-24.4 9.1c-33.7 12.6-71.2 10.7-103.4-5.4c-48.2-24.1-103.3-30.1-155.6-17.1L48 338.5v-237z" /></svg>
                        <span className="mx-3">Reports</span>
                    </Link>
                    <div onClick={handleLogout} className="flex cursor-pointer items-center px-6 py-2 mt-4 text-gray-500 fill-[#6B7280] hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100 hover:fill-white" to="/admin/forms">
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" /></svg>
                        <span className="mx-3">Logout</span>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default AdminSidebar