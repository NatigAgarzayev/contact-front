import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet'
import { checkIsAuth } from '../redux/features/authSlice'
import axios from '../utils/axios'
import { updatePost } from '../redux/features/postSlice'
import { baseURL } from '../utils/constant'
function EditPostPage() {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [oldImage, setOldImage] = useState('')
    const [newImage, setNewImage] = useState('')
    const [canceled, setCanceled] = useState(false)
    const { id } = useParams()
    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let val1 = useRef()
    let val2 = useRef()
    let inp = useRef()
    const submitHandler = async () => {
        if (title.trim() === '') {
            val1.current.focus()
            toast.warning('Please write title!')
            return
        }
        if (title.trim().split('').length < 10 || title.trim().split('').length > 100) {
            val1.current.focus()
            toast.warning('From 10 to 100 letters!!!')
            return
        }
        if (text.trim() === '') {
            val2.current.focus()
            toast.warning('Please write text!')
            return
        }
        if (text.trim().split('').length < 30 || title.trim().split('').length > 500) {
            val2.current.focus()
            toast.warning('From 30 to 500 letters!')
            return
        }
        try {
            const updatedPost = new FormData()
            updatedPost.append('title', title)
            updatedPost.append('text', text)
            updatedPost.append('id', id)
            updatedPost.append('image', newImage)
            await dispatch(updatePost(updatedPost))
            navigate('/posts')
        } catch (error) {
            toast.error(error)
        }
    }

    const handleCancel = () => {
        setCanceled(true)
        setOldImage('')
        setNewImage('')
        inp.current.value = ''
    }

    const fetchPosts = useCallback(async () => {
        const { data } = await axios.get(`/posts/${id}`)
        setTitle(data.title)
        setText(data.text)
        setOldImage(data.imageUrl)
    }, [id])

    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])

    return (
        <div className='py-20 min-h-screen dark:bg-gray-600'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Edit post  </title>
            </Helmet>
            <div className="container mx-auto px-5">
                <h1 className='text-5xl font-semibold dark:text-white'>Edit Post</h1>
                <form className='mt-10'>
                    <div className="grid md:grid-cols-1 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <input onChange={e => setTitle(e.target.value)} ref={val1} value={title} minLength={20} type="text" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Title" multiple></input>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">Upload file</label>
                            <div className="flex flex-col-reverse w-full">
                                <div className="flex object-cover py-2">
                                    {
                                        oldImage && !canceled && (
                                            oldImage.includes('.mp4') ?
                                                <video width="750" height="500" controls >
                                                    <source src={`${baseURL}/${oldImage}`} type="video/mp4" />
                                                </video>
                                                :
                                                <img className='h-1/2 w-1/2' src={`${baseURL}/${oldImage}`} alt={oldImage.name} />
                                        )
                                    }
                                    {
                                        newImage && !canceled && (
                                            newImage.type === 'video/mp4' ?
                                                <video width="750" height="500" controls >
                                                    <source src={URL.createObjectURL(newImage)} type="video/mp4" />
                                                </video>
                                                :
                                                <img className='h-1/2 w-1/2' src={URL.createObjectURL(newImage)} alt={newImage.name} />
                                        )
                                    }
                                </div>
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or GIF</p>
                                    </div>
                                    <input ref={inp} onChange={e => { setNewImage(e.target.files[0]); setOldImage(''); setCanceled(false) }} id="dropzone-file" type="file" className="hidden" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                        <textarea ref={val2} value={text} onChange={e => setText(e.target.value)} id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
                    </div>
                    <div className='flex gap-5'>
                        <button disabled={isAuth ? false : true} type='button' onClick={submitHandler} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-75">Add Post</button>
                        <button onClick={() => navigate('/')} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600">Cancel</button>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default EditPostPage