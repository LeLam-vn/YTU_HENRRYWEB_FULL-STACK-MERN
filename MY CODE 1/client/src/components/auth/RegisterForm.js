import React from 'react'
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";

const RegisterForm = () => {
    return (
        <>
            <Form className='my-4'>
                <Form.Group className='my-2'>
                    <Form.Control type='text' placeholder='username' name='username' required/>
                </Form.Group>
                <Form.Group className='my-2'>
                    <Form.Control type = 'password' placeholder='password' name='password' required/>
                </Form.Group>
                <Form.Group  className='my-2'>
                    <Form.Control type='confirm password' placeholder='confirm password' name ='confirm password' required/>
                </Form.Group>
                <Form.Group className='my-2'>
                    <Button>
                        Register
                    </Button>
                </Form.Group>
                <Form.Group className='my-2'>
                    <p> Do you have an account</p>
                    <Link to='login'>
                        <Button variant='info' size='sm' className='ml-2'> Login</Button>
                    </Link>
                </Form.Group>
            </Form>
        </>
    )
}
export default RegisterForm