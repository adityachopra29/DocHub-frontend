import React, { useEffect } from "react"
import Navbar from "../components/navbar"
import Sidebar from "../components/sidebar"
import { useDispatch, useSelector } from "react-redux"
import CheckLogin from "../checkLogin"

export default function IndexPage(){

    const currentUser = useSelector((state:any) => state.currentUser)
    const dispatch = useDispatch();
    useEffect(() => {
      CheckLogin(dispatch);
    }, [dispatch]);
    
    console.log(currentUser.username)

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
