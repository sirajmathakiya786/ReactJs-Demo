import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import axiosInstance from '../../config/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function VerifyOTP(){
    let navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        otp: ''
    })

    const handleChange = (e) =>{
        setFormData({ 
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const data = {
                email: formData.email,
                otp: formData.otp
            }
            const response = await axiosInstance.post("users/verify-otp", data);
            console.log(response);
            if(response.status === 200){
                toast.success(response.data.message)
            }
        } catch (error) {
            if(error.response && error.response.data && error.response.data.error){
                const errorMessage = error.response.data.error
                if(errorMessage.includes('OTP has expired')){
                    toast.error(errorMessage);
                    setTimeout(()=>{
                        navigate('/forgot-password')
                    },2000)
                }else{
                    toast.error(errorMessage)
                }
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
                        <Card.Title>Verify OTP</Card.Title>
                            <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                type="email"
                                name="email" 
                                placeholder="Enter your email"
                                onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Label>OTP</Form.Label>
                                <Form.Control
                                type="number"
                                name="otp"
                                placeholder="Enter your otp"
                                onChange={handleChange}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="mt-3">
                                Verify OTP
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