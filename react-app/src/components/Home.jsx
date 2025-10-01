import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import './Home.css';
import API_URL from "../constants";

function Home() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [cProducts, setCProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);

    useEffect(() => {
        const url = API_URL + '/get-products';
        axios.get(url)
            .then((res) => {
                if (res.data.products) {
                    setProducts(res.data.products);
                }
            })
            .catch((err) => {
                alert('Server Error.');
            });
    }, []);

    const handleSearch = (value) => {
        setSearch(value);
    };

    const handleClick = () => {
        const url = API_URL + '/search?search=' + search + '&loc=' + localStorage.getItem('userLoc');
        axios.get(url)
            .then((res) => {
                setCProducts(res.data.products);
                setIsSearch(true);
            })
            .catch((err) => {
                alert('Server Error.');
            });
    };

    const handleCategory = (value) => {
        let filteredProducts = products.filter((item) => item.category === value);
        setCProducts(filteredProducts);
    };

    const handleLike = (productId, e) => {
        e.stopPropagation();
        let userId = localStorage.getItem('userId');
        if (!userId) {
            alert('Please Login first.');
            return;
        }

        const url = API_URL + '/like-product';
        const data = { userId, productId };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert('Liked.');
                }
            })
            .catch((err) => {
                alert('Server Error.');
            });
    };

    const handleProduct = (id) => {
        navigate('/product/' + id);
    };

    return (
        <div className="home-container">
            <Header search={search} handlesearch={handleSearch} handleClick={handleClick} />
            <Categories handleCategory={handleCategory} />

            {isSearch && cProducts.length > 0 && (
                <h5 className="search-results">
                    SEARCH RESULTS
                    <button className="clear-btn" onClick={() => setIsSearch(false)}>CLEAR</button>
                </h5>
            )}
            {isSearch && cProducts.length === 0 && <h5>No Results Found</h5>}

            <div className="product-grid">
                {(isSearch ? cProducts : products).map((item) => (
                    <div key={item._id} className="card" onClick={() => handleProduct(item._id)}>
                        <div onClick={(e) => handleLike(item._id, e)} className="icon-con">
                            <FaHeart className="icons" />
                        </div>
                        <img src={API_URL + '/' + item.pimage} alt={item.pname} className="product-image" />
                        <h3 className="product-price">Rs. {item.price} /-</h3>
                        <p className="product-name">{item.pname} | {item.category}</p>
                        <p className="product-description">{item.pdesc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
