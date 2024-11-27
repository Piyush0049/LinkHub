import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import {Close, HourglassEmpty} from '@mui/icons-material';
import { DataContext } from '../context/context';
import { useRouter } from 'next/navigation';
import { Avatar } from '@mui/material';

const Input = styled('input')({
    display: 'none',
});

function Following({ following }) {
    const { setData } = useContext(DataContext);
    const [followings, setfollowings] = useState(following);

    const unfollow = async (id) => {
        const res = await axios.put("/api/updatepost/unfollow", { identity: id });
        const newfollowings = followings.filter(foll => foll._id !== id);
        setfollowings(newfollowings);
    }

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <div style={styles.closeIconContainer}>
                    <Close onClick={() => setData("")} style={styles.closeIcon} />
                </div>
                <Box sx={{ fontFamily: 'Poppins, sans-serif', textAlign: 'center', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "80%", height: "auto" }}>
                    <Typography variant="h5" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', padding: "20px 0" }}>Following</Typography>
                    <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                        <div style={{ width: "100%", backgroundColor: "#1A1A1A", padding: "15px 10px", borderRadius: "10px" }}>
                            {followings?.map(user => (
                                <div key={user} style={styles.suggestion}>
                                    <Avatar src={user.profileImage} />
                                    <div style={styles.suggestionInfo}>
                                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "start" }}>
                                            <span style={styles.suggestionName}>{user.name}</span>
                                            <span style={styles.suggestionusername}>{user.username}</span>
                                        </div>
                                        <button style={styles.followButton} onClick={() => unfollow(user._id)}>Following</button>
                                    </div>
                                </div>
                            ))}
                            {followings.length === 0 && (
                                <Typography variant="h6" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', padding: "20px 0", color : "gray", display : "flex", alignItems : "center", justifyContent : "center" }}><HourglassEmpty/>Empty</Typography>
                            )}
                        </div>
                    </div>
                </Box>
            </div>
        </div>
    );
}

const styles = {
    suggestion: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        width: '100%',
        gap: "10px",
    },
    suggestionImage: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#555',
        marginRight: '10px'
    },
    suggestionInfo: {
        display: 'flex',
        flex: '1',
        justifyContent: "space-between",
        alignItems: "center"
    },
    suggestionName: {
        fontSize: '14px',
        flexDirection: 'initial',
        display: "flex"
    },
    suggestionusername: {
        fontSize: '12px',
        color: "gray",
        flexDirection: 'initial',
        display: "flex"
    },
    followButton: {
        padding: '5px 10px',
        backgroundColor: '#424242',
        border: 'none',
        fontFamily: 'Poppins, sans-serif',
        borderRadius: '8px',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '14px',
        maxWidth: "100px"
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        width: '90%',
        maxWidth: '500px',
        position: 'relative',
        backgroundColor: "#202020",
    },
    closeIconContainer: {
        position: 'absolute',
        top: '10px',
        right: '10px',
    },
    closeIcon: {
        cursor: 'pointer',
    },
};

export default Following;
