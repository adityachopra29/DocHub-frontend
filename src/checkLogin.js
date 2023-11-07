import BackendClient from "./backendClient";

export default function IsLoggedIn(){
    let userLoggedin = false
    BackendClient.get("http://localhost/8000/check_login/")
    .then(res => {
        const parsedObject = JSON.parse(res);
        console.log(parsedObject);
        if(parsedObject.isLoggedIn){
            console.log("user is logged in")
            userLoggedin =  true;
        }
    })
    return userLoggedin;
}