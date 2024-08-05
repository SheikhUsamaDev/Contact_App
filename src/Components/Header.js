import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../Components/Header.css'
function Header() {
    const [activeTab, setactiveTab] = useState("Home");
    const location = useLocation();

    const [search, setsearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === '/') {
            setactiveTab('Home')
        } else if (location.pathname === '/addedit') {
            setactiveTab("AddContact")
        } else if (location.pathname === '/about') {
            setactiveTab("About")
        }
    }, [location]);

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`/search?name=${search}`)
        setsearch("");
    }

    return (
        <div className='header'>
            <p className='logo'>CONTACT APP</p>
            <div className='header-right'>
               
                <Link to='/'>
                    <p className={`${activeTab === "Home" ? "active" : ""}`}
                        onClick={() => setactiveTab("Home")} >Home</p>
                </Link>
                <Link to='/addedit'>
                    <p className={`${activeTab === "AddContact" ? "active" : ""}`}
                        onClick={() => setactiveTab("AddContact")} >Add Contact</p>
                </Link>
                <Link to='/about'>
                    <p className={`${activeTab === "About" ? "active" : ""}`}
                        onClick={() => setactiveTab("About")} >About</p>
                </Link>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        className='inputField'
                        placeholder='Search Name ...'
                        onChange={(e) => setsearch(e.target.value)}
                        value={search}
                    />
                </form>
            </div>

        </div>
    )
}

export default Header
