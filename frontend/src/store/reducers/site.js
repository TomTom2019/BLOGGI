import { createSlice } from '@reduxjs/toolkit';

export const siteSlice = createSlice({
    name:'site',
    initialState:{
        layout:''
    },
    reducers:{
         setLayout:(state,action)=>{
        state.layout = action.payload
       }
    }
});

/// action......
export const { setLayout } = siteSlice.actions;
export default siteSlice.reducer;