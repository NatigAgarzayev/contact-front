import React, { useEffect, useRef, useState } from 'react'
import back from '../images/profile-bg.avif'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { checkIsAuth, loginUser } from '../redux/features/authSlice'
import { Helmet } from 'react-helmet'

function LoginPage() {
    const navigate = useNavigate()
    const isAuth = useSelector(checkIsAuth)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [hide, setHide] = useState(true)
    let valid = useRef()
    let valid2 = useRef()
    const { status } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        if (status) {
            toast.info(status)
        }
        if (isAuth) navigate('/')
    }, [status, isAuth])

    function handleLogin() {
        if (username.trim() === '') {
            valid.current.focus()
            toast.warning('Please write your username!')
            return
        }
        if (password.trim() === '') {
            valid2.current.focus()
            toast.warning('Please write your password!')
            return
        }
        try {
            dispatch(loginUser({ username, password }))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='h-screen flex px-2 back items-center dark:bg-gray-600 '>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Log In</title>
            </Helmet>
            <div className="container mx-auto p-5 backdrop-blur-lg border-4 rounded-2xl">
                <div className='w-full flex justify-center gap-0 items-center md:gap-10 xl:gap-20'>
                    <div>
                        <h1 className='text-4xl sm:text-4xl md:text-5xl font-bold mb-16 text-white'>Log In</h1>
                        <form className='w-full sm:min-w-[330px]' onSubmit={(e) => e.preventDefault()}>
                            <div className='mt-5'>
                                <label htmlFor="username" className="block mb-2 text-[16px] font-bold text-white/90">Username <span className='text-red-600'>*</span></label>
                                <div>
                                    <input ref={valid} value={username} onChange={e => setUsername(e.target.value)} id="username" maxLength={20} className="w-full rounded rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" />
                                </div>
                            </div>
                            <div className='mt-5'>
                                <label htmlFor="password" className="block mb-2 text-[16px] font-bold text-white/90">Password <span className='text-red-600'>*</span></label>
                                <div className='relative'>
                                    <input ref={valid2} value={password} onChange={e => setPassword(e.target.value)} autoComplete='true' type={hide ? 'password' : 'text'} id="password" maxLength={18} className="w-full rounded rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" />
                                    <div onClick={() => setHide(!hide)} className='absolute right-3 top-2.5 cursor-pointer'>
                                        <svg className='w-6 h-6 dark:fill-white' xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
                                            <g>
                                                <g>
                                                    <path d="M399.521,370.534c-6.925-9.084-19.902-10.835-28.986-3.911c-33.25,25.344-72.908,39.117-114.703,39.835    c-55.803-0.051-108.9-26.38-157.827-78.256C70.98,299.546,52.65,270.47,44.311,256.051c24.801-43.157,57.449-80.353,97.17-110.686    c9.078-6.933,10.818-19.912,3.885-28.99c-6.933-9.078-19.912-10.818-28.99-3.885C68.981,148.682,30.653,193.675,2.458,246.22    c-3.177,5.922-3.28,13.018-0.274,19.028c0.928,1.858,23.22,45.993,64.914,90.466c24.773,26.424,51.341,47.551,78.968,62.793    c35.256,19.452,72.243,29.315,109.935,29.315c0.113,0,0.225-0.001,0.338-0.003c50.746-0.829,98.906-17.53,139.271-48.299    C404.695,392.596,406.446,379.619,399.521,370.534z" />
                                                </g>
                                            </g>
                                            <g>
                                                <g>
                                                    <path d="M509.816,246.751c-0.929-1.857-23.221-45.993-64.914-90.466c-24.772-26.425-51.341-47.551-78.968-62.793    c-35.255-19.452-72.243-29.315-109.885-29.315c-16.709-0.042-33.422,1.872-49.687,5.679c-11.122,2.603-18.028,13.73-15.423,24.852    c2.603,11.122,13.732,18.028,24.852,15.423c13.147-3.077,26.666-4.595,40.21-4.59c55.864,0,109.021,26.329,157.996,78.256    c27.035,28.665,45.369,57.752,53.703,72.165c-11.129,19.409-24.02,37.857-38.414,54.962c-7.355,8.74-6.232,21.786,2.509,29.141    c3.878,3.264,8.605,4.858,13.306,4.857c5.892,0,11.745-2.504,15.835-7.365c18.625-22.134,34.984-46.294,48.623-71.809    C512.719,259.834,512.817,252.752,509.816,246.751z" />
                                                </g>
                                            </g>
                                            <g>
                                                <g>
                                                    <path d="M315.451,286.22c-8.358-7.786-21.445-7.323-29.232,1.032c-7.919,8.5-18.676,13.407-30.286,13.817    c-11.601,0.418-22.686-3.727-31.186-11.646c-17.547-16.35-18.52-43.927-2.169-61.474c0.694-0.745,1.425-1.475,2.172-2.172    c8.356-7.789,8.815-20.875,1.027-29.231c-7.788-8.356-20.875-8.814-29.231-1.027c-1.454,1.356-2.878,2.78-4.23,4.231    c-31.899,34.233-30,88.036,4.233,119.935c15.833,14.753,36.245,22.777,57.776,22.777c1.02,0,2.044-0.018,3.068-0.054    c22.652-0.799,43.638-10.372,59.091-26.956C324.27,307.095,323.808,294.008,315.451,286.22z" />
                                                </g>
                                            </g>
                                            <g>
                                                {
                                                    hide && (
                                                        <g>
                                                            <path d="M505.942,476.694L35.307,6.058c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636    c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z" />
                                                        </g>
                                                    )
                                                }

                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <Link to="/reset"><p className='text-white flex justify-end mt-5 font-semibold underline hover:text-white/90'>Forgotten Password</p></Link>
                            <button onClick={handleLogin} className="md:whitespace-nowrap mt-5 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Sign In</button>
                        </form>
                        <div className='flex items-center gap-5 mt-20 md:mt-40'>
                            <p className='text-white font-semibold'>Don’t have account yet?</p>
                            {/* <Link to="/register"> */}
                            <button onClick={() => navigate('/register')} className="whitespace-nowrap text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create Account</button>
                            {/* </Link> */}
                        </div>
                    </div>
                    <div>
                        <img src={back} className="w-[500px] hidden h-[650px] rounded-lg object-cover md:block" alt="" />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LoginPage