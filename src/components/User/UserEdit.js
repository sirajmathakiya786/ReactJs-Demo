import React, { useState } from "react";
import Header from "../Header"; // Make sure to import Header component
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";
import { useParams } from 'react-router-dom';

export default function UserEdit() {
  const {userData} = useLocation().state || {};
  
  const [formData, setFormData] = useState({
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    email: userData?.email || '',
    phoneNumber: userData?.phoneNumber || '',
  })

  const handleChange = (e) =>{
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const data = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.email,
      }

      const response = await axiosInstance.patch(`users/update/${userData._id}`, data);
      if(response.status === 200){
        toast.success(response.data.message)
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <>
      <Header />
      <div className="container" style={{ marginTop: '100px' }}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="firstname" className="form-label">
                  FirstName
                </label>
                <input
                  type="text"
                  className= "form-control"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
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
                  value={formData.lastName}
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
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your Email"
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
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your PhoneNumber"
                />
              </div>               
              <div className="mb-3">
                <button  type="submit" className="btn btn-success">
                  Submit
                </button>
                <Link to="/user" style={{ marginLeft: '10px' }} className="btn btn-danger">
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
