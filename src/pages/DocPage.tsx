import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TextEditor from "../components/textEditor"
import Navbar from "../components/navbar"
import Sidebar from "../components/sidebar"
import CheckLogin from "../checkLogin"

export default function DocPage(){

    const currentUser = useSelector((state:any) => state.currentUser)
    const dispatch = useDispatch();
    useEffect(() => {
      CheckLogin(dispatch);
      console.log(currentUser)
    }, [dispatch]);
    
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
