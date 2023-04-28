import { createSlice } from "@reduxjs/toolkit";

export const WaterSlice = createSlice({
    name: "water",
    initialState:{
        water:[
            {
                id: "1",
                value: 0.0,
            }            
        ],
    },
    reducers:{
        getWater:(state, action) => {
            state.water.push({...action.payload});
        },
        newWaterInput:(state,action) => {
            const inputPresent = state.water.find((input) => input.id === action.payload.id);
            if(inputPresent != 0){
                inputPresent.value += action.payload.value;
            }else {
                state.water.push({...action.payload.value})
            }
        },
}})

export const {newWaterInput, getWater} = WaterSlice.actions;

export default WaterSlice.reducer;