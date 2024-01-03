import React, { useState } from "react";
import Header from "../Header"; // Make sure to import Header component
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";
import { useParams } from 'react-router-dom';

export default function UserEdit() {
  
  return (
    <>
      <Header />
      <div className="container" style={{ marginTop: '100px' }}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form >
              <div className="mb-3">
                <label htmlFor="firstname" className="form-label">
                  FirstName
                </label>
                <input
                  type="text"
                  className= "form-control"
                  id="firstName"
                  name="firstName"
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
