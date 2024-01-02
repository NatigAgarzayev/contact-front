import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import nofound from '../images/404.gif'
import { getUserFollowing } from '../redux/features/followersSlice'
function SidebarRight({ popularPosts }) {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    useEffect(() => {
        dispatch(getUserFollowing(user?._id))
    }, [dispatch, user?._id])
    const navigate = useNavigate()
    return (
        <div className="relative pt-20 flex flex-col h-screen bg-white shadow dark:bg-gray-700">
            <div className="space-y-3">
                <button onClick={() => navigate('/new')} className="absolute mr-0 top-6 sm:left-6 lg:left-12 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-lg px-6 py-3.5 text-center inline-flex items-center xl:mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-white w-6 h-6 m-0 xl:mr-2 xl:-ml-1" viewBox="0 0 448 512"><path d="M240 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H176V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H240V80z" /></svg>
                    <p className='text-white font-medium hidden xl:block'> Add New Post</p>
                </button>
                <div className="hidden xl:flex items-center pt-5">
                    <h2 className="ml-2 text-[16px] xl:text-xl xl:flex xl:ml-10 font-light uppercase text-black dark:text-white">Popular Posts</h2>
                </div>
                <div className="hidden xl:flex-1 xl:block">
                    <ul className="pt-2 pb-4 text-sm">
                        {
                            popularPosts
                                ? (popularPosts.map(item => (
                                    <Link key={item._id} to={`/${item._id}`} >
                                        <li className="mt-1 animate-[fadeIn_1s_ease-in-out] rounded-sm hover:bg-blue-600/20 border-r-4 border-white hover:border-r-4 hover:border-indigo-500 dark:border-white dark:hover:bg-white/20">
                                            <div
                                                to="/"
                                                className="flex items-center p-2 xl:pl-10 space-x-3 rounded-md"
                                            >
                                                <span className='font-bold  text-gray-700 text-[16px] xl:text-xl overflow-hidden text-ellipsis whitespace-nowrap xl:max-w-44 dark:text-white'>{item.title}</span>
                                            </div>
                                        </li>
                                    </Link >
                                )))
                                : (<img className='mx-auto w-60 h-40' src={nofound} alt="" />)
                        }
                    </ul>
                </div>
                <ul className="absolute bottom-40 px-5 xl:px-10 flex flex-wrap gap-5 text-gray-900 dark:text-white/90">
                    <li className='hover:underline'>
                        <Link to={'/'}>Help</Link >
                    </li>
                    <li className='hover:underline'>
                        <Link to={'/'}>Contact</Link >
                    </li>
                    <li className='hover:underline'>
                        <Link to={'/faq'}>FAQ</Link >
                    </li>
                    <li className='hover:underline'>
                        <Link to={'/faq'}>Privacy Policy</Link >
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default SidebarRight