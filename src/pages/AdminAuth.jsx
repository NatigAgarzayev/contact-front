import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { isAdminHere, loginAdmin } from '../redux/features/adminSlice'
function AdminAuth() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { status } = useSelector(state => state.admin)
    const isAuthAdmin = useSelector(isAdminHere)
    useEffect(() => {
        if (status) {
            toast.info(status)
        }
        if (isAuthAdmin) navigate('/admin')
        // if (!isAuthAdmin) navigate('/admin/login')
    }, [status, isAuthAdmin])

    const adminLoginHandler = () => {
        if (username.trim() === '') {
            toast.warning('This field cannot be empty!')
            return
        }
        if (password.trim() === '') {
            toast.warning('This field cannot be empty!')
            return
        }
        try {
            dispatch(loginAdmin({ username, password }))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="h-screen flex items-center justify-center bg-gray-800">
                <div className="container mx-auto">
                    <div className="flex justify-center px-6">
                        <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                            <div
                                className="w-full h-auto admin__bg bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
                            ></div>
                            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                                <h3 className="pt-4 text-2xl text-center">Admin Panel</h3>
                                <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="username">
                                            Username
                                        </label>
                                        <input
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded-full shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="username"
                                            type="text"
                                            placeholder="Username"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded-full shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="password"
                                            type="password"
                                            placeholder="******************"
                                        />
                                    </div>
                                    <div className="mb-6 text-center">
                                        <button
                                            onClick={adminLoginHandler}
                                            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                            type="button"
                                        >
                                            Sign In
                                        </button>
                                    </div>
                                    <hr className="mb-6 border-t" />
                                    <div className="text-center">
                                        <Link
                                            to='/login'
                                            className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                            href="#"
                                        >
                                            Back
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminAuth