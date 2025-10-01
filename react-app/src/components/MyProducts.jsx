import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import './MyProducts.css'; // Updated CSS file for styling
import API_URL from "../constants";

function MyProducts() {
    const navigate = useNavigate();
    const [products, setproducts] = useState([]);
    const [cproducts, setcproducts] = useState([]);
    const [search, setsearch] = useState('');

    useEffect(() => {
        const url = API_URL + '/my-products';
        let data = { userId: localStorage.getItem('userId') };
        axios.post(url, data)
            .then((res) => {
                if (res.data.products) {
                    setproducts(res.data.products);
                    setcproducts(res.data.products);
                }
            })
            .catch((err) => {
                alert('Server Err.');
            });
    }, []);

    const handlesearch = (value) => {
        setsearch(value);
    }

    const handleClick = () => {
        let filteredProducts = products.filter((item) => {
            return item.pname.toLowerCase().includes(search.toLowerCase()) ||
                item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
                item.category.toLowerCase().includes(search.toLowerCase());
        });
        setcproducts(filteredProducts);
    }

    const handleCategory = (value) => {
        let filteredProducts = products.filter((item) => {
            return item.category === value;
        });
        setcproducts(filteredProducts);
    }

    const handleLike = (productId) => {
        let userId = localStorage.getItem('userId');
        const url = API_URL + '/like-product';
        const data = { userId, productId };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert('Liked.');
                }
            })
            .catch((err) => {
                alert('Server Err.');
            });
    }

    const handleDelete = (productId) => {
        axios.delete(`${API_URL}/delete-product/${productId}`)
            .then((res) => {
                alert('Product deleted');
                const updatedProducts = products.filter(item => item._id !== productId);
                setproducts(updatedProducts);
                setcproducts(updatedProducts);
            })
            .catch((err) => {
                alert('Error deleting product');
            });
    };
    
    return (
        <div>
            <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
            <Categories handleCategory={handleCategory} />

            <div className="d-flex justify-content-center flex-wrap">
                {cproducts && cproducts.length > 0 &&
                    cproducts.map((item) => {
                        return (
                            <div key={item._id} className="product-card m-3">
                                <div onClick={() => handleLike(item._id)} className="icon-con">
                                    <FaHeart className="icons" />
                                </div>
                                <img className="product-image" src={API_URL + '/' + item.pimage} alt={item.pname} />
                                <p className="m-2"> {item.pname}  | {item.category} </p>
                                <h3 className="m-2 text-danger"> {item.price} </h3>
                                <p className="m-2 text-success"> {item.pdesc} </p>

                                <button className="btn btn-danger delete-btn" onClick={() => handleDelete(item._id)}>
                                    Delete
                                </button>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default MyProducts;
