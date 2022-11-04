import React, { useContext, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';

const Login = () => {
    const [error, setError] = useState('')
    const { logIn, loading, setLoading } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    if (loading) {
        return <div className='text-center mt-5'>
            <Spinner animation="border" variant="primary" />
        </div>
    }

    const handleLogIn = (event) => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        logIn(email, password)
            .then(result => {
                const user = result.user;
                form.reset();
                setError('');
                if (user.emailVerified) {
                    navigate(from, { replace: true })
                } else {
                    toast.error('your eamil is not varified. please virify email')
                }

            })
            .catch(e => {
                console.error(e)
                setError(e.message)

            })
            .finally(() => {
                setLoading(false)
            })


    }
    return (
        <Form onSubmit={handleLogIn}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name="email" type="email" placeholder="Enter email" />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
            <Form.Text className="text-danger">
                {error}
            </Form.Text>

        </Form>
    );
};

export default Login;