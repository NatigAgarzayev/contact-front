import React, { useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Moment from 'react-moment'
import { useDispatch, useSelector } from 'react-redux'
import { removeComment, getPostComments, likeTheComment, editUserComment } from '../redux/features/commentSlice'
import { toast } from 'react-toastify'
import { checkIsAuth } from '../redux/features/authSlice'
import { createComment } from '../redux/features/commentSlice'
import { sendUserReport } from '../redux/features/reportSlice'
import { baseURL } from '../utils/constant'
function Replies({ reply, replyId, itemId }) {
    const navigate = useNavigate()
    const { id } = useParams()
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [comment, setComment] = useState()
    const isAuth = useSelector(checkIsAuth)
    const postId = id
    const inp = useRef()
    const [likes, setLikes] = useState(reply?.likes)
    const [isReport, setIsReport] = useState({ isOpen: false, guilty: '' })
    const [reportContent, setReportContent] = useState('')
    const [isEditCom, setIsEditCom] = useState({ isOpen: false, commentContent: '' })


    const handleDeleteComment = async (id) => {
        try {
            await dispatch(removeComment({ id, postId }))
            toast('Reply deleted!')
            dispatch(getPostComments(postId))
        } catch (error) {
            console.log(error)
        }
    }

    const handleReplyInput = (e) => {
        document.querySelectorAll('.inp').forEach(item => {
            item.classList.add('hidden')
        })
        e.target.parentElement.nextElementSibling.classList.remove('hidden')
    }
    const handleClose = (e) => {
        e.target.parentElement.parentElement.classList.add('hidden')
    }


    const handlingReply = (parentComm, parentUsername, parentUserId) => {
        if (comment.trim() === '') {
            toast.warning("Reply can't be empty!")
            return
        }
        try {
            inp.current.classList.add('hidden')
            const postId = id
            const parentId = parentComm
            const to = {
                user: parentUserId,
                username: parentUsername
            }
            dispatch(createComment({ postId, comment, parentId, to }))
            setComment('')
            toast.success("Reply added : )")
        } catch (error) {
            console.log(error)
        }
    }

    const likeComment = (id) => {
        try {
            dispatch(likeTheComment(id))
            if (likes?.includes(user?._id)) {
                setLikes(reply.likes.filter((id) => String(id) !== user?._id))
            }
            else {
                setLikes([...reply.likes, user?._id])
            }
        } catch (error) {
            toast.error('Error :[')
        }
    }

    const handleReport = (id) => {
        setIsReport({ isOpen: false })
        const finiteResult = {
            contentId: id,
            content: reportContent,
            by: user?._id,
            guilty: reply?.author,
            contentType: 'comment'
        }
        dispatch(sendUserReport(finiteResult))
        toast.info('Thanks for Reporting.')
    }

    const handleEditComment = async (id) => {
        const text = isEditCom.commentContent
        console.log(text)
        if (text.trim() === '') {
            toast.warning("We can't send empty field!")
            return
        }
        try {
            setIsEditCom({ isOpen: false })
            await dispatch(editUserComment({ id, text }))
            toast.success('Comment is edited!')
            dispatch(getPostComments(postId))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {
                isReport.isOpen && (
                    <>
                        <div onClick={() => setIsReport({ isOpen: false })} className="fixed inset-0 z-10 w-full h-full bg-slate-100/30" ></div>

                        <div className="fadeIn absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
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
                                        <button onClick={() => handleReport(reply?._id)} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
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
                replyId === itemId && (
                    <article className="relative max-w-[930px] bg-white border-l-2 pl-4 border-gray-200 ml-auto py-6 mb-6 mt-6 text-base dark:bg-gray-800" >
                        <footer className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                                <p onClick={() => navigate(`/profile/${reply.author}`)} className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                    {
                                        reply.icon === '' ?
                                            <div className="bg-black rounded-full mr-2">
                                                <p className='w-10 h-10 text-xl rounded-full text-white uppercase flex items-center justify-center'>{reply?.username.slice(0, 2)}</p>
                                            </div>
                                            :
                                            <img
                                                className="mr-2 w-10 h-10 object-cover rounded-full"
                                                src={`${baseURL}/${reply.icon}`}
                                                alt={reply?.username} />
                                    }
                                    <span className={user?._id === reply.author ? 'bg-yellow-400 rounded-3xl px-3 py-0.5 font-semibold text-gray-600 cursor-pointer text-black/80' : 'border rounded-3xl px-3 py-0.5 font-semibold text-zync-600 cursor-pointer'}>{reply?.username}</span>
                                </p>
                                <p className="text-sm text-gray-600 dark:text-white">
                                    <Moment date={reply?.createdAt} format='DD MMM YYYY, hh:mm' />
                                </p>
                                {
                                    reply.edited && (
                                        <p className='text-gray-700 ml-3 dark:text-gray-400'>(edited)</p>
                                    )
                                }
                            </div>
                            <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                                className="btn-trigger mr-5 inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                type="button">
                                <svg className="btn-trigger w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        className='btn-trigger'
                                        d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                                    </path>
                                </svg>
                            </button>
                            <div
                                className="drop absolute hidden right-10 top-16 z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownMenuIconHorizontalButton">
                                    {
                                        (user?.role === 'ADMIN' || user?._id === reply.author) && (
                                            <>
                                                <li onClick={() => handleDeleteComment(reply._id)}>
                                                    <p className="block py-2 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</p>
                                                </li>
                                                <li onClick={() => setIsEditCom({ isOpen: true, commentContent: reply?.comment })}>
                                                    <p className="block py-2 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</p>
                                                </li>
                                            </>
                                        )
                                    }
                                    <li>
                                        <div
                                            onClick={() => setIsReport({ isOpen: true, guilty: reply?._id })}
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</div>
                                    </li>
                                </ul>
                            </div>
                        </footer>
                        {
                            isEditCom.isOpen ? (
                                <form className="mb-6">
                                    <div className="py-2 mt-5 mr-5 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                        <label htmlFor="comment" className="sr-only">Your comment</label>
                                        <textarea id="comment" rows="2"
                                            value={isEditCom.commentContent}
                                            onChange={e => setIsEditCom({ isOpen: true, commentContent: e.target.value })}
                                            className="w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                            placeholder="Write a comment..."></textarea>
                                    </div>
                                    <button
                                        type='button'
                                        onClick={() => handleEditComment(reply?._id)}
                                        className="bg-blue-500 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 disabled:opacity-75">
                                        Edit
                                    </button>
                                    <button
                                        type='button'
                                        onClick={() => setIsEditCom({ isOpen: false })}
                                        className="bg-red-500 ml-5 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-primary-900 hover:bg-primary-800 disabled:opacity-75">
                                        Cancel
                                    </button>
                                </form>
                            )
                                :
                                <>
                                    <p className="text-gray-500 pr-20 dark:text-white/90"><span className='text-blue-700 dark:text-blue-400 hover:underline cursor-pointer' onClick={() => navigate(`/profile/${reply?.to?.user}`)}>@{reply?.to?.username}, </span>{reply?.comment}</p>
                                    <div className="flex items-center mt-4 space-x-4">
                                        <button type="button" className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                            {
                                                isAuth && likes?.includes(user?._id)
                                                    ?
                                                    <svg onClick={() => likeComment(reply?._id)} xmlns="http://www.w3.org/2000/svg" className='w-4 h-4 dark:fill-white' viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" /></svg>
                                                    :
                                                    <svg onClick={() => likeComment(reply?._id)} xmlns="http://www.w3.org/2000/svg" className='w-4 h-4 dark:fill-white' viewBox="0 0 512 512"><path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" /></svg>
                                            }
                                            <div className="text-[14px] font-semibold text-zinc-500 dark:text-white/90">{likes?.length}</div>
                                        </button>
                                        <button onClick={(e) => handleReplyInput(e)} type="button"
                                            className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                                            <svg aria-hidden="true" className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                                            Reply
                                        </button>
                                    </div>
                                </>
                        }
                        <div ref={inp} className='inp hidden'>
                            <form className='mb-6 mt-6 max-w-[910px] ml-auto'>
                                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                    <label htmlFor="comment" className="sr-only">Your comment</label>
                                    <textarea id="comment" rows="2"
                                        value={comment}
                                        onChange={e => setComment(e.target.value)}
                                        className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                        placeholder="Write a reply..."></textarea>
                                </div>
                                <button
                                    disabled={isAuth ? false : true}
                                    type='button'
                                    onClick={() => handlingReply(itemId, reply?.username, reply?.author)}
                                    className="bg-blue-500 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 disabled:opacity-75">
                                    Reply
                                </button>
                                <button
                                    type='button'
                                    onClick={(e) => handleClose(e)}
                                    className="ml-5 bg-red-500 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 disabled:opacity-75">
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </article >
                )
            }
        </>
    )
}

export default Replies