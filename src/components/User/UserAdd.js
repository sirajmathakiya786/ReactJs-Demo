import React, { useRef, useState } from "react";
import Header from "../Header"; // Make sure to import Header component
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";

export default function UserAdd() {
    let navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState('');
    const inputRef = useRef('');

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        refer: '',
        role: 'user',
        profileImage: ''
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
            const data = new FormData();
            data.append("firstName", formData.firstName);
            data.append("lastName", formData.lastName);
            data.append("email", formData.email);
            data.append("password", formData.password);
            data.append("phoneNumber", formData.phoneNumber);
            data.append("refer", formData.refer);
            data.append("role", formData.role);
            data.append("profileImage", formData.profileImage); 
          // const data = {
          //   firstName: formData.firstName,
          //   lastName: formData.lastName,
          //   email: formData.email,
          //   password: formData.password,
          //   phoneNumber: formData.phoneNumber,
          //   refer: formData.refer,
          //   role: formData.role
          // }
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

    const handleCancel = ()=>{
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        refer: '',
        profileImage: ''
      })
    }

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setFormData({
          ...formData,
          profileImage: file
        })
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
    
    const handleImageBoxClick = () => {
      inputRef.current.click();
    };
    
    const removeImage = () => {
      setFormData({
        ...formData,
        profileImage: ''
      })
      setSelectedImage('');
    };
  
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
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
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
                  value={formData.phoneNumber}
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
                <label htmlFor="profileImage" className="form-label" onClick={handleImageBoxClick} style={{ cursor: 'pointer' }}>
                  Profile Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="profileImage"
                  name="profileImage"
                  onChange={handleImageChange}
                  ref={inputRef}
                  style={{ display: 'none' }}
                />

                <div
                  className="mt-3"
                  style={{ width: '200px', height: '200px', border: '1px solid #ccc', overflow: 'hidden', position: 'relative', cursor: 'pointer' }}
                  onClick={handleImageBoxClick}
                >
                  {selectedImage ? (
                    <>
                      <span
                        style={{ position: 'absolute', top: '5px', right: '5px', cursor: 'pointer', color: '#fff', backgroundColor: '#333', padding: '5px' }}
                        onClick={removeImage}
                      >
                        Remove
                      </span>
                      <img src={selectedImage} alt="Selected" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </>
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', backgroundColor: '#f0f0f0' }}>
                      <span>No Image Selected</span>
                    </div>
                  )}
                </div>
              </div>


              <div className="mb-3">
                <button  type="submit" className="btn btn-success">
                  Submit
                </button>
                <Link to="" style={{ marginLeft: '10px' }} className="btn btn-danger" onClick={handleCancel}>
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
