import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../images/logo-main.svg'
import { checkIsAuth, logout } from '../redux/features/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Settings from './Settings'
import { getUserAvatar } from '../redux/features/profileSlice'
import { getUserNotification, readNotificationByUser } from '../redux/features/notificationsSlice'
import { baseURL } from '../utils/constant'

function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuth = useSelector(checkIsAuth)
    let { posts } = useSelector(state => state.post)
    const userInfo = (useSelector((state) => state.auth.user))
    const [search, setSearch] = useState('')
    const [setting, setSetting] = useState(false)
    const [isSearch, setIsSearch] = useState(false)
    const { avatar } = useSelector(state => state.profile)
    const { user } = useSelector(state => state.auth)
    const { notifications } = useSelector(state => state.notification)
    const [not, setNot] = useState(false)
    useEffect(() => {
        dispatch(getUserAvatar(user?._id))
        dispatch(getUserNotification())
    }, [user?._id, dispatch])

    const logoutHandle = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
        toast('You logged out!')
    }

    const handleProfile = (id) => {
        navigate(`profile/${id}`)
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
        if (e.target.value.trim() === '') {
            setIsSearch(false)
        }
        else {
            setIsSearch(true)
        }
    }

    const handleRead = async (id) => {
        await dispatch(readNotificationByUser(id))
        dispatch(getUserNotification())
    }


    return (
        <div className='py-3 relative z-10 shadow-md dark:bg-gray-800'>
            {
                setting && (
                    <>
                        <div onClick={() => setSetting(false)} className='w-full h-screen cursor-pointer absolute top-0 left-0 z-50 overflow-hidden bg-black/20'>
                        </div>
                        <div className='h-screen -top-[12px] absolute left-1/2'><Settings /></div >
                    </>
                )
            }
            <div className="lg:container mx-auto px-2">

                <div className='flex items-center justify-between gap-5'>
                    <Link to='/' className="flex items-center gap-2 ">
                        <img src={logo} alt="Connect" />
                        <h2 className=' md:block text-2xl font-bold text-black dark:text-white'>Connect</h2>
                    </Link>
                    {
                        isAuth
                            ? (
                                <React.Fragment>
                                    <div className='hidden sm:block'>
                                        <div className=''>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                                </div>
                                                <input value={search} onChange={handleSearch} type="text" id="default-search" className="sm:w-[234px] md:w-[434px] lg:w-[636px] p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Posts" autoComplete="off" />
                                                <ul className={isSearch ? "border overflow-hidden rounded-lg w-full absolute bg-white dark:bg-gray-600" : "hidden"}>
                                                    {
                                                        isSearch &&
                                                        (posts
                                                            .filter(item => item.title.toLowerCase().includes(search.toLowerCase())).length !== 0 ? posts
                                                                .filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
                                                                .map(item => (
                                                                    <li key={item?._id} onClick={() => { navigate(`/${item._id}`); setSearch(''); setIsSearch(false) }} className='w-full p-5 text-gray-900 bg-slate-200 cursor-pointer font-semibold hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-800'>{item.title}</li>
                                                                ))
                                                            :
                                                            <div className='text-center text-xl py-5 text-slate-400'>Not found</div>)
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='z-10 flex gap-10 items-center'>
                                        <div className='relative'>
                                            <div onClick={() => setNot(true)} className='relative z-20 hover:bg-gray-200/80 cursor-pointer rounded-full w-[40px] h-[40px] flex items-center justify-center'>
                                                <svg width="22" height="30" viewBox="0 0 22 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M16 15C16 13.4087 15.3679 11.8826 14.2426 10.7574C13.1174 9.63214 11.5913 9 10 9C8.4087 9 6.88258 9.63214 5.75736 10.7574C4.63214 11.8826 4 13.4087 4 15C4 22 1 24 1 24H19C19 24 16 22 16 15Z" stroke="#808080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M11.73 28C11.5542 28.3031 11.3019 28.5547 10.9982 28.7295C10.6946 28.9044 10.3504 28.9965 10 28.9965C9.64964 28.9965 9.30541 28.9044 9.00179 28.7295C8.69818 28.5547 8.44583 28.3031 8.27002 28" stroke="#808080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <circle className={notifications?.length > 0 ? null : 'hidden'} cx="14.5" cy="7.5" r="6.5" fill="#4E9BB9" stroke="" strokeWidth="2" />
                                                </svg>
                                                <span className={notifications?.length > 0 ? "absolute animate-ping inline-flex rounded-full top-[7.2px] right-[11.5px] h-[10px] w-[10px] bg-sky-500" : 'hidden'}></span>
                                            </div>
                                            {
                                                not && (
                                                    <>
                                                        <div onClick={() => setNot(false)} className={not ? 'fixed inset-0 z-20 w-full h-full' : 'hidden fixed inset-0 z-20 w-full h-full'}></div>
                                                        <div className='fadeIn absolute -right-20 px-2 sm:right-0 max-h-[400px] overflow-y-auto bg-gray-100 border sm:px-5 py-1 z-30 rounded-lg dark:bg-gray-900'>
                                                            {
                                                                notifications.length > 0 ? notifications.map(item => (
                                                                    <div key={item?._id} className="flex my-2 sm:my-5 flex-col w-[250px] sm:w-[400px] px-2 py-4 border bg-white shadow-md hover:shodow-lg rounded-2xl dark:bg-gray-800">
                                                                        <div className="flex items-center justify-between">
                                                                            <div className="flex items-center">
                                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                                    className="hidden sm:block w-16 h-16 rounded-2xl p-3 border border-blue-100 text-blue-400 bg-blue-50 dark:border-gray-800 dark:text-blue-400 dark:bg-gray-900" fill="none"
                                                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                                                </svg>
                                                                                <div className="flex flex-col ml-3">
                                                                                    <div className="font-medium sm:w-[210px] overflow-hidden text-ellipsis leading-none mb-1 dark:text-gray-100">{item?.title}</div>
                                                                                    <p className="text-sm sm:w-[210px] overflow-hidden text-ellipsis text-gray-600 leading-none mt-1 dark:text-gray-500">{item?.text}</p>
                                                                                </div>
                                                                            </div>
                                                                            <button onClick={() => handleRead(item._id)} className="flex-no-shrink bg-emerald-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-emerald-500 text-white rounded-full">Mark</button>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                                    :
                                                                    (
                                                                        <div className='w-[300px] py-5 text-center text-gray-400 dark:text-white'>There are no notifications yet</div>
                                                                    )
                                                            }
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </div>
                                        <div className="menu__btn md:order-2 relative z-20">
                                            <button type="button" className=" w-14 h-14 flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 ring-2 ring-gray-300" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                                                {
                                                    avatar === '' ?
                                                        <div className="bg-black rounded-full">
                                                            <p className='w-14 h-14 text-3xl rounded-full text-white uppercase flex items-center justify-center'>{user?.username.slice(0, 2)}</p>
                                                        </div>
                                                        :
                                                        <img className='border w-14 h-14 object-cover rounded-full bg-white' src={`${baseURL}/${avatar}`} alt="User avatar" />
                                                }
                                            </button>
                                            <div className="menu__dropdown absolute top-6 right-0 z-40 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                                                <div className="px-4 py-3">
                                                    <span className="block text-sm text-gray-900 dark:text-white font-semibold">{userInfo.username}</span>
                                                    <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{userInfo.createdAt.replace(/[a-z]/gi, " / ").split('').slice(0, -7).join('')}</span>
                                                </div>
                                                <ul className="py-2" aria-labelledby="user-menu-button">
                                                    <li onClick={() => handleProfile(userInfo._id)} className='cursor-pointer'>
                                                        <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</p>
                                                    </li>
                                                    <li className='cursor-pointer'>
                                                        <Link to="/new"><p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Add New Post</p></Link>
                                                    </li>
                                                    <li onClick={() => setSetting(true)} className='cursor-pointer'>

                                                        <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</p>
                                                    </li>
                                                    <li className='cursor-pointer'>
                                                        <p onClick={logoutHandle} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</p>
                                                    </li>
                                                    {
                                                        user.role === 'ADMIN' && (
                                                            <li className='cursor-pointer'>
                                                                <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Admin Panel</Link>
                                                            </li>
                                                        )
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div >
                                </React.Fragment>)
                            :
                            (<Link to="/login">
                                <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Sign In</button>
                            </Link>)
                    }
                </div>
            </div>
        </div >
    )
}

export default Navbar