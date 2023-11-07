import React, { useEffect, useState } from "react"
import TextEditor from "../components/textEditor"
import Navbar from "../components/navbar"
import Sidebar from "../components/sidebar"
import IsLoggedIn from "../checkLogin"

export default function DocPage(){
    const [isLoggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        setLoggedIn(IsLoggedIn());
    })

    if(!isLoggedIn){
        return(
            <>
                <div>
                    User is not logged in
                </div>
            </>
        )
    }
    return(
        <>
            <Navbar/>
            <div className="flex gap-0 w-full h-full">
                <Sidebar/>
                <div className="w-full">
                    <TextEditor />
                </div>
            </div>
        </>

    )

}
