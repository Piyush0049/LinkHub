import React from 'react';
import Close from '@mui/icons-material/Close';
import { Avatar } from '@mui/material';
import { FavoriteBorder, DeleteForever } from '@mui/icons-material';
import { FaRegComment } from 'react-icons/fa';
import { useContext } from 'react';
import { DataContext } from '@/context/context';
import axios from 'axios';

function Postdetails({ post, ismypost }) {
    const { setData } = useContext(DataContext);

    const deletepost = async (id) => {
        if (window.confirm("Are you sure you want to delete the post?")) {
            const res = await axios.post("/api/updatepost/deletepost", { id: id });
            setData("");
        }
    }

return (
    <div style={styles.modalOverlay}>
        <div style={styles.modalContent}>
            <div style={styles.closeIconContainer}>
                <Close onClick={() => setData("")} style={styles.closeIcon} />
            </div>
            <div style={{ display: "flex", alignItems: "center", paddingBottom: "20px", justifyContent: "center" }}>
                <h2>Post</h2>
                {ismypost && <DeleteForever style={{ color: "red", marginLeft: "20px" }} onClick={() => deletepost(post._id)} />}
            </div>
            <div className='post' key={post._id} style={{ backgroundColor: '#282828', marginBottom: '40px', borderRadius: '10px' }}>
                <div style={{ padding: '20px 0', width: '95%', margin: '0 auto', display: 'flex', flexDirection: 'initial' }}>
                    <p style={{ fontSize: '13px', color: 'white', textAlign: 'left' }}>{post.content}</p>
                </div>
                <img src={post.mediaUrl} alt='' style={{ width: '95%', borderRadius: '10px' }} />
                <div style={{ display: 'flex', justifyContent: "space-between", gap: '18px', width: '91%', margin: '0 auto', paddingTop: '20px' }}>
                    <div style={{ display: "flex", gap: "15px" }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <FavoriteBorder />
                            <p>{post.alllikes.length}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <FaRegComment style={{ fontSize: "20px" }} />
                            <p>{post.comments?.length}</p>
                        </div>
                    </div>
                    <div>
                        <p style={{ color: "gray", fontSize: "13px" }}>{post.createdAt.slice(0, 10)}</p>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', width: '90%', margin: '0 auto', padding: '20px 0' }}>
                    {post.comments?.length ? (
                        <>
                            <h5 style={{
                                fontSize: '24px', color: '#F2F2F2', textAlign: 'center', marginBottom: '20px'
                            }}>
                                <b>Comments</b>
                            </h5>
                            <div className="commentsContainer" style={{ padding: "5px 10px", borderRadius: "10px" }}>
                                {post.comments?.map((comm) => (
                                    <div className="comment" key={comm._id} style={{ display: 'flex', flexDirection: 'initial', width: '95%', margin: '0px auto 25px auto', padding: '20px 10px', backgroundColor: "#353535", borderRadius: "5px" }}>
                                        <Avatar src={comm.user.profileImage} />
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                <h4 style={{ display: 'flex', flexDirection: 'initial', marginLeft: "8px", color: "#F1F1F1", fontSize: "13px" }}>{comm.user.name}</h4><p style={{ color: "#CBCBCB", fontSize: "9px" }}>{comm.user.createdAt.slice(0, 10)}</p>
                                            </div>
                                            <p style={{ display: 'flex', flexDirection: 'initial', marginLeft: "8px", color: "#EBEBEB", fontSize: "13px", textAlign: 'left' }}>{comm.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <h5 style={{ fontSize: '20px', color: '#F2F2F2', textAlign: 'center', marginBottom: '20px' }}>
                            <b>No comments on this post.</b>
                        </h5>
                    )}
                </div>
            </div>
        </div>
    </div>
);
}

const styles = {
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
        maxWidth: '600px',
        position: 'relative',
        backgroundColor: "#202020",
        padding: "30px 20px 0px 20px",
        height: '100vh',
        overflowY: 'auto',
    },
    closeIconContainer: {
        position: 'absolute',
        top: '10px',
        right: '10px',
    },
    closeIcon: {
        cursor: 'pointer',
    },
    textarea: {
        width: '100%',
        height: '100px',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        resize: 'none',
        marginBottom: '15px',
        fontFamily: 'Poppins, sans-serif',
    },
    imagePreview: {
        width: '100%',
        maxHeight: '200px',
        objectFit: 'cover',
        borderRadius: '5px',
    },
    publishButton: {
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default Postdetails;
