import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserFollowers } from '../redux/features/followersSlice'

function MyFollowers() {
    const dispatch = useDispatch()
    const { followers } = useSelector(state => state.followers)
    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const fetchFollowers = useCallback(() => {
        try {
            dispatch(getUserFollowers(user._id))
        } catch (error) {
            console.log(error)
        }
    }, [user._id, dispatch])

    useEffect(() => {
        fetchFollowers()
    }, [fetchFollowers])


    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[350px] mx-auto">
            <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl mx-auto font-bold leading-none text-gray-900 dark:text-white">My Followers</h3>
                </div>
                <div className="flow-root">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {
                            followers.length > 0 ? followers.map((follower, index) => (
                                <li key={index} className="py-3 sm:py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="bg-black rounded-full">
                                            <p className='w-8 h-8 rounded-full text-white uppercase flex items-center justify-center'>{follower?.username.slice(0, 2)}</p>
                                        </div>
                                        <div className="flex-1 min-w-0 hover: cursor-pointer">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                {follower.username}
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            <button onClick={() => navigate(`/profile/${follower.user}`)} className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                                Visit
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))
                                :
                                <div className='text-center text-sm text-slate-400'>You don't have followers!</div>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MyFollowers