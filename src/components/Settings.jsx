import React, { useState } from 'react'

function Settings() {
    const [theme, setTheme] = useState(window.localStorage.getItem('theme'))

    const handleTheme = () => {
        if (window.localStorage.getItem('theme') === null) {
            window.localStorage.setItem('theme', 'dark')
            document.documentElement.classList.remove('light')
            document.documentElement.classList.add('dark')
            return;
        }
        if (window.localStorage.getItem('theme') === 'light') {
            window.localStorage.setItem('theme', 'dark')
            document.documentElement.classList.remove('light')
            document.documentElement.classList.add('dark')
            setTheme('dark')
        }
        else if (window.localStorage.getItem('theme') === 'dark') {
            window.localStorage.setItem('theme', 'light')
            document.documentElement.classList.remove('dark')
            document.documentElement.classList.add('light')
            setTheme('light')
        }
    }

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[350px] mx-auto">
            <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl mx-auto font-bold leading-none text-gray-900 dark:text-white">Settings</h3>
                </div>
                <div className="flow-root">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        <li className="py-3 sm:py-4">
                            <label className="relative flex items-center justify-between cursor-pointer">
                                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Dark mode</span>
                                {
                                    theme === 'light' ?
                                        <div onClick={handleTheme} className='p-[6px] border rounded-lg flex items-center justify-center'>
                                            <svg aria-hidden="true" className="w-6 h-6 fill-gray-800 dark:fill-gray-800" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                        </div>
                                        :
                                        <div onClick={handleTheme} className='p-[6px] border rounded-lg flex items-center justify-center'>
                                            <svg aria-hidden="true" className="w-6 h-6 fill-white dark:fill-white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                                        </div>
                                }
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Settings