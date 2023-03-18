export const apiUrl = process.env.NODE_ENV !=='production' ? 'http://localhost:5005/api':'somedeploy URL'
export const LOCAL_STORAGE_TOKEN_NAME = 'learnit-mern-ll'

export const POST_LOADED_SUCCESS = 'POST_LOADED_SUCCESS'
export const POST_LOADED_FAIL = 'POST_LOADED_FAIL'
export const ADD_POST = 'ADD_POST'