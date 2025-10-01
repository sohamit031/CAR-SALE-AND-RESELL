import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./RecommendedProd.css";

const RecommendedProd = () => {
  const { _id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/product/${_id}`);
        setProduct(response.data);
      } catch (error) {
        setError("Failed to load product details.");
      }
    };
    fetchProduct();
  }, [_id]);

  if (error) return <p className="error-message">{error}</p>;
  if (!product) return <p className="loading-message">Loading product details...</p>;

  return (
    <div className="product-detail">
      <div className="product-card">
        <h2>{product.model}</h2>
        <p><strong>Brand:</strong> {product.brand}</p>
        <p><strong>Price:</strong> ₹{product.selling_price}</p>
        <p><strong>Fuel Type:</strong> {product.fuel_type}</p>
        <p><strong>Transmission:</strong> {product.transmission_type}</p>
        <p><strong>Engine:</strong> {product.engine} cc</p>
        <p><strong>Mileage:</strong> {product.mileage} kmpl</p>
        <p><strong>Seats:</strong> {product.seats}</p>
      </div>
    </div>
  );
};

export default RecommendedProd;
