import { CreateApi,fakeBaseQuery,fetchBaseQuery } from "@reduxjs/toolkit/query";


const productSlice=({
    reducerPath:"productSlice" ,
    baseQuery:fetchBaseQuery({
        baseUrl:"https://dummyjson.com/c/"
    })


})