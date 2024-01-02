import React, { useCallback, useEffect, useState } from 'react'
import SidebarLeft from '../components/SidebarLeft'
import Moment from 'react-moment'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../utils/axios'
import { useDispatch, useSelector } from 'react-redux'
import { removePost } from '../redux/features/postSlice'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet'
import Comment from '../components/Comment'
import { createComment, getPostComments } from '../redux/features/commentSlice'
import { checkIsAuth } from '../redux/features/authSlice'
import { sendUserReport } from '../redux/features/reportSlice'
import SidebarLeftHam from '../components/SidebarLeftHam'
import { baseURL } from '../utils/constant'
function PostPage() {
    const dispatch = useDispatch()
    const isAuth = useSelector(checkIsAuth)
    const { user } = useSelector(state => state.auth)
    const { comments } = useSelector(state => state.comment)
    const navigate = useNavigate()
    const { id } = useParams()
    const [item, setItem] = useState({})
    const [muted, setMuted] = useState(window.sessionStorage.getItem('mute'))
    const [comment, setComment] = useState('')
    const [isReport, setIsReport] = useState({ isOpen: false, guilty: '' })
    const [reportContent, setReportContent] = useState('')
    const [menu, setMenu] = useState(false)

    useEffect(() => {
        document.addEventListener("click", handlePostMenu, true)
    }, [])
    const handlePostMenu = (e) => {
        document.querySelectorAll('.drop-2').forEach(el => {
            el.classList.add('hidden')
        });
        if (e.target.classList.contains('btn-trigger-2')) {
            if (e.target.parentElement.classList.contains('btn-trigger-2') && e.target.tagName !== 'path') {
                e.target.parentElement.parentElement.children[1].classList.remove('hidden')
            }
            if (e.target.parentElement.classList.contains('btn-trigger-2') && e.target.tagName === 'path') {
                e.target.parentElement.parentElement.parentElement.children[1].classList.remove('hidden')
            }
            if (e.target.parentElement.tagName === 'DIV' && e.target.tagName === 'BUTTON') {
                e.target.parentElement.children[1].classList.remove('hidden')
            }
        }
        else {
            document.querySelectorAll('.drop-2').forEach(el => {
                el.classList.add('hidden')
            });
        }
    }
    const handleDelete = async () => {
        try {
            await dispatch(removePost(id))
            toast.success('Post deleted!')
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    const fetchPosts = useCallback(async () => {
        await axios.get(`/posts/${id}`)
            .then(res => setItem(res.data))
    }, [id])
    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])

    const handleComment = () => {
        if (comment.trim() === '') {
            toast("Comment can't be empty!")
            return
        }
        try {
            const postId = id
            const parentId = null
            const to = {
                username: null,
                user: null
            }
            dispatch(createComment({ postId, comment, parentId, to }))
            setComment('')
            toast("Comment added : )")
        } catch (error) {
            console.log(error)
        }
    }

    const fetchComments = useCallback(() => {
        try {
            dispatch(getPostComments(id))
        } catch (error) {
            toast(error)
        }
    }, [id, dispatch])

    useEffect(() => {
        fetchComments()
    }, [fetchComments])

    const muteHandler = () => {
        if (muted === 'true') {
            setMuted('false')
            window.sessionStorage.setItem('mute', 'false')
        }
        else {
            setMuted('true')
            window.sessionStorage.setItem('mute', 'true')
        }
    }
    const handleReport = () => {
        setIsReport({ isOpen: false })
        const finiteResult = {
            contentId: id,
            content: reportContent,
            by: user?._id,
            guilty: item?.author,
            contentType: 'post'
        }
        dispatch(sendUserReport(finiteResult))
        toast.info('Thanks for Reporting.')
    }

    const handleEdit = () => {
        navigate(`/${id}/edit`)
    }

    return (
        <div className='flex calc__height'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{item?.title || 'Question'}</title>
            </Helmet>
            <div>
                <SidebarLeft />
            </div>
            <div className="relative flex-1 dark:bg-gray-600">
                <>
                    {
                        menu && (
                            <div className='fadeIn absolute w-full h-screen top-0 left-0 z-40'>
                                <SidebarLeftHam />
                            </div>
                        )
                    }
                    <div onClick={menu ? () => setMenu(false) : () => setMenu(true)} className="flex justify-center sm:hidden fixed right-5 cursor-pointer bottom-5 z-50 w-[60px] h-[60px] bg-gray-900 rounded-full">
                        <div className='flex items-center justify-center'>
                            {
                                !menu
                                    ?
                                    (
                                        <div onClick={() => setMenu(true)} className='space-y-2'>
                                            <span className="block w-8 h-0.5 bg-gray-100"></span>
                                            <span className="block w-8 h-0.5 bg-gray-100"></span>
                                            <span className="block w-5 h-0.5 bg-gray-100"></span>
                                        </div>
                                    )
                                    :
                                    (
                                        <div onClick={() => setMenu(false)} className='space-y-2'>
                                            <span className="block w-8 h-0.5 bg-gray-100"></span>
                                            <span className="block w-5 h-0.5 bg-gray-100"></span>
                                        </div>
                                    )
                            }
                        </div >
                    </div>
                    {
                        isReport.isOpen && (
                            <>
                                <div onClick={() => setIsReport({ isOpen: false })} className="fixed inset-0 z-10 w-full h-full bg-slate-100/30" ></div>

                                <div className="fadeIn absolute left-[42%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                                    <div className="relative w-[400px] h-full max-w-md md:h-auto">
                                        <div className="relative px-10 bg-white rounded-lg shadow dark:bg-gray-700">
                                            <button onClick={() => setIsReport({ isOpen: false })} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                            </button>
                                            <fieldset>
                                                <p className="text-lg mt-5 text-gray-500 text-center font-bold dark:text-white">What problem</p>
                                                <div className="my-8 space-y-4">
                                                    <div onClick={() => setReportContent("Violent or repulsive content")} className="flex items-center">
                                                        <input id="report-1" name="report-radio" type="radio" className="h-5 w-5 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                        <label for="report-1" className="ml-3 block text-[16px] cursor-pointer font-medium text-gray-700 dark:text-white">Violent or repulsive content</label>
                                                    </div>
                                                    <div onClick={() => setReportContent("Hateful or abusive content")} className="flex items-center">
                                                        <input id="report-2" name="report-radio" type="radio" className="h-5 w-5 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                        <label for="report-2" className="ml-3 block text-[16px] cursor-pointer font-medium text-gray-700 dark:text-white">Hateful or abusive content</label>
                                                    </div>
                                                    <div onClick={() => setReportContent("Harmful or dangerous acts")} className="flex items-center">
                                                        <input id="report-3" name="report-radio" type="radio" className="h-5 w-5 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                        <label for="report-3" className="ml-3 block text-[16px] cursor-pointer font-medium text-gray-700 dark:text-white">Harmful or dangerous acts</label>
                                                    </div>
                                                    <div onClick={() => setReportContent("Spam or misleading")} className="flex items-center">
                                                        <input id="report-4" name="report-radio" type="radio" className="h-5 w-5 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                        <label for="report-4" className="ml-3 block text-[16px] cursor-pointer font-medium text-gray-700 dark:text-white">Spam or misleading</label>
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <div className="p-6 text-center">
                                                <button onClick={handleReport} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                                    Send
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }
                    {
                        item && (
                            <>
                                <button onClick={() => navigate(-1)} type="button" className="mt-5 ml-5 mb-5 text-slate-500 border border-slate-500 hover:bg-slate-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800">
                                    <svg aria-hidden="true" className="rotate-180 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </button>
                                <div className='animate-[fadeIn_1s_ease-in-out] max-w-[1600px] h-full px-2 pb-20 overflow-y-scroll '>
                                    <div key={item?._id} className="relative mb-10 border p-[30px] flex gap-4 rounded-lg dark:bg-gray-800">
                                        <div className="absolute right-0 top-5">
                                            <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                                                className="btn-trigger-2 inline-flex items-center p-2 mr-5 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                                type="button">
                                                <svg className="btn-trigger-2 w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        className='btn-trigger-2'
                                                        d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                                                    </path>
                                                </svg>
                                            </button>
                                            <div
                                                className="absolute drop-2 hidden right-10 top-10 z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                                    aria-labelledby="dropdownMenuIconHorizontalButton">
                                                    {
                                                        (user?._id === item.author || user?.role === "ADMIN") && (
                                                            <>
                                                                <li onClick={handleDelete}>
                                                                    <p className="block py-2 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</p>
                                                                </li>
                                                                <li onClick={handleEdit}>
                                                                    <p className="block py-2 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</p>
                                                                </li>
                                                            </>
                                                        )
                                                    }
                                                    <li>
                                                        <div
                                                            onClick={() => setIsReport({ isOpen: true, guilty: item?._id })}
                                                            className="block py-2 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className='block sm:flex gap-5 items-center'>
                                                <h3 className='text-zinc-600 sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-1 dark:text-white'>{item.title}</h3>
                                                {
                                                    item.edited && (
                                                        <p className='text-gray-700 text-md pr-10 md:text-2xl dark:text-gray-400'>(edited)</p>
                                                    )
                                                }
                                            </div>
                                            <small className='mt-[5px] text-sm sm:text-[16px] text-zinc-800 dark:text-white'>
                                                <Moment date={item.createdAt} format='DD MMM YYYY, hh:mm' />
                                            </small>
                                            <p className='text-slate-700 dark:text-white/90'>Author: <span onClick={() => navigate(`/profile/${item?.author}`)} className='text-slate-500 font-semibold cursor-pointer hover:underline dark:text-white'>{item?.username}</span></p>
                                            <div className={item.imageUrl ? 'relative mt-5 flex rounded-sm overflow-hidden' : 'flex rounded-sm overflow-hidden'}>
                                                {
                                                    item?.imageUrl && item.imageUrl.includes('.mp4') ?
                                                        <div className='relative mx-auto'>
                                                            <p className='absolute z-10 select-none left-5 top-5 text-2xl text-white'>{item?.imageUrl.slice(13)}</p>
                                                            <div className='absolute z-10 cursor-pointer right-5 top-5' onClick={muteHandler}>
                                                                {
                                                                    muted === 'true' ?
                                                                        <svg className='w-7 h-7 fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M320 64c0-12.6-7.4-24-18.9-29.2s-25-3.1-34.4 5.3L131.8 160H64c-35.3 0-64 28.7-64 64v64c0 35.3 28.7 64 64 64h67.8L266.7 471.9c9.4 8.4 22.9 10.4 34.4 5.3S320 460.6 320 448V64z" /></svg>
                                                                        :
                                                                        <svg className='w-7 h-7 fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M533.6 32.5C598.5 85.3 640 165.8 640 256s-41.5 170.8-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z" /></svg>
                                                                }
                                                            </div>
                                                            <video controls muted={muted === 'true' ? true : false} onMouseOver={(e) => e.target.play()} width={1000} height={600} loop className="mx-auto cursor-pointer embed-responsive embed-responsive-16by9 relative overflow-hidden rounded-2xl" >
                                                                <source src={`${baseURL.slice(0, -4)}/${item?.imageUrl}`} type="video/mp4" />
                                                            </video>
                                                        </div>
                                                        : (
                                                            <img className='object-cover w-full mx-auto max-w-5xl' src={`${baseURL.slice(0, -4)}/${item?.imageUrl}`} alt='' />
                                                        )

                                                }
                                            </div>
                                            <p className='max-w-1/2 w-full overflow-hidden text-ellipsis text-sm md:text-[16px] text-gray-400 mt-6 mb-12 dark:text-white/90'>{item.text}</p>
                                        </div>
                                        <div className="absolute right-5 bottom-5 flex gap-5 items-center">
                                            <div className="flex gap-3 items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className='w-6 h-6 dark:fill-white/70'><path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" /></svg>
                                                <span className='text-gray-900/50 font-semibold dark:text-white/90'>{item?.views}</span>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6 dark:fill-white/70' viewBox="0 0 512 512"><path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z" /></svg>
                                                <span className='text-gray-900/50 font-semibold dark:text-white/90'>{item.comments?.length}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='max-w-[960px] mx-auto'>
                                        <div className="flex justify-between items-center mb-6">
                                            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion ({comments?.length || 0})</h2>
                                        </div>
                                        <form className="mb-6">
                                            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                                <label htmlFor="comment" className="sr-only">Your comment</label>
                                                <textarea id="comment" rows="6"
                                                    value={comment}
                                                    onChange={e => setComment(e.target.value)}
                                                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                                    placeholder="Write a comment..."></textarea>
                                            </div>
                                            <button
                                                disabled={isAuth ? false : true}
                                                type='button'
                                                onClick={handleComment}
                                                className="bg-blue-500 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 disabled:opacity-75">
                                                Post comment
                                            </button>
                                        </form>
                                    </div>
                                    <div className='pt-10 pb-20'>
                                        {
                                            comments && comments.map(comment => (
                                                <Comment item={comment} />
                                            ))
                                        }
                                    </div>
                                </div>
                            </>
                        )
                    }
                </>
            </div>
        </div >
    )
}

export default PostPage