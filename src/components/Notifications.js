import React, { useContext, useState } from 'react';
import { Close, Notifications, ClearAll } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { DataContext } from '@/context/context';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const NotificationBar = ({ notificationsbyusers }) => {
    console.log(notificationsbyusers)
    const [notification, setnotification] = useState(notificationsbyusers)
    console.log()
    const router = useRouter()
    const { setData } = useContext(DataContext);

    const route = (id) => {
        router.push(`/user/${id}`);
        setData("")
    }

    const removenotif = async () => {
        setnotification([]);
        const res = await axios.put("/api/removenotif");
    }

    return (
        <div style={styles.searchBarContainer}>
            <div style={{ display: "flex", justifyContent: "flex-end", width: "100%", marginTop: "5px", padding: "10px" }}>
                <Close onClick={() => setData("")} style={{ backgroundColor: "#272727" }} />
            </div>
            <div style={{ padding: '0px 20px 30px 20px', alignItems: "center", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h2 style={{ display: "flex", alignItems: "center", marginTop: "40px" }}>
                        <Notifications /> Notifications {notification.length > 0 && (<ClearAll onClick={() => removenotif()} style={{ marginLeft: "10px", borderRadius : "30px", backgroundColor: "#171717", padding : "3px", fontSize : "35px" }} />)}
                    </h2>
                </div>
                <div className='searchedusers' style={{ width: "100%", paddingTop: "10px", marginTop: "20px", display : "flex", flexDirection : "column", alignItems : "center" }}>
                    {notification?.length > 0 && notification?.map((n) => (
                        n.status === "liked" && (
                            <div onClick={()=>route(n.notifyuser._id)} className="comment" style={{ display: 'flex', flexDirection: 'initial', width: 'auto', margin: '0px auto 25px auto', padding: '10px 5px', backgroundColor: "#0F0F0F", borderRadius: "5px", alignItems: "center", justifyContent: "space-between", width : "100%" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <Avatar src={n.notifyuser.profileImage} style={{ width: "30px", height: "30px" }} />
                                    <div>
                                        <p style={{ display: 'flex', flexDirection: 'initial', marginLeft: "8px", color: "#F1F1F1", fontSize: "13px" }}><b style={{ marginRight: "4px" }}>{n.notifyuser.username}</b></p>
                                        <p style={{ display: 'flex', flexDirection: 'initial', marginLeft: "8px", color: "gray", fontSize: "12px" }}>liked on your post.</p>
                                    </div>
                                </div>
                            </div>) ||
                        n.status === "booked" &&
                        (<div onClick={()=>route(n.notifyuser._id)} className="comment" style={{ display: 'flex', flexDirection: 'initial', width: 'auto', margin: '0px auto 25px auto', padding: '10px 5px', backgroundColor: "#0F0F0F", borderRadius: "5px", alignItems: "center", justifyContent: "space-between", width : "100%"  }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <Avatar src={n.notifyuser.profileImage} style={{ width: "30px", height: "30px" }} />
                                <div>
                                    <p style={{ display: 'flex', flexDirection: 'initial', marginLeft: "8px", color: "#F1F1F1", fontSize: "13px" }}><b style={{ marginRight: "4px" }}>{n.notifyuser.username}</b></p>
                                    <p style={{ display: 'flex', flexDirection: 'initial', marginLeft: "8px", color: "gray", fontSize: "12px" }}>bookmarked your post.</p>
                                </div>
                            </div>
                        </div>) ||
                        n.status === "commented" &&
                        (<div onClick={()=>route(n.notifyuser._id)} className="comment" style={{ display: 'flex', flexDirection: 'initial', width: 'auto', margin: '0px auto 25px auto', padding: '10px 5px', backgroundColor: "#0F0F0F", borderRadius: "5px", alignItems: "center", justifyContent: "space-between", width : "100%"  }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <Avatar src={n.notifyuser.profileImage} style={{ width: "30px", height: "30px" }} />
                                <div>
                                    <p style={{ display: 'flex', flexDirection: 'initial', marginLeft: "8px", color: "#F1F1F1", fontSize: "13px" }}><b style={{ marginRight: "4px" }}>{n.notifyuser.username}</b></p>
                                    <p style={{ display: 'flex', flexDirection: 'initial', marginLeft: "8px", color: "gray", fontSize: "12px" }}>commented on your post.</p>
                                </div>
                            </div>
                        </div>) ||
                        n.status === "followed" && (
                            <div onClick={()=>route(n.notifyuser._id)} className="comment" style={{ display: 'flex', flexDirection: 'initial', width: 'auto', margin: '0px auto 25px auto', padding: '10px 5px', backgroundColor: "#0F0F0F", borderRadius: "5px", alignItems: "center", justifyContent: "space-between", width : "100%" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <Avatar src={n.notifyuser.profileImage} style={{ width: "30px", height: "30px" }} />
                                    <div>
                                        <p style={{ display: 'flex', flexDirection: 'initial', marginLeft: "8px", color: "#F1F1F1", fontSize: "13px" }}><b style={{ marginRight: "4px" }}>{n.notifyuser.username}</b></p>
                                        <p style={{ display: 'flex', flexDirection: 'initial', marginLeft: "8px", color: "gray", fontSize: "12px" }}>followed you.</p>
                                    </div>
                                </div>
                            </div>)
                    ))}
                    {notification.length === 0 && (
                        <p style={{marginTop : "30px", color : "gray", width : "100%", display : "flex", justifyContent : "center"}}>No Notifications</p>
                    )
                    }
                </div>
            </div>
        </div>
    );
};

const styles = {
    searchBarContainer: {
        minWidth : "300px",
        width : "auto",
        position: 'fixed',
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
        backgroundColor: '#000',
        borderBottom: '1px solid #161616',
        gap: "20px",
        paddingTop: "30px",
        height : "100vh"
    },
    form: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#191919',
        borderRadius: '20px',
        padding: '5px 10px',
        width: '100%',
        gap: "14px"
    },
    searchIcon: {
        color: '#fff',
    },
    input: {
        flex: 1,
        color: '#fff',
        outline: 'none',
    },
};

export default NotificationBar;