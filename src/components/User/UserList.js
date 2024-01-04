import React, { useEffect, useState } from "react";
import Header from "../Header";
import {  Button, Table } from "react-bootstrap";
import axiosInstance from "../../config/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

export default function UserList() {
  let navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [userPassword, setUserPassword] = useState("someInitialValue");

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get("users/get-user");
      setUserList(response.data.data);
    } catch (error) {

    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleEdit = async(userData) =>{
    navigate(`/edit-user`, { state: { userData } });
    console.log(userData);
  }

  // const handleUpdatePassword = (userId) => {
  //   navigate(`/update-password/${userId}`);
  //   onClick={() => handleUpdatePassword(userId)}
  // };

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h2 className="mb-4">User List</h2>
        <div className="d-flex justify-content-end mb-3">
        <Link to={"/add-user"} className="mr-2">
          <Button variant="primary">Add User</Button>
        </Link>
        <Link to="/update-password"  className="ml-2">
          <Button variant="info">Update Password</Button> 
        </Link>
      </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>PhoneNumber</th>
              <th>Rewards</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userList.length
              ? userList?.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.rewards}</td>
                      <td>
                        {user.profileImage && (
                          <img
                            src={`http://localhost:6060/images/${user.profileImage}`} 
                            style={{ width: '50px', height: '50px', objectFit: 'cover'}}
                            className="profile-image"
                          />
                        )}
                      </td>
                      <td><span className="edit-icon" onClick={()=> handleEdit(user)} style={{ cursor: 'pointer' }}><FaEdit/></span></td>
                    </tr>
                  );
                })
              : "No reocrd found"}
          </tbody>
        </Table>
      </div>
    </>
  );
}
