import BackendClient from "./backendClient";
import { setUserData } from "./features/userSlice";


export default function CheckLogin(dispatch) {
    BackendClient.get("check_login/").then((res) => {
      console.log(res.data.isLoggedIn)
      if (!res.data.isLoggedIn) {
        console.log("user not logged in")
        window.location.href = "http://localhost:5173/";
      } else {
        dispatch(setUserData(res.data.user));
      }
    });
  }
