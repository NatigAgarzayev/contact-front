import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { checkIsAuth, logout } from '../redux/features/authSlice'
import { toast } from 'react-toastify'
import premium_team from '../images/premium-team.png'
import MyFollowers from './MyFollowers'
import Settings from './Settings'
function SidebarLeft() {
    const dispatch = useDispatch()
    const isAuth = useSelector(checkIsAuth)
    const [modal, setModal] = useState(false)
    const [setting, setSetting] = useState(false)
    const handleLogout = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
        toast.info('You logged out!')
    }

    return (
        <div className=''>
            {
                isAuth
                    ? (<div className=" flex flex-col justify-center px-0 h-screen bg-white shadow dark:bg-gray-700 text-white">
                        <div className="space-y-3 flex flex-col items-center text-left">
                            <div className="flex items-center">
                                <h2 className="ml-4 xl:ml-16 text-xl font-light uppercase text-black dark:text-white">Menu</h2>
                            </div>
                            <div className="flex-1 justify-center">
                                <ul className="pt-2 pb-4 space-y-1 text-sm">
                                    <li className="rounded-sm hover:bg-blue-600/20   dark:hover:bg-white/20">
                                        <NavLink
                                            to="/"
                                            className="flex items-center p-2 pl-4 xl:pl-16 space-x-3 rounded-md"
                                        >
                                            <svg className='dark:fill-white' width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="#374151" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M16 24C16.8284 24 17.5 23.3284 17.5 22.5C17.5 21.6716 16.8284 21 16 21C15.1716 21 14.5 21.6716 14.5 22.5C14.5 23.3284 15.1716 24 16 24Z" fill="#374151" />
                                                <path d="M16 18V17C16.6922 17 17.3689 16.7947 17.9445 16.4101C18.5201 16.0256 18.9687 15.4789 19.2336 14.8394C19.4985 14.1999 19.5678 13.4961 19.4327 12.8172C19.2977 12.1383 18.9644 11.5146 18.4749 11.0251C17.9854 10.5356 17.3617 10.2023 16.6828 10.0673C16.0039 9.9322 15.3001 10.0015 14.6606 10.2664C14.0211 10.5313 13.4744 10.9799 13.0899 11.5555C12.7053 12.1311 12.5 12.8078 12.5 13.5" stroke="#374151" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span className='font-bold text-gray-700 dark:text-white'>Posts</span>
                                        </NavLink>
                                    </li>
                                    <li onClick={() => setSetting(true)} className="rounded-sm cursor-pointer hover:bg-blue-600/20   dark:hover:bg-white/20">
                                        <div

                                            className="flex items-center p-2 pl-4 xl:pl-16 space-x-3 rounded-md"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-6 h-6 dark:stroke-white"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="#374151"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                            <span className='font-bold text-gray-700 dark:text-white'>Settings</span>
                                        </div>
                                    </li>
                                    <li className="rounded-sm hover:bg-blue-600/20   dark:hover:bg-white/20">
                                        <NavLink
                                            onClick={handleLogout}
                                            to="/login"
                                            className="flex items-center p-2 pl-4 xl:pl-16 space-x-3 rounded-md"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-6 h-6 dark:stroke-white"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="#374151"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                                />
                                            </svg>
                                            <span className='font-bold text-gray-700 dark:text-white'>Logout</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>


                            <div className="flex items-center">
                                <h2 className="ml-4 xl:ml-16 text-xl font-light uppercase text-black dark:text-white">Personal</h2>
                            </div>
                            <div className="flex-1">
                                <ul className="pt-2 pb-4 space-y-1 text-sm">
                                    <li className="rounded-sm hover:bg-blue-600/20   dark:hover:bg-white/20">
                                        <NavLink
                                            to="/posts"
                                            className="flex items-center p-2 pl-4 xl:pl-16 space-x-3 rounded-md"
                                        >
                                            <svg className='dark:fill-white' width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="#374151" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M16 24C16.8284 24 17.5 23.3284 17.5 22.5C17.5 21.6716 16.8284 21 16 21C15.1716 21 14.5 21.6716 14.5 22.5C14.5 23.3284 15.1716 24 16 24Z" fill="#374151" />
                                                <path d="M16 18V17C16.6922 17 17.3689 16.7947 17.9445 16.4101C18.5201 16.0256 18.9687 15.4789 19.2336 14.8394C19.4985 14.1999 19.5678 13.4961 19.4327 12.8172C19.2977 12.1383 18.9644 11.5146 18.4749 11.0251C17.9854 10.5356 17.3617 10.2023 16.6828 10.0673C16.0039 9.9322 15.3001 10.0015 14.6606 10.2664C14.0211 10.5313 13.4744 10.9799 13.0899 11.5555C12.7053 12.1311 12.5 12.8078 12.5 13.5" stroke="#374151" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>

                                            <span className='font-bold text-gray-700 dark:text-white'>My Posts</span>
                                        </NavLink>
                                    </li>
                                    <li onClick={() => setModal(true)} className="flex items-center cursor-pointer rounded-sm hover:bg-blue-600/20   dark:hover:bg-white/20">
                                        <div
                                            className="flex items-center p-2 pl-4 xl:pl-16 space-x-3 rounded-md"
                                        >
                                            <svg className='dark:fill-white' width="24" height="20" xmlns="http://www.w3.org/2000/svg" fill='#374151' viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" /></svg>
                                            <span className='font-bold text-gray-700 dark:text-white'>My Followers</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {
                                modal && (
                                    <>
                                        <div onClick={() => setModal(false)} className='w-full h-screen cursor-pointer absolute -top-[12px] left-0 z-20 overflow-hidden bg-black/20'>
                                        </div>
                                        <MyFollowers />
                                    </>
                                )
                            }
                            {
                                setting && (
                                    <>
                                        <div onClick={() => setSetting(false)} className='w-full h-screen cursor-pointer absolute -top-[12px] left-0 z-20 overflow-hidden bg-black/20'>
                                        </div>
                                        <Settings />
                                    </>
                                )
                            }
                            <div className="flex-1 pt-28 pl-3 hidden xl:block">
                                <div className="w-[270px] h-[270px] bg-cyan-600/30 rounded-xl dark:bg-white/30">
                                    <img className='-translate-y-16 mx-auto select-none' src={premium_team} alt="" />
                                    <div className='-mt-14'>
                                        <p className='text-center font-medium text-xl mb-5 text-gray-800 dark:text-white'>Upgrade to Premium</p>
                                        <button type="button" className="text-white bg-cyan-600 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center mx-auto gap-3 dark:bg-white text-black">
                                            <svg className='dark:fill-black' width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path className='dark:stroke-black' d="M4 15L16 3L28 15H22V19H10V15H4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path className='dark:stroke-black' d="M22 27H10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path className='dark:stroke-black' d="M22 23H10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>

                                            <span className='text-xl font-normal text-white dark:text-black'>Upgrade Now</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button type="button" className=" bg-cyan-600 xl:hidden hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center mx-auto gap-3 dark:bg-white text-black">
                                <svg className='dark:fill-black' width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className='dark:stroke-black' d="M4 15L16 3L28 15H22V19H10V15H4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path className='dark:stroke-black' d="M22 27H10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path className='dark:stroke-black' d="M22 23H10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>)
                    :
                    (<div className="relative pt-20 flex flex-col h-screen bg-white shadow w-[300px] dark:bg-gray-700 text-white">
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <h2 className="l-4 xl:ml-16 text-xl font-light uppercase text-black dark:text-white">Menu</h2>
                            </div>
                            <div className="flex-1">
                                <ul className="pt-2 pb-4 space-y-1 text-sm">
                                    <li className="rounded-sm hover:bg-blue-600/20   dark:hover:bg-white/20">
                                        <Link
                                            to="/login"
                                            className="flex items-center p-2 pl-4 xl:pl-16 space-x-3 rounded-md"
                                        >
                                            <svg className='dark:fill-white' width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="#374151" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M16 24C16.8284 24 17.5 23.3284 17.5 22.5C17.5 21.6716 16.8284 21 16 21C15.1716 21 14.5 21.6716 14.5 22.5C14.5 23.3284 15.1716 24 16 24Z" fill="#374151" />
                                                <path d="M16 18V17C16.6922 17 17.3689 16.7947 17.9445 16.4101C18.5201 16.0256 18.9687 15.4789 19.2336 14.8394C19.4985 14.1999 19.5678 13.4961 19.4327 12.8172C19.2977 12.1383 18.9644 11.5146 18.4749 11.0251C17.9854 10.5356 17.3617 10.2023 16.6828 10.0673C16.0039 9.9322 15.3001 10.0015 14.6606 10.2664C14.0211 10.5313 13.4744 10.9799 13.0899 11.5555C12.7053 12.1311 12.5 12.8078 12.5 13.5" stroke="#374151" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>

                                            <span className='font-bold text-gray-700 dark:text-white'>Login</span>
                                        </Link>
                                    </li>
                                    <li className="rounded-sm hover:bg-blue-600/20   dark:hover:bg-white/20">
                                        <Link
                                            to="/register"
                                            className="flex items-center p-2 pl-4 xl:pl-16 space-x-3 rounded-md"
                                        >
                                            <svg className='dark:fill-white' width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="#374151" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M16 24C16.8284 24 17.5 23.3284 17.5 22.5C17.5 21.6716 16.8284 21 16 21C15.1716 21 14.5 21.6716 14.5 22.5C14.5 23.3284 15.1716 24 16 24Z" fill="#374151" />
                                                <path d="M16 18V17C16.6922 17 17.3689 16.7947 17.9445 16.4101C18.5201 16.0256 18.9687 15.4789 19.2336 14.8394C19.4985 14.1999 19.5678 13.4961 19.4327 12.8172C19.2977 12.1383 18.9644 11.5146 18.4749 11.0251C17.9854 10.5356 17.3617 10.2023 16.6828 10.0673C16.0039 9.9322 15.3001 10.0015 14.6606 10.2664C14.0211 10.5313 13.4744 10.9799 13.0899 11.5555C12.7053 12.1311 12.5 12.8078 12.5 13.5" stroke="#374151" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>

                                            <span className='font-bold text-gray-700 dark:text-white'>Sign Up</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="flex-1 absolute bottom-28 pl-3 hidden xl:block">
                                <div className="w-[270px] h-[270px] bg-cyan-600/30 rounded-xl">
                                    <img className='-translate-y-16 mx-auto select-none' src={premium_team} alt="" />
                                    <div className='-mt-14'>
                                        <p className='text-center font-medium text-xl mb-5 text-gray-800 dark:text-white'>Upgrade to Premium</p>
                                        <button type="button" className="text-white bg-cyan-600 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center mx-auto gap-3 dark:bg-white text-black">
                                            <svg className='dark:fill-black' width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path className='dark:stroke-black' d="M4 15L16 3L28 15H22V19H10V15H4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path className='dark:stroke-black' d="M22 27H10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path className='dark:stroke-black' d="M22 23H10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>

                                            <span className='text-xl font-normal text-white dark:text-black'>Upgrade Now</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button type="button" className=" bg-cyan-600 xl:hidden hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center mx-auto gap-3 dark:bg-white text-black">
                                <svg className='dark:fill-black' width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className='dark:stroke-black' d="M4 15L16 3L28 15H22V19H10V15H4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path className='dark:stroke-black' d="M22 27H10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path className='dark:stroke-black' d="M22 23H10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>)
            }
        </div>
    )
}

export default SidebarLeft