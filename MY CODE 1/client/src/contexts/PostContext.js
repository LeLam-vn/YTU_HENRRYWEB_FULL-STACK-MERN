import {createContext, useReducer, useState} from "react";
import {postReducer} from "../reducers/postReducer";
import {apiUrl, POST_LOADED_FAIL, POST_LOADED_SUCCESS, ADD_POST, DELETE_POST, UPDATE_POST, FIND_POST} from "./constants";
import axios from "axios";

export const PostContext = createContext()

const PostContextProvider = ({children}) =>{
    //State
    const [postState, dispatch] = useReducer(postReducer,{
        post: null,
        posts:[],
        postsLoading: true
    });
    // Setup Modal

    const [showAddPostModal, setShowAddPostModal] = useState(false);
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);

    const [showToast, setShowToast] = useState({
        show: false,
        message:'',
        type: null

    });

    //Get All Post

    const getPosts = async ()=>{
        try{
            const response = await axios.get(`${apiUrl}/posts`)
            if(response.data.success)
                dispatch({
                    type: POST_LOADED_SUCCESS,
                    payload: response.data.posts
                })
        }
        catch (error) {
            dispatch({
                type:POST_LOADED_FAIL
            })
            return error.response.data? error.response.data : {success: false, message:'Error Server!'}
        }
    }

    //Add post
    const addPost = async newPost => {
        try{
            const response = await axios.post(`${apiUrl}/posts`, newPost)
            if (response.data.success){
                dispatch({
                    type: ADD_POST,
                    payload: response.data.post
                })
                return response.data
            }
        }
        catch (error) {
            return error.response.data
            ?error.response.data
            :{success:false, message:'Server error'}
        }
    }

    //Delete Post
    const deletePost = async postId =>{
        try{
            const response = await axios.delete(`${apiUrl}/posts/${postId}`)
            if(response.data.success)
                dispatch({
                    type: DELETE_POST,
                    payload: postId
                })
        }
        catch (error){
            console.log(error)
        }
    }

    //Find post when user updating post

    const findPost = postId =>{
        const post = postState.posts.find(post => post._id === postId)
        dispatch({
            type: FIND_POST,
            payload: post
        })
    }


    //Update post
    const updatePost = async updatedPost => {
        try{
            const response = await axios.put(
                `${apiUrl}/posts/${updatedPost._id}`,
                updatedPost
                )
            console.log('response: ',response)
            console.log('response.data: ',response.data)
            console.log('response.data.updatedPost: ',response.data.updatedPost)
            if (response.data.success){
                dispatch({
                    type: UPDATE_POST,
                    payload: response.data.updatedPost})
                // console.log('response.data.post:', response.data.post)
            return response.data
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : {success: false, message: 'Server error'}
        }
    }

    //Context data

    const postContextData = {
        postState,
        getPosts,
        showAddPostModal,
        setShowAddPostModal,
        showUpdatePostModal,
        setShowUpdatePostModal,
        addPost,
        showToast,
        setShowToast,
        deletePost,
        updatePost,
        findPost,

    }

    return(
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    )
}
export default PostContextProvider