import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { notificationCreating } from '../redux/features/adminSlice'
import { registerUser } from '../redux/features/authSlice'

function AdminFormPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [regOrNot, setRegOrNot] = useState(false)
    const mailvalid = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordCon, setPasswordCon] = useState('')
    const [hide, setHide] = useState(true)


    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    const handleRegistration = async () => {
        if (username.trim() === '') {
            toast.warning('Please write your username!')
            return
        }
        if (email.trim() === '') {
            toast.warning('Please write your email!')
            return
        }
        if (password.trim() === '') {
            toast.warning('Please write your password!')
            return
        }
        if (passwordCon.trim() === '') {
            toast.warning('Please confirm the password!')
            return
        }
        if (email.replace(mailvalid, '') !== '') {
            toast.warning('Your email is not correct!')
            return
        }
        if (password !== passwordCon) {
            setPassword('')
            setPasswordCon('')
            toast.warning('Passwords are not the same!')
            return
        }
        try {
            await dispatch(registerUser({ username, email, password }))
            setUsername('')
            setEmail('')
            setPassword('')
            setPasswordCon('')
        } catch (error) {
            console.log(error)
        }
    }

    const handleNotification = () => {
        if (title.trim() === '') {
            toast.warning('Please write your title!')
            return
        }
        if (text.trim() === '') {
            toast.warning('Please write your text!')
            return
        }
        try {
            dispatch(notificationCreating({ title, text }))
            setTitle('')
            setText('')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className='mt-10 ml-5 flex item-center gap-5'>
                <button onClick={() => setRegOrNot(false)} className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Notification for User</button>
                <button onClick={() => setRegOrNot(true)} className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Register User</button>
            </div>
            <h3 className="text-gray-700 ml-5 py-10 text-5xl font-semibold">{regOrNot ? 'User Registration' : 'Notification for Users'}</h3>
            {
                regOrNot ? (
                    <div>

                        <div className="mt-4">
                            <div className="p-6 bg-white rounded-md shadow-md">
                                <h2 className="text-lg text-gray-700 font-semibold capitalize">Account settings</h2>

                                <form>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                                        <div>
                                            <label className="text-gray-700" for="username">Username</label>
                                            <input value={username} onChange={e => setUsername(e.target.value)} className="px-3 border py-2 form-input w-full mt-2 rounded-md focus:border-indigo-600" type="text" />
                                        </div>

                                        <div>
                                            <label className="text-gray-700" for="emailAddress">Email Address</label>
                                            <input value={email} onChange={e => setEmail(e.target.value)} className="px-3 border py-2 form-input w-full mt-2 rounded-md focus:border-indigo-600" type="text" />
                                        </div>

                                        <div className='relative'>
                                            <label className="text-gray-700" for="password">Password</label>
                                            <input value={password} onChange={e => setPassword(e.target.value)} type={hide ? 'password' : 'text'} className="px-3 border py-2 form-input w-full mt-2 rounded-md focus:border-indigo-600" />
                                            <div onClick={() => setHide(!hide)} className='absolute right-3 top-10 cursor-pointer'>
                                                <svg className='w-6 h-6 dark:fill-black' xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
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

                                        <div>
                                            <label className="text-gray-700" for="passwordConfirmation">Password Confirmation</label>
                                            <input type={hide ? 'password' : 'text'} value={passwordCon} onChange={e => setPasswordCon(e.target.value)} className="px-3 border py-2 form-input w-full mt-2 rounded-md focus:border-indigo-600" />
                                        </div>
                                    </div>

                                    <div className="flex justify-end mt-4">
                                        <button type='button' onClick={handleRegistration} className="px-4 py-2 bg-gray-800 text-gray-200 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                )
                    :
                    (
                        <>
                            <div className=" mt-5 md:col-span-2 md:mt-0">
                                <form>
                                    <div className="shadow sm:overflow-hidden sm:rounded-md">
                                        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                            <div className="grid grid-cols-3 gap-6">
                                                <div className="col-span-3 sm:col-span-2">
                                                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                                        Title
                                                    </label>
                                                    <div className="mt-1 flex rounded-md shadow-sm">
                                                        <input
                                                            value={title}
                                                            onChange={e => setTitle(e.target.value)}
                                                            maxLength={40}
                                                            type="text"
                                                            name="company-website"
                                                            id="company-website"
                                                            className="flex-1 p-3 border rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                            placeholder="Important!!"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                                    About
                                                </label>
                                                <div className="mt-1">
                                                    <textarea
                                                        value={text}
                                                        onChange={e => setText(e.target.value)}
                                                        maxLength={100}
                                                        id="about"
                                                        name="about"
                                                        rows={3}
                                                        className="mt-1 block w-full border p-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        placeholder="you@example.com"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                            <button
                                                onClick={handleNotification}
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </>
                    )
            }
        </>
    )
}

export default AdminFormPage