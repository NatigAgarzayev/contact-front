import React from 'react'
import { useEffect, useState } from 'react'
import accept from '../images/accept-reset.png'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet'
import { resetUserPass } from '../redux/features/resetSlice'
function ResetPasswordPage() {
    const [password, setPassword] = useState('')
    const [passwordCon, setPasswordCon] = useState('')
    const [hide, setHide] = useState(true)
    const [isReset, setIsReset] = useState(false)
    const { status } = useSelector(state => state.reset)
    const dispatch = useDispatch()
    const { token } = useParams()
    const passvalid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/
    const handleResetPass = () => {
        if (password.trim() === '') {
            toast.warning('Please write your password!')
            return
        }
        if (passwordCon.trim() === '') {
            toast.warning('Please confirm the password!')
            return
        }
        if (password.replace(passvalid, '') !== '') {
            toast.warning('Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character')
            return
        }
        if (password !== passwordCon) {
            setPassword('')
            setPasswordCon('')
            toast.warning('Passwords are not the same!')
            return
        }
        try {
            dispatch(resetUserPass({ password, token }))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (status) {
            toast.info(status)
        }
        if (status === 'Your password is resetted : )') {
            setIsReset(true)
        }
    }, [status])

    return (
        <div className='h-screen flex px-2 back items-center dark:bg-gray-600'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>New Password</title>
            </Helmet>
            <div className=" container mx-auto">
                <div className='w-84 sm:w-96 py-10 backdrop-blur-lg border-2 rounded-2xl mx-auto'>
                    {
                        !isReset ?
                            (

                                <div className='w-80 mx-auto'>
                                    <h1 className='text-4xl sm:text-4xl md:text-5xl font-bold mb-12 text-white'>Reset Password</h1>
                                    <form className='w-full sm:min-w-[330px]' onSubmit={e => e.preventDefault()}>
                                        <div className='mt-5'>
                                            <label htmlFor="password" className="block mb-2 text-[16px] font-bold text-white/90">New Password <span className='text-red-600'>*</span></label>
                                            <div className='relative'>
                                                <input value={password} onChange={e => setPassword(e.target.value)} type={hide ? 'password' : 'text'} maxLength={18} id="password" className="w-full rounded rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" />
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
                                        <div className='mt-5'>
                                            <label htmlFor="cpassword" className="block mb-2 text-[16px] font-bold text-white/90">Confirm Password <span className='text-red-600'>*</span></label>
                                            <div>
                                                <input value={passwordCon} onChange={e => setPasswordCon(e.target.value)} type={hide ? 'password' : 'text'} maxLength={18} id="cpassword" className="w-full rounded rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Confirm Password" />
                                            </div>
                                        </div>
                                        <button onClick={handleResetPass} className="md:whitespace-nowrap mt-8 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Reset Password</button>
                                    </form>
                                </div>
                            )
                            :
                            (
                                <div className='w-80 mx-auto'>
                                    <img className='mx-auto w-36 h-36' src={accept} alt="accepted" />
                                    <p className='text-white font-semibold text-center mt-6 text-lg'>Your pass was resetted!</p>
                                    <Link to="/login" className="py-2.5 px-5 flex justify-center mt-10 text-[16px] font-semibold text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200">Go To Login</Link>
                                </div>
                            )
                    }
                </div>
            </div>

        </div>
    )
}

export default ResetPasswordPage