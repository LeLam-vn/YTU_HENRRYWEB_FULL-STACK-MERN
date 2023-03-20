import {
    POST_LOADED_FAIL,
    POST_LOADED_SUCCESS,
    ADD_POST,
    DELETE_POST,
    UPDATE_POST,
    FIND_POST
} from "../contexts/constants";

export const postReducer = (state, action)=>{
    const {type, payload} = action;
    switch (type){
        case POST_LOADED_SUCCESS:
            return {
                ...state,
                posts: payload,
                postsLoading: false
            }
        case POST_LOADED_FAIL:
            return {
                ...state,
                posts: [],
                postsLoading: false
            }
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, payload]
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post=>post._id!== payload)
            }
        case FIND_POST:
            return {
                ...state,
                post: payload
            }
        case UPDATE_POST:
            // const newPosts = state.posts.map(post=>{
            //     if(post._id===payload._id)
            //         return payload
            //     return post
            // })
            // return {
            //     ...state,
            //     posts:newPosts
            // }

            const newPosts = state.posts.map(post =>{
                console.log('post:', post)
                console.log('payload: ', payload)
                return(
                    post._id === payload._id ? payload : post)
            }

            )

            return {
                ...state,
                posts: newPosts
            }

        default:
            return state
    }
}