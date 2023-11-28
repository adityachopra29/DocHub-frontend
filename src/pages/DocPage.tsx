import React, { useEffect, useState } from "react"
import TextEditor from "../components/textEditor"
import Navbar from "../components/navbar"
import Sidebar from "../components/sidebar"
import checkIsLoggedIn from "../checkLogin"
import { useParams } from "react-router-dom"

export default function DocPage(){
    const [isLoggedIn, setLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchData = async () => {
        // console.log("Inside useEffect: ");
        let result = await checkIsLoggedIn();
    
        setLoggedIn(result)
        };
        
        fetchData();
    }, []);
    
    if(isLoggedIn === null){
        return(
            <>
                <div>Loading ...</div>
            </>
        )
    }
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
