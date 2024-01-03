import React, { useState } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Header from '../Header';
import axiosInstance from '../../config/axiosInstance';
import { toast } from 'react-toastify';

export default function AddProduct() {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    date: null,
    reviews: '',
    price: '',
    stock: '',
  });

  const [errors, setErrors] = useState({});

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: date,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.productName.trim()) {
      newErrors.productName = 'Product Name is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    if (!formData.reviews.trim()) {
      newErrors.reviews = 'Reviews are required';
    }
    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price)) {
      newErrors.price = 'Price must be a valid number';
    }
    if (!formData.stock.trim()) {
      newErrors.stock = 'Stock is required';
    } else if (isNaN(formData.stock)) {
      newErrors.stock = 'Stock must be a valid number';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const formdata = new FormData();
      // formdata.append("",)
      const productData = {
        productName: formData.productName,
        description: formData.description,
        date: formData.date,
        reviews: formData.reviews,
        price: formData.price,
        stock: formData.stock
      }

      const response = await axiosInstance.post("product/add",productData)
      setFormData(response.data)
      if(response.status === 201 ){
        toast.success("Product Added Successfully")
        setTimeout(()=>{
          navigate("/dashboard")
        },2000)
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    // Handle error, show message to the user, etc.
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request:", error.message);
    }
 
    }
    if (validateForm()) {
      console.log('Form submitted:', formData);
    } else {
      console.log('Form has errors. Please correct them.');
    }
  };

  return (
    <>
      <Header />
      <div className="container" style={{ marginTop: '100px' }}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="productName" className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.productName ? 'is-invalid' : ''}`}
                  id="productName"
                  name="productName"
                  placeholder="Enter your Product Name"
                  value={formData.productName}
                  onChange={handleInputChange}
                />
                {errors.productName && (
                  <div className="invalid-feedback">{errors.productName}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  id="description"
                  name="description"
                  placeholder="Enter your Description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label" style={{ display: 'block' }}>
                  Date
                </label>
                <DatePicker
                  selected={formData.date}
                  onChange={handleDateChange}
                  className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                  id="date"
                  name="date"
                  style={{ width: '500px' }}
                />
                {errors.date && <div className="invalid-feedback">{errors.date}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="reviews" className="form-label">
                  Reviews
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.reviews ? 'is-invalid' : ''}`}
                  id="reviews"
                  name="reviews"
                  placeholder="Enter your Reviews"
                  value={formData.reviews}
                  onChange={handleInputChange}
                />
                {errors.reviews && (
                  <div className="invalid-feedback">{errors.reviews}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                  id="price"
                  name="price"
                  placeholder="Enter your Price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
                {errors.price && (
                  <div className="invalid-feedback">{errors.price}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="stock" className="form-label">
                  Stock
                </label>
                <input
                  type="number"
                  className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
                  id="stock"
                  name="stock"
                  placeholder="Enter your Stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                />
                {errors.stock && (
                  <div className="invalid-feedback">{errors.stock}</div>
                )}
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
                <Link to="/dashboard" style={{ marginLeft: '10px' }} className="btn btn-danger">
                  Cancel
                </Link>
                <Link to="/product-list" style={{ marginLeft: '10px' }} className="btn btn-primary">
                  ProductList
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
