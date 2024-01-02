import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getReports, solveTheReport } from '../redux/features/reportSlice'

function AdminReportsPages() {

    const [openComment, setOpenComment] = useState({ isOpen: false, content: '' })


    const dispatch = useDispatch()
    const { reports, status } = useSelector(state => state.report)
    useEffect(() => {
        dispatch(getReports())
    }, [dispatch])

    useEffect(() => {
        if (status) {
            toast.info(status)
        }
    }, [status])

    const handleSolve = (id) => {
        dispatch(solveTheReport(id))
    }

    return (
        <>
            {
                openComment.isOpen && (
                    <>
                        <div onClick={() => setOpenComment({ isOpen: false })} className="fixed inset-0 z-10 w-full h-full bg-slate-100/30" ></div>

                        <div className="fadeIn absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                            <div className="relative w-[400px] h-full max-w-md md:h-auto">
                                <div className="relative pb-5 pt-2 bg-white rounded-lg shadow dark:bg-gray-700">
                                    <p className='text-center w-56 mx-auto mt-5 text-gray-600 text-sm dark:text-white'>Comment:</p>
                                    <p className='px-5 text-justify mx-auto max-h-[400px] overflow-hidden overflow-y-auto text-gray-600 text-lg dark:text-white'>{openComment?.content}</p>
                                </div>
                            </div>
                        </div>
                    </>
                )

            }
            <div className='mt-10'>
                <h3 className="text-gray-700 text-3xl font-medium px-10">Reports</h3>

                <div className="mt-4">
                    <h4 className="text-gray-600 px-10">Posts and Comment reports. You can learn about user by clicking over name.</h4>

                    <div className="mt-6 px-10">
                        <div className="bg-white shadow rounded-md overflow-hidden my-6">
                            <table className="text-left w-full border-collapse">
                                <thead className="border-b">
                                    <tr>
                                        <th className="py-3 px-5 bg-indigo-800 font-medium uppercase text-sm text-gray-100">Post/Comment</th>
                                        <th className="py-3 px-5 bg-indigo-800 font-medium uppercase text-sm text-gray-100">Report type</th>
                                        <th className="py-3 px-5 bg-indigo-800 font-medium uppercase text-sm text-gray-100">Post/Comment Title</th>
                                        <th className="py-3 px-5 bg-indigo-800 font-medium uppercase text-sm text-gray-100">From</th>
                                        <th className="py-3 px-5 bg-indigo-800 font-medium uppercase text-sm text-gray-100">To(guilty)</th>
                                        <th className="py-3 px-5 bg-indigo-800 font-medium uppercase text-sm text-gray-100">Time</th>
                                        <th className="py-3 px-5 bg-indigo-800 font-medium uppercase text-sm text-gray-100">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        reports && reports.map(item => (
                                            (
                                                <tr key={item?._id} className="hover:bg-gray-200">
                                                    <td className="py-4 px-6 border-b text-gray-700 text-lg">{item?.postOrComment}</td>
                                                    <td className="py-4 px-6 border-b text-gray-500">{item?.content}</td>
                                                    <td className="py-4 max-w-[200px] overflow-hidden text-ellipsis px-6 border-b text-gray-500">
                                                        {
                                                            item?.postOrComment === 'post' ?
                                                                <Link className='hover:bg-gray-100' target="_blank" to={`/${item?.linkToContent.postid}`}>{item?.linkToContent.title}</Link>
                                                                :
                                                                <div onClick={() => setOpenComment({ isOpen: true, content: item?.commentContent })} className='max-h-[100px] overflow-hidden text-ellipsis cursor-pointer hover:bg-gray-100' >{item?.commentContent}</div>
                                                        }
                                                    </td>
                                                    <td className="py-4 px-6 border-b text-gray-500">
                                                        <Link className='hover:bg-gray-100' target="_blank" to={`/profile/${item?.fromWho.userid}`}>{item?.fromWho.username}</Link>
                                                    </td>
                                                    <td className="py-4 px-6 border-b text-gray-500">
                                                        <Link className='hover:bg-gray-100' target="_blank" to={`/profile/${item?.guilty.userid}`}>{item?.guilty.username}</Link>
                                                    </td>
                                                    <td className="py-4 px-6 border-b text-gray-500">
                                                        <Moment date={item?.createdAt} format='DD MMM YYYY, hh:mm:ss' />
                                                    </td>
                                                    <td className="py-4 px-6 border-b text-gray-500">
                                                        <button onClick={() => handleSolve(item?._id)} type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Mark Solved</button>
                                                    </td>
                                                </tr>
                                            )
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div >
        </>
    )
}

export default AdminReportsPages