import React, {useContext} from 'react'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from "../components/auth/RegisterForm";
import Spinner from "react-bootstrap/Spinner"
import {AuthContext} from "../contexts/AuthContext";
import {Redirect} from "react-router-dom";
const Auth = ({authRoute}) => {
    const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext)

    let body
    if(authLoading)
        body = (
            <div className='d-flex justify-content-center mt-2'>
                <Spinner animation='border' variant='info' />
            </div>
        )
    else if (isAuthenticated) return <Redirect to='/dashboard'/>
    else
        body = (
        <>
            {authRoute ==='login' && <LoginForm/>}
            {authRoute ==='register'&& <RegisterForm/>}
        </>
    )

    return(
        <div className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1>Learn IT</h1>
                    <h1> Keep track of what you are learning</h1>
                    {body}
                </div>
            </div>
        </div>
    )

}
export default Auth