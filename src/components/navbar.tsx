import React, { useEffect, useState } from "react"
import BackendClient from "../backendClient"
import { useDispatch, useSelector } from "react-redux"

export default function Navbar(){
    const [isUserDropDownOpen, setUserDropDownOpen] = useState<boolean>(false)
    const currentUser = useSelector((state:any) => state.currentUser)

    function Dropdown(){
        setUserDropDownOpen(!isUserDropDownOpen)
    }
    
    function logoutUser(){
        BackendClient.get("logout/").then(res => console.log(res.data))
        window.location.href = "http://localhost:5173/"
    }

    return(
        <>
    <nav className=" top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
        <div className="flex items-center justify-start">
            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
            <a href="http://localhost:5173/home" className="flex  ml-2 md:mr-24">
            <img src="dochub_logo.png" className="h-8 mr-3" alt="DochHub Logo" />
            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">DocHub</span>
            </a>
        </div>
        <div className="flex items-center">
            <div className="flex items-center ml-3 dark:hover:bg-gray-600 dark:hover:text-white rounded-xl" onClick={Dropdown}>
                
                <button  className=" px-4 py-2 text-sm text-gray-700  dark:text-gray-300 hover:text-grey-300  " >Hello, {currentUser.username}!</button>

                <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4">
                    <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo"/>
                </button>

                <div className={`z-50 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 ${isUserDropDownOpen ? "block" : "hidden"} absolute ml-[-101px] mt-[205px]`}>
                <div className="px-4 py-3" role="none">
                    <p className="text-sm text-gray-900 dark:text-white" role="none">
                    {currentUser.tag}
                    </p>
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                    {currentUser.email}
                    </p>
                </div>
                <ul className="py-1" role="none">
                    <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                    </li>
                    
                    <li>
                    <span onClick={logoutUser} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Logout</span>
                    </li>
                </ul>
                </div>
            </div>
            </div>
        </div>
    </div>
    </nav>

    </>
    )
}