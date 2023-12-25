

import { createSlice } from '@reduxjs/toolkit';

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

    }
});

/// action......
export default articlesSlice.reducer;