import React, { useContext, useState } from 'react';
import { Home, Search, NotificationsNone, AddBox, AccountCircle, Menu, Settings, Logout, SwitchAccount } from '@mui/icons-material';
import image from '../../public/invertedlogo1.jpg';
import Image from 'next/image';
import { DataContext } from '../context/context';
import { useRouter } from 'next/navigation';
import { Avatar } from '@mui/material';
import axios from 'axios';

const Sidebar = ({ img }) => {
    const router = useRouter();
    const { setData } = useContext(DataContext);
    const [showmore, setshowmore] = useState(false);

    const handleNavLinkHover = (event) => {
        event.target.style.color = '#00f6d2';
        event.target.style.transform = 'scale(1.02)';
    };

    const handleNavLinkHoverOut = (event) => {
        event.target.style.color = '#fff';
        event.target.style.transform = 'scale(1)';
    };

    const handleNavLinkHover2 = (event) => {
        event.target.style.transform = 'scale(1.09)';
    };

    const handleNavLinkHoverOut2 = (event) => {
        event.target.style.transform = 'scale(1)';
    };

    const profile = () => {
        setData("Profile");
        router.push("/myprofile");
    };

    const home = () => {
        setData("Home");
        router.push("/homepage");
    };

    const logout = async () => {
        if (window.confirm("Are you sure you want to logout?")) {
            await axios.delete("/api/logout");
            router.push("/login");
        }
    };

    const deleteaccount = async () => {
        if (window.confirm("Do you really want to PERMANENTLY delete your account?")) {
            await axios.delete("/api/deleteaccount");
            router.push("/login");
        }
    };

    return (
        <div className="sidebar-container" style={styles.sidebarContainer}>
            <Image
                src={image}
                alt="Logo"
                width={200}
                height={130}
                priority
            />
            <div className="nav" style={styles.nav}>
                <div
                    className="nav-link"
                    onClick={home}
                    style={styles.navLink}
                    onMouseEnter={handleNavLinkHover}
                    onMouseLeave={handleNavLinkHoverOut}
                >
                    <Home /> Home
                </div>
                <div
                    className="nav-link"
                    onClick={() => setData("Search")}
                    style={styles.navLink}
                    onMouseEnter={handleNavLinkHover}
                    onMouseLeave={handleNavLinkHoverOut}
                >
                    <Search /> Search
                </div>
                <div
                    className="nav-link"
                    onClick={() => setData("Notifications")}
                    style={styles.navLink}
                    onMouseEnter={handleNavLinkHover}
                    onMouseLeave={handleNavLinkHoverOut}
                >
                    <NotificationsNone /> Notifications
                </div>
                <div
                    className="nav-link"
                    onClick={() => setData("Create")}
                    style={styles.navLink}
                    onMouseEnter={handleNavLinkHover}
                    onMouseLeave={handleNavLinkHoverOut}
                >
                    <AddBox /> Create
                </div>
                <div
                    className="nav-link"
                    onClick={profile}
                    style={styles.navLink}
                    onMouseEnter={handleNavLinkHover}
                    onMouseLeave={handleNavLinkHoverOut}
                >
                    <Avatar src={img} sx={{ width: 25, height: 25, mr: 1 }} />My Profile
                </div>
                <div
                    className="nav-link"
                    onClick={() => setshowmore(!showmore)}
                    style={styles.navLink}
                    onMouseEnter={handleNavLinkHover}
                    onMouseLeave={handleNavLinkHoverOut}
                >
                    <Menu /> More
                </div>
                {showmore && (
                    <div className="more-menu" style={styles.moreMenu}>
                        <div 
                            className="nav-link" 
                            style={styles.navLink2} 
                            onMouseEnter={handleNavLinkHover} 
                            onMouseLeave={handleNavLinkHoverOut} 
                            onClick={() => router.push("/personalinfo")}
                        >
                            <Settings /> Settings
                        </div>
                        <div 
                            className="nav-link" 
                            style={styles.navLink2} 
                            onMouseEnter={handleNavLinkHover} 
                            onMouseLeave={handleNavLinkHoverOut} 
                            onClick={logout}
                        >
                            <Logout /> Log out
                        </div>
                        <div 
                            className="nav-link" 
                            style={{ ...styles.navLink2, color: 'red', fontSize: '14px' }} 
                            onClick={deleteaccount} 
                            onMouseEnter={handleNavLinkHover2} 
                            onMouseLeave={handleNavLinkHoverOut2}
                        >
                            <AccountCircle /> Delete account
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    sidebarContainer: {
        width: '280px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        position: 'fixed',
        borderRight: '1px solid #161616',
        backgroundColor: '#000',
    },
    logo: {
        borderRadius: '20px',
        boxShadow: '0 5px 15px rgba(255, 255, 255, 0.1)',
    },
    nav: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        paddingTop: '50px',
    },
    navLink: {
        color: '#fff',
        textDecoration: 'none',
        padding: '14px 0',
        fontSize: '15px',
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.3s ease-in-out',
        cursor: 'pointer'
    },
    navLink2: {
        color: '#fff',
        textDecoration: 'none',
        padding: '20px 10px 10px 25px',
        fontSize: '12px',
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.3s ease-in-out',
        cursor: 'pointer',
    },
    moreMenu: {
        color: 'white',
        background: '#191919',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        marginTop: '20px',
        width: '100%',
    },
};

export default Sidebar;
