import React, { useEffect, useState } from "react";
import Header from "../Header";
import { Table,Modal, Button  } from "react-bootstrap";
import axiosInstance from "../../config/axiosInstance";
import { FaEdit, FaThumbsDown, FaThumbsUp, FaTrash } from "react-icons/fa"; // Import FontAwesome icons
import { toast } from "react-toastify";
import * as XLSX from "xlsx";


export default function ProductList() {
  const [productList, setProductList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  const fetchProduct = async()=>{
    try {
        let response;
        if(searchTerm){
          response = await axiosInstance.post("product/search",{
            searchParams:searchTerm
          })
        }else{
          response = await axiosInstance.get("product/get-product")
        }
        setProductList(response.data.data)
        
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setProductList([]);
        setErrorMessage(error.response.data.message);
      }
    }
  }
  useEffect(()=>{
    fetchProduct();
  }, [searchTerm])

  const handleEdit = (productId)=>{
    console.log(`Edit Product ${productId}`);
  }

  const handleDelete = async (id) =>{
    try {
        const response = await axiosInstance.delete(`product/delete/${id}`)
        if(response.status === 200){
            toast.success(response.data.message)
            fetchProduct()
        }
    } catch (error) {
        toast.error(error.response.data.message)
    }    
  }

  const handleLikeDislike = async(productId, isLike)=>{
    try {
      const response = await axiosInstance.post('product/favorite', {
        productId: productId,
        isLike: isLike
      });
      if(response.status === 200){
        setProductList((prevProductList) => {
          return prevProductList.map((product) =>
            product._id === productId
              ? {
                  ...product,
                  userAction: isLike ? "like" : "dislike",
                }
              : product
          );
        });
        if(response.data.data.isLike === true ){
          toast.success(response.data.message)
        }else if(response.data.data.isLike === false){
          toast.error(response.data.message)
        }
      }else{
        console.error("Failed to update like/dislike");
      }
    } catch (error) {
      
    }
  }
  const exportToExcel = () =>{
    const productWithoutImageGallery = productList.map(({_id,isDelete,imageGallery,...rest})=> rest)
    const ws = XLSX.utils.json_to_sheet(productWithoutImageGallery)
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws, "Products");
    XLSX.writeFile(wb,"products.xlsx")
  }

  const showDeleteConfirmation = (productId) => {
    setDeleteProductId(productId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (deleteProductId) {
      handleDelete(deleteProductId);
      setShowDeleteModal(false);
      setDeleteProductId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteProductId(null);
  };

 
  return (
    <>
      <Header />
      <div className="container mt-4">
        <h2 className="mb-4">User List</h2>
        <div className="col-md-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        </div><br/>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>ProductName</th>
              <th>Description</th>
              <th>Date</th>
              <th>Reviews</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Like DisLike</th>
            </tr>
          </thead>
          <tbody>
            {
                productList.length ? productList?.map((product,index)=>{
                    return (
                        <tr key={index} >
                            <td>{index + 1}</td>
                            <td>{product.productName}</td>
                            <td>{product.description}</td>
                            <td>{product.date}</td>
                            <td>{product.reviews}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                            <td>{product.status}</td>
                            <td><span className="edit-icon" onClick={()=> handleEdit(product._id)} style={{ cursor: 'pointer' }}><FaEdit/></span>
                            <span className="space-between-icons" style={{ marginLeft: '10px' }}></span>
                            <span className="delete-icon" onClick={()=> showDeleteConfirmation(product._id)} style={{ cursor: 'pointer' }}><FaTrash/></span></td>
                            <td>
                              <span
                                className="like-dislike-icon"
                                onClick={() => handleLikeDislike(product._id, true)}
                                style={{
                                  cursor: "pointer",
                                  color: product.userAction === "like" ? "green" : "black",
                                }}
                              >
                                <FaThumbsUp />
                              </span>
                                <span className="space-between-icons" style={{ marginLeft: "10px" }}></span>
                              <span
                                className="like-dislike-icon"
                                onClick={() => handleLikeDislike(product._id, false)}
                                style={{
                                  cursor: "pointer",
                                  color: product.userAction === "dislike" ? "red" : "black", 
                                }}
                              >
                                <FaThumbsDown />
                              </span>
                            </td>
                        </tr>
                    )
                })
                : "No record found"
            }
          </tbody>
        </Table>
        <button onClick={exportToExcel}>Export to Excel</button>
        <Modal show={showDeleteModal} onHide={handleCancelDelete} style={{  marginTop:'50px' }}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelDelete}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
