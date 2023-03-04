import {createContext, useReducer} from "react";
import axios from "axios";
import {authReducer} from "../reducers/authReducer";
import {apiUrl, LOCAL_STORAGE_TOKEN_NAME} from "./constants";

//create Context
export const AuthContext = createContext()

const AuthContextProvider = ({children}) =>{

    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })

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
            console.log('response.data: ', response.data)
            return response.data
        }
        catch (error) {
            if (error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    //Context data

    const authContextData = {loginUser}

    //Return provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider