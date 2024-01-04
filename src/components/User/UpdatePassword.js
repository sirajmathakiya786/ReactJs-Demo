import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Header from "../Header";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";

export default function UpdatePassword(){
    let navigate = useNavigate();
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: ''
    })
    
    const handleChangePassword = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e)=>{
        try {
            e.preventDefault();
            const data = {
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword
            }

            const response = await axiosInstance.patch("users/change-password", data);
            if(response.status === 200){
                toast.success(response.data.message)
                setTimeout(()=>{
                    navigate('/login')
                },2000)
            }
        } catch (error) {
            if(error.response && error.response.data && error.response.data.message){
                toast.error(error.response.data.message)
            }
        }
    }
    const handleCancel = ()=>{
        setFormData({
            oldPassword: '',
            newPassword: ''    
        })
    }

    return (
        <>
        <Header/>
        <div className="container" style={{ marginTop: '100px' }}>
            <div className="row justify-content-center">
                <div className="col-md-9">
                    <div className="container mt-4">
                        <h2 className="mb-4">Update Password</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="oldPassword">
                            <Form.Label>Old Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="oldPassword"
                                value={formData.oldPassword}
                                onChange={handleChangePassword}
                            />
                            </Form.Group>
                            <Form.Group controlId="newPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChangePassword}
                            />
                            </Form.Group>

                            {/* <Form.Group controlId="confirmNewPassword">
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmNewPassword"
                            />
                            </Form.Group> */}
                            <br></br>
                            <Button variant="primary" type="submit">
                            Update Password
                            </Button>
                            <Link to="" style={{ marginLeft: '10px' }}>
                            <Button variant="danger" onClick={handleCancel}>Cancel</Button>
                            </Link>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}