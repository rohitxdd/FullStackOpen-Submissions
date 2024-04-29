import { createSlice } from "@reduxjs/toolkit";

const BlogSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        setBlogs: (_, action) => {
            return action.payload
        },
        addBlog: (state, action) => {
            return [...state, action.payload]
        },
        removeBlog: (state, action) => {
            return state.filter((e) => e.id !== action.payload.id)
        }
    }
})
export const { setBlogs, addBlog, removeBlog } = BlogSlice.actions

export default BlogSlice.reducer