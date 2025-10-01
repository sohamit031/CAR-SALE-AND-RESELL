import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import API_URL from "../constants";
import './MyProfile.css';  // Custom CSS file for profile styling

function MyProfile() {
    const [user, setuser] = useState({});

    useEffect(() => {
        const url = API_URL + '/my-profile/' + localStorage.getItem('userId');
        axios.get(url)
            .then((res) => {
                if (res.data.user) {
                    setuser(res.data.user);
                }
            })
            .catch((err) => {
                alert('Server Err.');
            });
    }, []);

    return (
        <div className="my-profile-container">
            <Header />
            <div className="profile-card">
                <h1 className="profile-heading">User Profile</h1>
                <div className="profile-details">
                    <p><strong>Username:</strong> {user.username || "N/A"}</p>
                    <p><strong>Email:</strong> {user.email || "N/A"}</p>
                    <p><strong>Mobile:</strong> {user.mobile || "N/A"}</p>
                </div>
            </div>
        </div>
    );
}

export default MyProfile;
