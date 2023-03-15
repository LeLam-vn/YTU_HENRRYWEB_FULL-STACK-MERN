import React, {useContext, useState} from 'react'
import {Link} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const RegisterForm = () => {

    //Context
    const{registerUser} = useContext(AuthContext)

    //local state
    const [registerForm, setRegisterForm] =useState({
        username:'',
        password:'',
        confirmPassword:''
    })

    const [alert, setAlert] = useState(null);

    const {username, password, confirmPassword} = registerForm

    const onChangeRegisterForm = event =>{
        setRegisterForm({
            ...registerForm,
            [event.target.name]: event.target.value
        })
        console.log('onChangeRegisterForm')
    }

    const register = async event => {
        event.preventDefault()
        if(password!==confirmPassword){
            setAlert({type: 'danger', message:'Confirm password do not match'})
            setTimeout(()=>setAlert(null), 153000)
            console.log('register button-false confirmPassword')
            return
        }
        try{
            const registerData = await registerUser(registerForm)
            if(!registerData.success){
                setAlert({type:'danger', message: registerData.message})
                console.log('message: registerData.message: ', registerData.message)
                setTimeout(()=>setAlert(null), 150000)
                console.log('register button-true')
                //
                // if(!loginData.success){
                //     //     history.push('/dashboard')
                //     // } else {
                //     setAlert({type:'danger', message:loginData.message})
                //     setTimeout(()=> setAlert(null),3000)
                // }
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Form className='my-4' onSubmit={register}>
                <AlertMessage info = {alert}/>
                <Form.Group className='my-2'>
                    <Form.Control
                        type='text'
                        placeholder='Username'
                        name='username'
                        required
                        value={username}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group className='my-2'>
                    <Form.Control
                        type = 'password'
                        placeholder='Password'
                        name='password'
                        required
                        value={password}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group  className='my-2'>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        name ='confirmPassword'
                        required
                        value={confirmPassword}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                    <Button variant='success' type='submit' onSubmit={register}>
                        Register
                    </Button>
                </Form>
                    <p> Do you have an account
                     <Link to='/login'>
                        <Button
                            variant='info'
                            size='sm'
                            className='ml-2'
                        >
                            Login
                        </Button>
                    </Link>
                    </p>
        </>
    )
}
export default RegisterForm