import React, { useContext, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';

const Register = () => {
    const [error, setError] = useState('')
    const [accepted, setAccepted] = useState(false)
    const { createUser, loading, userProfileUpdated, varificationEmail, setLoading } = useContext(AuthContext)
    const navigate = useNavigate()
    if (loading) {
        return <div className='text-center mt-5'>
            <Spinner animation="border" variant="primary" />
        </div>
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.target;
        const name = form.name.value;
        const photoURL = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        createUser(email, password, name, photoURL)
            .then(result => {
                const user = result.user;
                form.reset();
                setError('')
                navigate('/')
                handleUpdateUserProfile(name, photoURL)
                handleEmailVarify()
                toast.success('Registation successfully done. please check your email and verify now! . verify must before login')

            })
            .catch(error => {
                console.error('Error:', error)
                setError(error.message)
            })
            .finally(() => {
                setLoading(false)
            })

    }

    const handleUpdateUserProfile = (name, photoURL) => {
        const profile = {
            displayName: name,
            photoURL: photoURL
        }
        userProfileUpdated(profile)
            .then(() => { })
            .then(error => console.error(error))
    }
    const handleEmailVarify = () => {
        varificationEmail()
            .then(() => { })
            .catch(error = console.e(error))
    }

    const handleAccepted = (e) => {
        setAccepted(e.target.checked)

    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label> Your name</Form.Label>
                <Form.Control name="name" type="text" placeholder="Enter your name" required />

            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Your photo URL</Form.Label>
                <Form.Control name="photo" type="text" placeholder="Your photo URL " />

            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Your email</Form.Label>
                <Form.Control name="email" type="email" placeholder="Enter email" required />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox"
                    onClick={handleAccepted}
                    label={<> Accept <Link to="/terms">Our terms and conditions</Link></>} />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!accepted}>
                Register
            </Button>
            <Form.Text className="text-danger">
                {error}
            </Form.Text>
        </Form >
    );
};

export default Register;