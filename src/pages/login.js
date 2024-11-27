"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import Image from "next/image";
import image from "../../public/logo.png"

export default function Signuppage() {
    
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [windowWidth, setWindowWidth] = useState("");

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const [showPassword, setShowPassword] = useState(false);

    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/loginroute', {
                email: user.email,
                password: user.password,
            });

            if (response.status === 201) {
                router.push("/homepage")
            } else {
                console.error('Signup error:', response.data);
                window.alert(response.data.message);
            }
        } catch (error) {
            console.error('Error during signup:', error);
            window.alert('An error occurred during signup.');
        }
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            background: "linear-gradient(315deg, #242424 0%, #4D4D4D 50%, #0A1A4F 100%)",
            animation: "backgroundFade 10s infinite"
        }}>
            <Image
                src={image}
                alt="Vercel Logo"
                width={190}
                height={130}
                priority
                style={{ borderRadius: "20px", boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)' }}
            />
            <h1 style={{
                padding: "20px",
                fontSize: windowWidth > 611 ? "26px" : 18,
                color: "white",
                textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)",
                animation: "fadeIn 3s",
                fontFamily: 'Poppins, sans-serif'
            }}><b>Welcome back to LinkHub!</b></h1>
            <form onSubmit={login} style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "25px",
                border: "2px solid white",
                padding: "30px",
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.87)",
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
                animation: "slideIn 1s ease-out",
                width: windowWidth > 465 ? "450px" : "350px",
            }}>
                <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    style={{ marginBottom: "15px" }}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    style={{ marginBottom: "15px" }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <button type="submit" style={{
                    backgroundColor: "#4CAF50",
                    color: "white",
                    fontSize: "20px",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                    animation: "pulse 2s infinite",
                    fontFamily: 'Poppins, sans-serif'
                }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#45a049"}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#4CAF50"}
                >Login</button>
            </form>
            <h3 style={{
                marginTop: "20px",
                color: "white",
                animation: "fadeIn 4s",
                fontSize: windowWidth > 611 ? "16px" : 15,
                fontFamily: 'Poppins, sans-serif'
            }}>
                Do not have an account?<Link href="/signup" style={{
                    color: "#FFFC69",
                    textDecoration: "underline",
                    marginLeft: "5px"
                }}>Sign up Now!</Link>
            </h3>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideIn {
                    from { transform: translateY(-20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
            `}</style>
        </div>
    );
}