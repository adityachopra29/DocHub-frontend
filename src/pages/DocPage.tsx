import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TextEditor from "../components/textEditor"
import Navbar from "../components/navbar"
import Sidebar from "../components/sidebar"
import CheckLogin from "../checkLogin"
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider }  from 'react-router-dom';

export default function DocPage(){

    const currentUser = useSelector((state:any) => state.currentUser)
    const currentDocumentID = useSelector((state: any) => state.openDocument.documentId)
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
                    {currentDocumentID == -1 ? <> <div>Index Page</div></> : <><TextEditor/></>}
                </div>
            </div>
        </>

    )

}
