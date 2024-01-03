import React, { useState } from "react";
import Header from "../Header"; // Make sure to import Header component
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";

export default function UserAdd() {
    let navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        refer: '',
        role: 'manager'
    })
    console.log(formData);
    const handleChange = (e) =>{
        
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e)=>{
        try {
            e.preventDefault();
        const data = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            phoneNumber: formData.phoneNumber,
            refer: formData.refer,
            role: formData.role
        }
        const response = await axiosInstance.post("users/add",data)
        if(response.status === 201){
            toast.success(response.data.message)
            setTimeout(()=>{
                navigate('/user')
            },2000)
        }
        } catch (error) {
            toast.error(error.response.data.message)   
        }
    }
  return (
    <>
      <Header />
      <div className="container" style={{ marginTop: '100px' }}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit} >
              <div className="mb-3">
                <label htmlFor="firstname" className="form-label">
                  FirstName
                </label>
                <input
                  type="text"
                  className= "form-control"
                  id="firstName"
                  name="firstName"
                  onChange={handleChange}
                  placeholder="Enter your FirstName"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastname" className="form-label">
                  LastName
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  onChange={handleChange}
                  placeholder="Enter your LastName"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter your Email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter your Password"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phonenumber" className="form-label">
                  PhoneNumber
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="phoneNumber"
                  name="phoneNumber"
                  onChange={handleChange}
                  placeholder="Enter your PhoneNumber"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="refer" className="form-label">
                    Refer
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="refer"
                  name="refer"
                  value={formData.refer}
                  onChange={handleChange}
                  placeholder="Enter your Refer"
                />
              </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">
                        Role
                    </label>
                    <select className="form-select" id="role" name="role"  value={formData.role}
                  onChange={handleChange}>
                        <option value="user">User</option>
                    </select>
                </div>
              <div className="mb-3">
                <button  type="submit" className="btn btn-success">
                  Submit
                </button>
                <Link to="" style={{ marginLeft: '10px' }} className="btn btn-danger">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
