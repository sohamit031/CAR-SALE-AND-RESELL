import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import './CategoryPage.css'; // Updated CSS file
import API_URL from "../constants";

function CategoryPage() {
    const navigate = useNavigate();
    const param = useParams();
    const [products, setProducts] = useState([]);
    const [cproducts, setCProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);

    useEffect(() => {
        const url = `${API_URL}/get-products?catName=${param.catName}`;
        axios.get(url)
            .then((res) => {
                if (res.data.products) {
                    setProducts(res.data.products);
                }
            })
            .catch(() => {
                alert('Server Error.');
            });
    }, [param]);

    const handleSearch = (value) => {
        setSearch(value);
    };

    const handleClick = () => {
        const url = `${API_URL}/search?search=${search}&loc=${localStorage.getItem('userLoc')}`;
        axios.get(url)
            .then((res) => {
                setCProducts(res.data.products);
                setIsSearch(true);
            })
            .catch(() => {
                alert('Server Error.');
            });
    };

    const handleLike = (productId) => {
        let userId = localStorage.getItem('userId');
        const url = `${API_URL}/like-product`;
        const data = { userId, productId };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert('Liked.');
                }
            })
            .catch(() => {
                alert('Server Error.');
            });
    };

    const handleProduct = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <div className="category-page">
            <Header search={search} handlesearch={handleSearch} handleClick={handleClick} />
            <Categories />
            {isSearch && cproducts && (
                <h5 className="search-results">
                    SEARCH RESULTS
                    <button className="clear-btn" onClick={() => setIsSearch(false)}>CLEAR</button>
                </h5>
            )}
            {isSearch && cproducts.length === 0 && <h5>No Results Found</h5>}
            <div className="product-grid">
                {(isSearch ? cproducts : products).map((item) => (
                    <div key={item._id} className="card m-3" onClick={() => handleProduct(item._id)}>
                        <div onClick={(e) => { e.stopPropagation(); handleLike(item._id); }} className="icon-con">
                            <FaHeart className="icons" />
                        </div>
                        <img width="300px" height="200px" src={`${API_URL}/${item.pimage}`} alt={item.pname} />
                        <p className="m-2">{item.pname} | {item.category}</p>
                        <h3 className="m-2 text-danger">Rs. {item.price}</h3>
                        <p className="m-2 text-success">{item.pdesc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryPage;
