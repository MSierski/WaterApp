import { configureStore, } from "@reduxjs/toolkit";
import WaterReducer from "./WaterReducer";
import HistoryReducer from "./HistoryReducer";

export default configureStore({
    reducer:{
       Water : WaterReducer,
       History: HistoryReducer
    }
})