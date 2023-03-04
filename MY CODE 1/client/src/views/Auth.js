import React from 'react'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from "../components/auth/RegisterForm";
const Auth = ({authRoute}) => {
    let body

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