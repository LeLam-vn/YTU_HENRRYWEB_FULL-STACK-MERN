import {createContext, useReducer} from "react";
import {postReducer} from "../reducers/postReducer";
import {apiUrl, POST_LOADED_FAIL, POST_LOADED_SUCCESS} from "./constants";
import axios from "axios";

export const PostContext = createContext()

const PostContextProvider = ({children}) =>{
    //State
    const [postState, dispatch] = useReducer(postReducer,{
        posts:[],
        postsLoading: true
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


    //Context data

    const postContextData = {postState, getPosts}

    return(
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    )
}
export default PostContextProvider