import { createSlice } from "@reduxjs/toolkit";

export const HisSlice = createSlice({
    name: "history",
    initialState:{
        history:[],
    },
    reducers:{
        getHis:(state, action) => {
            const inputPresent = state.history.find((input) => input.date === action.payload.date);
            if(inputPresent) {
                inputPresent.date = action.payload.date;
                inputPresent.waterDrinked = action.payload.waterDrinked;
                inputPresent.howMuch = action.payload.howMuch;      
            }
            else{
                state.history.push({...action.payload});
            }
        },
}})

export const { getHis } = HisSlice.actions;

export default HisSlice.reducer;