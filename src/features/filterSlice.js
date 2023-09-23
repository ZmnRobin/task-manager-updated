import {createSlice } from "@reduxjs/toolkit";

const initialState = {
    filterBy:["Scoreboard","Flight Booking","Product Cart","Book Store","Blog Application","Job Finder"],
    searchedBy:'',
};

// create slice
const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers:{
        setFilterBy:(state,action)=>{
            if (state.filterBy.includes(action.payload)) {
                const index = state.filterBy.indexOf(action.payload);
                if (index !== -1) {
                   state.filterBy.splice(index, 1);
                }
            }else{
                state.filterBy.push(action.payload)
            }
        },
        setSearchedBy:(state,action)=>{
            state.searchedBy=action.payload;
        }
    },
})

export default filterSlice.reducer;
export const {setFilterBy,setSearchedBy}=filterSlice.actions;