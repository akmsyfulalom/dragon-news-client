import React, { useContext, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';


const Profile = () => {

    const { user } = useContext(AuthContext)
    const [name, setName] = useState(user?.displayName4)


    const photoURLUseRef = useRef(user.photoURL)



    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.target;
        console.log(photoURLUseRef.current.value)

    }
    const handleUserNameChange = (e) => {
        setName(e.target.value)
    }


    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control readOnly defaultValue={user?.email} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control onChange={handleUserNameChange} defaultValue={name} type="text" placeholder="your name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Your photoURL</Form.Label>
                    <Form.Control ref={photoURLUseRef} defaultValue={user?.photoURL} type="text" placeholder="your name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default Profile;