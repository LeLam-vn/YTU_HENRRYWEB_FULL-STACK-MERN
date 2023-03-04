import React, {useContext, useState} from 'react';
import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext";

const LoginForm = () => {
    //Context
    const {loginUser} = useContext(AuthContext);

    //Router
    const history = useHistory()

    // Local state
    const [loginForm, setLoginForm] = useState({
        username:'',
        password:''
    });

    const {username, password} = loginForm

    const onChangeLoginForm = event => {
        setLoginForm({
            ...loginForm,
            [event.target.name]:event.target.value
        })
        console.log('[event.target.value]: ',[event.target.value])
    }
    console.log('username: ', username)
    console.log('password: ', password)


    const login = async event => {
        console.log('Click Login')
        event.preventDefault()
        try {
            const loginData = await loginUser(loginForm)
            console.log(loginData)
            if(loginData.success){
                history.push('/dashboard')
            }
        }
        catch (error) {
            console.log(error)
        }

    }

    return(
        <>
            <Form className='my-4' onSubmit={login}>
                <Form.Group className='my-2'>
                    <Form.Control
                        type='text'
                        placeholder ='username'
                        name ='username'
                        required
                        value={username}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Form.Group  className='my-2'>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        name ='password'
                        required
                        value={password}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Button
                    className='my-2'
                    variant='success'
                    type='submit'
                    onSubmit={login}
                >
                    Login
                </Button>
            </Form>
            <p>
                You don't have a account?
                <Link to='register'>
                    <Button
                        variant='info'
                        size='sm'
                        className='ml-2'
                    >
                        Register
                    </Button>
                </Link>
            </p>
        </>
    )
}
export default LoginForm