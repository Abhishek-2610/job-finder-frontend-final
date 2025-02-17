import { createSlice } from "@reduxjs/toolkit";

export const NavPageSlice = createSlice({
    name : 'navPage', 
    initialState : {page : 'home'},
    reducers : {
        updateNavPage : (state, action) => {
            state.page = action.payload
        }
    } 
})
// exporting each reducer functionalities so that they can be accessed by the components
export const {updateNavPage} = NavPageSlice.actions

export default NavPageSlice.reducer