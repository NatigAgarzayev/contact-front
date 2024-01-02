import React from 'react'
import { useNavigate } from 'react-router-dom'

function FAQ() {
    const navigate = useNavigate()
    return (
        <div>
            <section
                className="relative z-20 h-screen overflow-hidden bg-white pt-5 pb-10 dark:bg-gray-800"
            >
                <button onClick={() => navigate('/')} type="button" className="absolute z-20 left-10 top-10 text-slate-500 border border-slate-500 hover:bg-slate-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800">
                    <svg aria-hidden="true" className="rotate-180 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
                <div className="container mx-auto">
                    <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4">
                            <div className="mx-auto mb-[60px] max-w-[520px] text-center lg:mb-20">
                                <span className="mb-2 block text-lg font-semibold text-primary dark:text-white/90">
                                    FAQ
                                </span>
                                <h2
                                    className="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px] dark:text-white/90"
                                >
                                    Any Questions? Look Here
                                </h2>
                                <p className="text-base text-body-color dark:text-white/90">
                                    There are many variations of passages of Lorem Ipsum available but
                                    the majority have suffered alteration in some form.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4 lg:w-1/2">
                            <div
                                className="single-faq mb-8 w-full rounded-lg border border-[#F3F4FE] bg-white p-4 sm:p-8 lg:px-6 xl:px-8 dark:bg-gray-900"
                            >
                                <button
                                    className="faq-btn flex w-full text-left"
                                >
                                    <div
                                        className="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary bg-opacity-5 text-primary"
                                    >
                                        <svg
                                            width="17"
                                            height="10"
                                            viewBox="0 0 17 10"
                                            className="icon fill-current"
                                        >
                                            <path
                                                className='fill-blue-700 stroke-blue-700 dark:fill-white dark:stroke-white'
                                                d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
                                                fill="#3056D3"
                                                stroke="#3056D3"
                                            />
                                        </svg>
                                    </div>
                                    <div className="w-full">
                                        <h4 className="text-lg font-semibold text-black dark:text-white/90">
                                            How long we deliver your first blog post?
                                        </h4>
                                    </div>
                                </button>
                                <div x-show="openFaq1" className="faq-content pl-[62px]">
                                    <p className="py-3 text-base leading-relaxed text-body-color dark:text-white/90">
                                        It takes 2-3 weeks to get your first blog post ready. That
                                        includes the in-depth research & creation of your monthly content
                                        marketing strategy that we do before writing your first blog post,
                                        Ipsum available .
                                    </p>
                                </div>
                            </div>
                            <div
                                className="single-faq mb-8 w-full rounded-lg border border-[#F3F4FE] bg-white p-4 sm:p-8 lg:px-6 xl:px-8 dark:bg-gray-900"
                            >
                                <button
                                    className="faq-btn flex w-full text-left"
                                >
                                    <div
                                        className="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary bg-opacity-5 text-primary"
                                    >
                                        <svg
                                            width="17"
                                            height="10"
                                            viewBox="0 0 17 10"
                                            className="icon fill-current"
                                        >
                                            <path
                                                className='fill-blue-700 stroke-blue-700 dark:fill-white dark:stroke-white'
                                                d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
                                                fill="#3056D3"
                                                stroke="#3056D3"
                                            />
                                        </svg>
                                    </div>
                                    <div className="w-full">
                                        <h4 className="text-lg font-semibold text-black dark:text-white/90">
                                            How long we deliver your first blog post?
                                        </h4>
                                    </div>
                                </button>
                                <div x-show="openFaq2" className="faq-content pl-[62px]">
                                    <p className="py-3 text-base leading-relaxed text-body-color dark:text-white/90">
                                        It takes 2-3 weeks to get your first blog post ready. That
                                        includes the in-depth research & creation of your monthly content
                                        marketing strategy that we do before writing your first blog post,
                                        Ipsum available .
                                    </p>
                                </div>
                            </div>
                            <div
                                className="single-faq mb-8 w-full rounded-lg border border-[#F3F4FE] bg-white p-4 sm:p-8 lg:px-6 xl:px-8 dark:bg-gray-900"
                            >
                                <button
                                    className="faq-btn flex w-full text-left"
                                >
                                    <div
                                        className="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary bg-opacity-5 text-primary"
                                    >
                                        <svg
                                            width="17"
                                            height="10"
                                            viewBox="0 0 17 10"
                                            className="icon fill-current"
                                        >
                                            <path
                                                className='fill-blue-700 stroke-blue-700 dark:fill-white dark:stroke-white'
                                                d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
                                                fill="#3056D3"
                                                stroke="#3056D3"
                                            />
                                        </svg>
                                    </div>
                                    <div className="w-full">
                                        <h4 className="text-lg font-semibold text-black dark:text-white/90">
                                            How long we deliver your first blog post?
                                        </h4>
                                    </div>
                                </button>
                                <div x-show="openFaq3" className="faq-content pl-[62px]">
                                    <p className="py-3 text-base leading-relaxed text-body-color dark:text-white/90">
                                        It takes 2-3 weeks to get your first blog post ready. That
                                        includes the in-depth research & creation of your monthly content
                                        marketing strategy that we do before writing your first blog post,
                                        Ipsum available .
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-4 lg:w-1/2">
                            <div
                                className="single-faq mb-8 w-full rounded-lg border border-[#F3F4FE] bg-white p-4 sm:p-8 lg:px-6 xl:px-8 dark:bg-gray-900"
                            >
                                <button
                                    className="faq-btn flex w-full text-left"
                                >
                                    <div
                                        className="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary bg-opacity-5 text-primary"
                                    >
                                        <svg
                                            width="17"
                                            height="10"
                                            viewBox="0 0 17 10"
                                            className="icon fill-current"
                                        >
                                            <path
                                                className='fill-blue-700 stroke-blue-700 dark:fill-white dark:stroke-white'
                                                d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
                                                fill="#3056D3"
                                                stroke="#3056D3"
                                            />
                                        </svg>
                                    </div>
                                    <div className="w-full">
                                        <h4 className="text-lg font-semibold text-black dark:text-white/90">
                                            How long we deliver your first blog post?
                                        </h4>
                                    </div>
                                </button>
                                <div x-show="openFaq4" className="faq-content pl-[62px]">
                                    <p className="py-3 text-base leading-relaxed text-body-color dark:text-white/90">
                                        It takes 2-3 weeks to get your first blog post ready. That
                                        includes the in-depth research & creation of your monthly content
                                        marketing strategy that we do before writing your first blog post,
                                        Ipsum available .
                                    </p>
                                </div>
                            </div>
                            <div
                                className="single-faq mb-8 w-full rounded-lg border border-[#F3F4FE] bg-white p-4 sm:p-8 lg:px-6 xl:px-8 dark:bg-gray-900"
                            >
                                <button
                                    className="faq-btn flex w-full text-left"
                                >
                                    <div
                                        className="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary bg-opacity-5 text-primary"
                                    >
                                        <svg
                                            width="17"
                                            height="10"
                                            viewBox="0 0 17 10"
                                            className="icon fill-current"
                                        >
                                            <path
                                                className='fill-blue-700 stroke-blue-700 dark:fill-white dark:stroke-white'
                                                d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
                                                fill="#3056D3"
                                                stroke="#3056D3"
                                            />
                                        </svg>
                                    </div>
                                    <div className="w-full">
                                        <h4 className="text-lg font-semibold text-black dark:text-white/90">
                                            How long we deliver your first blog post?
                                        </h4>
                                    </div>
                                </button>
                                <div x-show="openFaq5" className="faq-content pl-[62px]">
                                    <p className="py-3 text-base leading-relaxed text-body-color dark:text-white/90">
                                        It takes 2-3 weeks to get your first blog post ready. That
                                        includes the in-depth research & creation of your monthly content
                                        marketing strategy that we do before writing your first blog post,
                                        Ipsum available .
                                    </p>
                                </div>
                            </div >
                            <div
                                className="single-faq mb-8 w-full rounded-lg border border-[#F3F4FE] bg-white p-4 sm:p-8 lg:px-6 xl:px-8 dark:bg-gray-900"
                            >
                                <button
                                    className="faq-btn flex w-full text-left"
                                >
                                    <div
                                        className="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary bg-opacity-5 text-primary"
                                    >
                                        <svg
                                            width="17"
                                            height="10"
                                            viewBox="0 0 17 10"
                                            className="icon fill-current"
                                        >
                                            <path
                                                className='fill-blue-700 stroke-blue-700 dark:fill-white dark:stroke-white'
                                                d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
                                                fill="#3056D3"
                                                stroke="#3056D3"
                                            />
                                        </svg>
                                    </div>
                                    <div className="w-full">
                                        <h4 className="text-lg font-semibold text-black dark:text-white/90">
                                            How long we deliver your first blog post?
                                        </h4>
                                    </div>
                                </button>
                                <div x-show="openFaq6" className="faq-content pl-[62px]">
                                    <p className="py-3 text-base leading-relaxed text-body-color dark:text-white/90">
                                        It takes 2-3 weeks to get your first blog post ready. That
                                        includes the in-depth research & creation of your monthly content
                                        marketing strategy that we do before writing your first blog post,
                                        Ipsum available .
                                    </p>
                                </div>
                            </div >
                        </div >
                    </div >
                </div >
                <div className="absolute bottom-0 right-0 z-[-1]">
                    <svg
                        width="1440"
                        height="886"
                        viewBox="0 0 1440 886"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            opacity="0.5"
                            d="M193.307 -273.321L1480.87 1014.24L1121.85 1373.26C1121.85 1373.26 731.745 983.231 478.513 729.927C225.976 477.317 -165.714 85.6993 -165.714 85.6993L193.307 -273.321Z"
                            fill="url(#paint0_linear)"
                        />
                        <defs>
                            <linearGradient
                                id="paint0_linear"
                                x1="1308.65"
                                y1="1142.58"
                                x2="602.827"
                                y2="-418.681"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#fff" stopOpacity="0.36" />
                                <stop offset="1" stopColor="#000" stopOpacity="0" />
                                <stop offset="1" stopColor="#000" stopOpacity="0.096144" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </section >

        </div >
    )
}

export default FAQ