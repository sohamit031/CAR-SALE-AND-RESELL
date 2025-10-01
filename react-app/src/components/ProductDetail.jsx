import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import API_URL from "../constants";
import './ProductDetail.css'; // New CSS file for styling

function ProductDetail() {
    const [product, setproduct] = useState();
    const [user, setuser] = useState();
    const p = useParams();

    useEffect(() => {
        const url = API_URL + '/get-product/' + p.productId;
        axios.get(url)
            .then((res) => {
                if (res.data.product) {
                    setproduct(res.data.product);
                }
            })
            .catch((err) => {
                alert('Server Err.');
            });
    }, [p.productId]);

    const handleContact = (addedBy) => {
        const url = API_URL + '/get-user/' + addedBy;
        axios.get(url)
            .then((res) => {
                if (res.data.user) {
                    setuser(res.data.user);
                }
            })
            .catch((err) => {
                alert('Server Err.');
            });
    };

    return (
        <>
            <Header />
            <div className="product-detail-container">
                <h2 className="product-title">Product Details</h2>
                {product && (
                    <div className="product-detail-content">
                        <div className="product-images">
                            <img className="main-image" src={API_URL + '/' + product.pimage} alt={product.pname} />
                            {product.pimage2 && <img className="secondary-image" src={API_URL + '/' + product.pimage2} alt={`${product.pname} additional`} />}
                        </div>
                        <div className="product-info">
                            <h3 className="price-text">Rs. {product.price} /-</h3>
                            <p className="product-name">{product.pname} | {product.category}</p>
                            <p className="product-description">{product.pdesc}</p>

                            {product.addedBy && (
                                <button className="btn contact-btn" onClick={() => handleContact(product.addedBy)}>
                                    Show Contact Details
                                </button>
                            )}
                            {user && user.username && <h4 className="user-info">{user.username}</h4>}
                            {user && user.mobile && <h3 className="user-info">{user.mobile}</h3>}
                            {user && user.email && <h6 className="user-info">{user.email}</h6>}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ProductDetail;
