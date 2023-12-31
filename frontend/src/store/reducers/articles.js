

import { createSlice } from '@reduxjs/toolkit';

import {
    addArticle,
} from '../actions/articles'

export const articlesSlice = createSlice({
    name:'articles',
    initialState:{
        homeSort:{
            sortby:"_id",
            order:"desc",
            limit:8,
            skip:0
        },
        loading:false,
        articles:[],
        current:null
        
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        /// ADD ARTICLE
        .addCase(addArticle.pending,(state)=>{ state.loading = true; })
        .addCase(addArticle.fulfilled,(state,action)=>{
            state.loading = false;
            state.lastAdded = action.payload
        })
       
    }

});

/// action......
export default articlesSlice.reducer;