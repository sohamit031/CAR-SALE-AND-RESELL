import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { FaSearch } from "react-icons/fa";
import { useState } from 'react';

function Header(props) {
    const [loc, setLoc] = useState(null);
    const [showOver, setShowOver] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    let locations = [
        {
            "latitude": 28.6139,
            "longitude": 77.2090,
            "placeName": "New Delhi, Delhi"
        },
        {
            "latitude": 19.0760,
            "longitude": 72.8777,
            "placeName": "Mumbai, Maharashtra"
        },
    ];

    return (
        <div className='header-container'>
            <div className="header">
                <Link className='links' to="/">HOME</Link>
                <select 
                    value={loc} 
                    onChange={(e) => {
                        localStorage.setItem('userLoc', e.target.value);
                        setLoc(e.target.value);
                    }} 
                    className="location-select"
                >
                    {locations.map((item, index) => (
                        <option key={index} value={`${item.latitude},${item.longitude}`}>
                            {item.placeName}
                        </option>
                    ))}
                </select>
                <input 
                    className='search' 
                    type='text' 
                    value={props.search} 
                    onChange={(e) => props.handlesearch(e.target.value)} 
                    placeholder="Search products..."
                />
                <button className='search-btn' onClick={props.handleClick}>
                    <FaSearch />
                </button>
            </div>

            <div className='profile-container'>
                <div 
                    className='profile-icon' 
                    onClick={() => setShowOver(!showOver)}
                >
                    J
                </div>

                {showOver && (
                    <div className='profile-menu'>
                        {!!localStorage.getItem('token') && (
                            <>
                                <Link to="/add-product">
                                    <button className="menu-btn">ADD PRODUCT</button>
                                </Link>
                                <Link to="/liked-products">
                                    <button className="menu-btn">FAVOURITES</button>
                                </Link>
                                <Link to="/my-products">
                                    <button className="menu-btn">MY ADS</button>
                                </Link>
                            </>
                        )}
                        <div>
                            {!localStorage.getItem('token') ? (
                                <Link to="/login" className="menu-btn">LOGIN</Link>
                            ) : (
                                <button className='menu-btn' onClick={handleLogout}>LOGOUT</button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
