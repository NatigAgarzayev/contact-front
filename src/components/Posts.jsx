import React, { useState } from 'react'
import Moment from 'react-moment'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { likeThePost } from '../redux/features/postSlice'
import { toast } from 'react-toastify'
import { checkIsAuth } from '../redux/features/authSlice'
import { baseURL } from '../utils/constant'
function Posts({ item }) {
    const { user } = useSelector(state => state.auth)
    const isAuth = useSelector(checkIsAuth)
    console.log(isAuth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [likes, setLikes] = useState(item?.likes)
    const handlePostById = (id) => {
        navigate(`/${id}`)
    }
    const likePost = (id) => {
        try {
            dispatch(likeThePost(id))
            if (likes.includes(user?._id)) {
                setLikes(item.likes.filter((id) => String(id) !== user?._id))
            }
            else {
                setLikes([...item.likes, user?._id])
            }

        } catch (error) {
            toast.error('Error :[')
        }
    }

    return (
        <div key={item?._id} className="animate-[fadeIn_1s_ease-in-out] lg:max-w-[1260px] relative overflow-hidden mb-10 border rounded-lg p-[30px] flex gap-4 cursor-pointer dark:bg-gray-800">
            {
                isAuth && (
                    <div className='absolute bottom-5 sm:static flex justify-start'>
                        <div className="flex sm:flex-col items-center justify-center gap-[5px]">
                            {
                                likes?.includes(user?._id)
                                    ?
                                    <svg onClick={() => likePost(item?._id)} xmlns="http://www.w3.org/2000/svg" className='w-6 h-6 sm:w-7 sm:h-7 dark:fill-white' viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" /></svg>
                                    :
                                    <svg onClick={() => likePost(item?._id)} xmlns="http://www.w3.org/2000/svg" className='w-6 h-6 sm:w-7 sm:h-7 dark:fill-white' viewBox="0 0 512 512"><path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" /></svg>
                            }
                            <div className="select-none text-lg sm:text-2xl font-semibold text-zinc-500 dark:text-white/70">{likes?.length || 0}</div>
                        </div>
                    </div>
                )
            }
            <div className="w-full md:pr-8">
                <div className='block sm:flex items-center gap-5'>
                    <h3 onClick={() => handlePostById(item?._id)} className='text-zinc-600 select-none text-ellipsis overflow-hidden sm:text-2xl md:text-3xl lg:text-4xl mb-1 font-semibold dark:text-white'>{item?.title}</h3>
                    {
                        item.edited && (
                            <p className='text-gray-700 text-md pr-10 md:text-2xl dark:text-gray-400'>(edited)</p>
                        )
                    }
                </div >
                <small onClick={() => handlePostById(item?._id)} className='mt-[5px] text-sm sm:text-[16px] select-none text-zinc-800 dark:text-white'>
                    <Moment date={item?.createdAt} format='DD MMM YYYY, hh:mm' />
                </small>
                <p className='text-slate-700 select-none mt-2 dark:text-white/90'>Author: <span onClick={() => navigate(`/profile/${item?.author}`)} className='text-slate-500 font-semibold hover:underline dark:text-white'>{item?.username}</span></p>
                <div onClick={() => handlePostById(item?._id)} className={item?.imageUrl ? 'relative mt-5 flex rounded-sm overflow-hidden' : 'flex rounded-sm overflow-hidden'}>
                    {

                        item?.imageUrl && item.imageUrl.includes('.mp4') ?
                            <div className='relative'>
                                <button className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[75px] h-[75px] sm:w-[100px] sm:h-[100px] bg-white flex items-center justify-center rounded-full'>
                                    <svg className='fill-black absolute left-6 top-5  w-[35px] h-[35px] sm:w-[50px] sm:h-[50px] sm:left-7 sm:top-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" /></svg>
                                </button>
                                <video className="relative mx-auto w-full overflow-hidden rounded-3xl">
                                    <source src={`${baseURL.slice(0, -4)}/${item?.imageUrl}`} type="video/mp4" />
                                </video>
                            </div >
                            : (
                                <img className='object-cover w-full h-auto' src={`${baseURL.slice(0, -4)}/${item?.imageUrl}`} alt='' />
                            )
                    }
                </div>
                <p onClick={() => handlePostById(item?._id)} className='overflow-hidden text-left text-ellipsis text-sm md:text-[16px] text-gray-400 max-h-24 mt-6 mb-12 dark:text-white/90'>{item?.text}</p>
            </div>
            <div className="absolute right-5 bottom-5 flex gap-5 items-center">
                <div onClick={() => handlePostById(item?._id)} className="flex gap-3 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className='w-6 h-6 dark:fill-white/70'><path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" /></svg>
                    <span className='text-gray-900/50 font-semibold dark:text-white/90'>{item?.views}</span>
                </div>
                <div onClick={() => handlePostById(item?._id)} className="flex gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6 dark:fill-white/70' viewBox="0 0 512 512"><path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z" /></svg>
                    <span className='text-gray-900/50 font-semibold dark:text-white/90'>{item.comments?.length}</span>
                </div>
            </div>
        </div>
    )
}

export default Posts