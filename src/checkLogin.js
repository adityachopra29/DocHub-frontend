import BackendClient from "./backendClient";

// We have to return a promise from here and resolve it there
export default function checkIsLoggedIn() {
  console.log("inside IsLoggedIn");
//   this what we are returning is a promise
    return BackendClient.get("check_login/")
    .then(res => {
        console.log(res.data)
        let { isLoggedIn, userData } = res.data
        return isLoggedIn
    })
    }
