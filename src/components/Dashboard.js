import React, { useEffect, useState } from 'react';
import Header from './Header';
import { Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from '../config/axiosInstance';

export default function Dashboard() {
  const [productCount, setProductCount] = useState([]);
    
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axiosInstance.get('product/get-count')
          setProductCount(response.data.data,)
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };
    fetchProductCount();
  }, []);
  return (
    <>
      <Header />
     
    <div className="container mt-4" >
      <h2 className="mb-4"  style={{ marginTop: '70px' }}>Dashboard</h2>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Products</Card.Title>
              <Card.Text>
                <p>Product Count: { productCount.productCount}</p>
                {/* You can add more details or components related to products */}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Users</Card.Title>
              <Card.Text>
                <p>User Count: { productCount.userCount}</p>
                {/* You can add more details or components related to users */}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>


    </>
  );
};


