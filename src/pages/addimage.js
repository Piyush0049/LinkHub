"use client"
import React, { useState, useEffect } from 'react';
import {
    Box, Container, Button
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from 'next/image';
import image from "../../public/invertedlogo1.jpg";
import { useRouter } from "next/router";
import Upload from '@/components/upload';
import axios from 'axios';

const getTheme = () => createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#121212',
        },
        text: {
            primary: '#ffffff',
        },
    },
});


const Settings = () => {
    const router = useRouter();
    const [windowWidth, setWindowWidth] = useState("");

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth]);

    const [darkMode] = useState(false);

    const theme = getTheme(darkMode);


    return (
        <ThemeProvider theme={theme}>
            <div style={{ position: "fixed", width: "100%", backgroundColor: "black" }}>
                <Image
                    src={image}
                    alt="Logo"
                    width={125}
                    height={70}
                    priority
                    style={{ borderRadius: "20px" }}
                />
            </div>

            <Box sx={{ display: 'flex', backgroundColor: theme.palette.background.default, minHeight: '100vh', pt: 13 }}>
                <Container sx={{ pt: 4, pb: 8 }}>
                    <Upload />
                    <div style={{ display: "flex", justifyContent: "center", width: "100%", paddingTop: "30px" }}>
                        <Button variant="contained" color="primary" sx={{ ml: 'auto', br: "10px" }} onClick={() => { router.push("/homepage") }}>Continue To LinkHub</Button>
                    </div>
                </Container>
            </Box>
        </ThemeProvider>
    );
};


export default Settings;
