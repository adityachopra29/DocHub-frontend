import React from "react";
import {Button} from "@nextui-org/react";

export default function LoginPage(){

    function handleClick(){
        const authUrl = "http://localhost:8000/auth/oauth"
        window.location.href = authUrl;
    };
    
    return(
        <>
            <div className="flex-col justify-center items-center">
                <img src="dochub_logo.png" alt="Logo"/>
                <Button color="primary" onClick={handleClick}>
                    Login with Channeli
                </Button>
            </div>
        </>
    )
}