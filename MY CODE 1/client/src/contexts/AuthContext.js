import {createContext, useEffect, useReducer} from "react";
import axios from "axios";
import {authReducer} from "../reducers/authReducer";
import {apiUrl, LOCAL_STORAGE_TOKEN_NAME} from "./constants";
import setAuthToken from "../utils/setAuthToken";

//create Context
export const AuthContext = createContext()


const AuthContextProvider = ({children}) =>{

    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })
    // Authenticate User
    const loadUser = async () =>{
            if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
                setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])

            }
            try{
                const response = await axios.get(`${apiUrl}/auth`)
                if (response.data.success){
                    console.log('toi day')
                    dispatch({
                        type:'SET_AUTH',
                        payload:{
                            isAuthenticated: true,
                            user: response.data.user
                        }
                    })
                    console.log("response: ", response)
                }
            }
            catch (error) {
                localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
                setAuthToken(null)
                dispatch({
                    type:'SET_AUTH',
                    payload:{
                        isAuthenticated: false,
                        user: null
                    }
                })
                console.log("response 2: ")
            }
    }


    // useEffect(() => loadUser(), [])
    useEffect(() => {
      loadUser()
    }, [])

    //Login
    const loginUser = async userForm =>{

        // console.log('userForm: ', userForm)
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, userForm)
            if (response.data.success)
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    response.data.accessToken
                )
            await loadUser()
            console.log('response.data: ', response.data)
            return response.data
        }
        catch (error) {
            if (error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    //Register

    const registerUser = async userForm =>{
        try{
            const response = await axios.post(`${apiUrl}/auth/register`,userForm)
            if (response.data.success)
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    response.data.accessToken
                )
            await loadUser()

            return response.data
        }
        catch (error) {
            if (error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    //Logout User
    const logoutUser = ()=>{
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        dispatch({
            type: 'SET_AUTH',
            payload:{isAuthenticated:false, user: null}
        })
    }

    //Context data

    const authContextData = {loginUser, registerUser, logoutUser, authState}

    //Return provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider