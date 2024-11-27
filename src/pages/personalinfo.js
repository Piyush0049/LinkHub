"use client"
import React, { useState, useEffect } from 'react';
import {
    Box, Grid, Typography, Paper, Container, Switch as MuiSwitch,
    TextField, Button, Avatar
} from '@mui/material';
import { parseCookies } from 'nookies';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Image from 'next/image';
import image from "../../public/invertedlogo1.jpg";
import { useRouter } from "next/router";
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

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    textAlign: 'left',
    color: theme.palette.text.primary,
    background: theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, #424242 0%, #616161 100%)'
        : 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 0 30px rgba(0,0,0,0.2)',
    },
}));


export async function getServerSideProps(context) {
    try {
        const cookies = parseCookies(context);

        const res = await axios.post('http://localhost:3000/api/userroute', { token: cookies.token });
        return {
            props: {
                data: res.data.data,
            },
        }
    } catch (error) {
        console.error(error);
        return {
            props: {
                data: null,
            },
        };
    }
}


const Settings = ({data}) => {
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

    const [darkMode, setDarkMode] = useState(false);

    const save = async() => {
        const res = await axios.put("/api/addbio", { bio : bio })
        console.log(res);
        router.push("/addimage");
        localStorage.removeItem("image");
    };

    const theme = getTheme(darkMode);

    const [bio, setbio] = useState(data.bio);

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
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Item>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Avatar src={data.profileImage} sx={{ width: 64, height: 64, mr: 2 }} />
                                    <Box>
                                        <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: windowWidth > 582 ? null : "20px", }}>{data.name}</Typography>
                                        <Typography variant="subtitle1" style={{ fontSize: windowWidth > 582 ? null : "14px", }}>{data.username}</Typography>
                                    </Box>
                                </Box>
                                <Typography variant="h6" sx={{ mb: 2 }}>Personal Information</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField label="Name" fullWidth margin="normal" defaultValue={data.name} disabled="true" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField label="Username" fullWidth margin="normal" defaultValue={data.username} disabled="true" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField label="Email" fullWidth margin="normal" defaultValue={data.email} disabled="true" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField label="Bio" fullWidth margin="normal" defaultValue={data.bio} multiline rows={2} onChange={(e) => { setbio(e.target.value) }} />
                                    </Grid>
                                </Grid>
                                <div style={{ display: "flex", justifyContent: "center", width: "100%", paddingTop: "30px" }}>
                                    <Button variant="contained" color="primary" sx={{ ml: 'auto', br: "10px" }} onClick={save}>Save & continue</Button>
                                </div>
                            </Item>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
};


export default Settings;
