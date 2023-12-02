import { User } from "@nextui-org/react";
import { createSlice } from "@reduxjs/toolkit";

// interface User{
//     username : String
//     enrollment_no : number
//     email : String
//     tag : String
//     phone_no : number
// }

interface currentUser{
    username : String
    enrollment_no : String
    email : String
    tag : String
    phone_no : String
}


const initialState: currentUser = {
    username : "",
    enrollment_no : "",
    email : "",
    tag : "",
    phone_no : ""
}   

export const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers: {
        setUserData : (state, action) => {
            // console.log("We inside setuserdata in userslice and currentUser: "+state.username)
                state.phone_no = action.payload.phone_no;
                state.enrollment_no = action.payload.enrollment_no;
                state.username = action.payload.username;
                state.email = action.payload.email;
                state.tag = action.payload.tag;
            // console.log("We inside setuserdata in userslice and currentUser: "+state.username)
        }
    }
})

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;