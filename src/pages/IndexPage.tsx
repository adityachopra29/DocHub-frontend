import React, { useEffect } from "react"
import Navbar from "../components/navbar"
import Sidebar from "../components/sidebar"

export default function IndexPage(){
    return(
        <>
        <Navbar/>
        <div className="flex gap-0 w-full h-full">
            <Sidebar/>
            <div className=" w-full">
                This is index page
            </div>
        </div>
        
        </>

    )

}
