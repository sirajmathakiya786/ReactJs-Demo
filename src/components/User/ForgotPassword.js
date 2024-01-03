import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import axiosInstance from '../../config/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export default function ForgotPassword(){
    let navigate = useNavigate();
    const [email,setEmail] = useState("")
    
    const handleEmailChange = (e) =>{
        setEmail(e.target.value);
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const response = await axiosInstance.post("users/forgot-password",{
                email: email
            })
            if(response.status === 200){
                toast.success(response.data.message)
                setTimeout(()=>{
                    navigate('/verify-otp')
                },2000)
            }
        } catch (error) {
            if(error.response && error.response.data && error.response.data.message){
                toast.error(error.response.data.message)
            }
        }
    }
    return (
        <>
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={6}>
                    <Card>
                        <Card.Body>
                        <Card.Title>Forgot Password</Card.Title>
                            <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                value={email} 
                                onChange={handleEmailChange}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="mt-3">
                                Forgot Password
                            </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}