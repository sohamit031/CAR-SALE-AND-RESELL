import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import API_URL from "../constants";
import './Login.css'; // Import your custom CSS file

function Login() {
    const navigate = useNavigate();
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const handleApi = () => {
        const url = API_URL + '/login';
        const data = { username, password };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('userId', res.data.userId);
                        navigate('/');
                    }
                }
            })
            .catch((err) => {
                alert('SERVER ERR');
            });
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <h1>Welcome Back</h1>
                <p>Login to your account</p>
                <input 
                    className="form-control" 
                    type="text" 
                    value={username} 
                    onChange={(e) => setusername(e.target.value)} 
                    placeholder="Username"
                />
                <input 
                    className="form-control" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setpassword(e.target.value)} 
                    placeholder="Password"
                />
                <button 
                    className="btn btn-primary login-btn" 
                    onClick={handleApi}
                >
                    Login
                </button>
                <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </div>
        </div>
    );
}

export default Login;
