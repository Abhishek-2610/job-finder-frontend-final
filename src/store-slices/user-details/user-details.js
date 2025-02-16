import { createSlice } from "@reduxjs/toolkit";
import { encryptData } from "../../utils/crypto";

// A slice is a part of the global state
// This slice will be responsible for storing the userId for future use
export const userSlice = createSlice({
    name : 'userId', 
    initialState : {userId : null},
    reducers : {
        updateUserId : (state, action) => {
            state.userId = encryptData(action.payload)
        }
    } 
})
// exporting each reducer functionalities so that they can be accessed by the components
export const {updateUserId} = userSlice.actions

export default userSlice.reducer
