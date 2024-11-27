import React, { useContext, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Createpost from '@/components/Createpost';
import { DataContext } from '../context/context';
import { parseCookies } from 'nookies';
import axios from 'axios';
import { Avatar } from '@mui/material';
import { Settings, Collections, Bookmarks } from '@mui/icons-material';
import Postdetails from '@/components/postdetails';
import SearchBar from '@/components/Searchbar';
import NotificationBar from '@/components/Notifications';
import Followers from '@/components/followers';
import Following from '@/components/following';
import { useRouter } from 'next/navigation';

export async function getServerSideProps(context) {
    try {
        const cookies = parseCookies(context);
        const res = await axios.post(`${process.env.HOST}/api/userroute`, { token: cookies.token });
        const res2 = await axios.post(`${process.env.HOST}/api/getallposts`, { token: cookies.token });
        const res3 = await axios.post(`${process.env.HOST}/api/getconnections`, { token: cookies.token });
        const { notificationsbyusers, bookedposts } = res2.data;
        const { data, allposts, allusers } = res.data;
        const { followers, following } = res3.data;
        return {
            props: {
                userdetails: data,
                allposts,
                allusers,
                notificationsbyusers,
                following,
                followers,
                bookedposts
            },
        };
    } catch (error) {
        console.error('Error fetching posts:', error);
        return {
            props: {
                userdetails: {},
            },
        };
    }
}

const MyProfile = ({ userdetails, allposts, allusers, notificationsbyusers, followers, following, bookedposts }) => {
    const router = useRouter();
    const { data, setData } = useContext(DataContext);

    const [postdet, setpostdet] = useState();
    const [ismypost, setismypost] = useState(false);

    const showpost = (post) => {
        setpostdet(post);
        setismypost(true)
        setData("showpost")
    }

    const showpost2 = (post) => {
        setpostdet(post);
        setismypost(false);
        setData("showpost")
    }

    const handleNavLinkHover = (event) => {
        event.target.style.transform = 'scale(1.05)';
        event.target.style.transition = 'transform 0.3s, color 0.3s';
        event.target.style.cursor = 'pointer';
        event.target.style.opacity = '0.7'
    };

    const handleNavLinkHoverOut = (event) => {
        event.target.style.transform = 'scale(1)';
        event.target.style.transition = 'transform 0.3s, color 0.3s';
        event.target.style.opacity = '1'
    };

    const [showallposts, setshowallposts] = useState(true)

    return (
        <div style={styles.container}>
            <div style={{ width: '300px', zIndex: '7' }}>
                {(data !== "Search" && data !== "Notifications") ? (
                    <div style={{ width: '300px', zIndex: '7' }}>
                        <Sidebar img={userdetails.profileImage} />
                    </div>
                ) : (data === "Notifications" ? (
                    <div style={{ width: '300px', zIndex: '7' }}>
                        <NotificationBar notificationsbyusers={notificationsbyusers} />
                    </div>
                ) : (
                    <div style={{ width: '300px', zIndex: '7' }}>
                        <SearchBar allusers={allusers} />
                    </div>
                )
                )}
            </div>

            <div style={styles.main}>
                <div style={{ display: "flex", gap: "13%", padding: "0 300px 0 0", marginBottom: "90px" }}>
                    <div>
                        <Avatar src={userdetails.profileImage} sx={{ width: 220, height: 220, border: "2px solid #686868" }} />
                    </div>
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "20%" }}>
                            <p style={{ fontSize: "24px" }}>{userdetails.username}</p>
                            <Settings onClick={() => { router.push("/personalinfo") }} />
                        </div>
                        <br />
                        <div style={{ display: "flex", gap: "20px" }}>
                            <p style={{ display: "flex", gap: "5px" }}><b>{userdetails.posts.length}</b> Posts</p>
                            <p onClick={() => setData("followers")} style={{ display: "flex", gap: "5px" }}><b>{userdetails.followers.length}</b> Followers</p>
                            <p onClick={() => setData("following")} style={{ display: "flex", gap: "5px" }}><b>{userdetails.following.length}</b> Following</p>
                        </div>
                        <br />
                        <p style={{ fontSize: "17px", marginBottom: "5px", color: "#C2C2C2" }}>{userdetails.name}</p>
                        <p style={{ fontSize: "13.5px", color: "#818080" }}>{userdetails.bio}</p>
                    </div>
                </div>
                <hr style={{ width: '80%', margin: '0 auto', backgroundColor: '#686868', height: '0.2px', border: 'none' }} />

                <div style={{display : "flex", gap : "30%", justifyContent : "center"}}>
                    <p onClick={()=>setshowallposts(true)} style={{ display: "flex", alignItems: "center", fontSize: "17px", gap: "10px", paddingTop: "30px", color : showallposts?"white" : "#404040" }}>POSTS <Collections /></p>
                    <p onClick={()=>setshowallposts(false)} style={{ display: "flex", alignItems: "center", fontSize: "17px", gap: "10px", paddingTop: "30px", color : !showallposts?"white" : "#404040" }}>BOOKMARKS <Bookmarks /></p>
                </div>

                {showallposts && (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div style={{
                            width: '80%',
                            margin: '0 auto',
                            display: 'grid',
                            gridTemplateColumns: allposts.length > 0 ? 'repeat(3, 1fr)' : null,
                            justifyContent: "center",
                            gap: '25px',
                            padding: "30px 20px 80px 20px"
                        }}>
                            {allposts.map((post) => (
                                <div key={post?.id} onClick={() => showpost(post)} onMouseEnter={handleNavLinkHover}
                                    onMouseLeave={handleNavLinkHoverOut} className='post' style={{
                                        backgroundColor: "#303030",
                                        aspectRatio: "1/1",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: '15px',
                                        transition: "transform 1s ease"
                                    }}>
                                    <img src={post?.mediaUrl} alt='' style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '15px',
                                        padding: "2px"
                                    }} />
                                </div>

                            ))}
                            {allposts.length === 0 && (
                                <p style={{ whiteSpace: "nowrap", color: "#5C5C5C", marginTop: "40px", fontSize: "20px" }}>You currently don't have any posts.</p>
                            )}
                        </div>
                    </div>
                )}


                {!showallposts && (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div style={{
                            width: '80%',
                            margin: '0 auto',
                            display: 'grid',
                            gridTemplateColumns: bookedposts.length > 0 ? 'repeat(3, 1fr)' : null,
                            justifyContent: "center",
                            gap: '25px',
                            padding: "30px 20px 80px 20px"
                        }}>
                            {bookedposts.map((post) => (
                                <div key={post.id} onClick={() => showpost2(post)} onMouseEnter={handleNavLinkHover}
                                    onMouseLeave={handleNavLinkHoverOut} className='post' style={{
                                        backgroundColor: "#303030",
                                        aspectRatio: "1/1",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: '15px',
                                        transition: "transform 1s ease"
                                    }}>
                                    <img src={post.mediaUrl} alt='' style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '15px',
                                        padding: "2px"
                                    }} />
                                </div>

                            ))}
                            {bookedposts?.length === 0 && (
                                <p style={{ whiteSpace: "nowrap", color: "#5C5C5C", marginTop: "40px", fontSize: "20px" }}>You currently don't have any bookmarks.</p>
                            )}
                        </div>
                    </div>
                )}

            </div>
            {data === "Create" && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <Createpost />
                    </div>
                </div>
            )}
            {postdet && data === "showpost" && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <Postdetails post={postdet} ismypost={ismypost} />
                    </div>
                </div>
            )}
            {data === "followers" && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <Followers followers={followers} />
                    </div>
                </div>
            )}
            {data === "following" && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <Following following={following} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyProfile;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        minHeight: '100vh',
        backgroundColor: '#000',
        color: '#fff',
        fontFamily: 'Poppins, sans-serif',
    },
    main: {
        flex: '1',
        display: 'flex',
        marginTop: "80px",
        flexDirection: "column",
        alignItems: "center"
    },
    suggestedPosts: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    createPostButton: {
        padding: '10px 20px',
        backgroundColor: '#0095f6',
        border: 'none',
        borderRadius: '8px',
        color: '#fff',
        cursor: 'pointer',
        margin: '20px 0',
        marginTop: "100px"
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '1000',
        height: '100vh',
        overflowY: 'auto',
    },
    modalContent: {
        backgroundColor: '#282828',
        padding: '20px',
        borderRadius: '10px',
        width: '400px',
        textAlign: 'center',
    },
    closeButton: {
        padding: '10px 20px',
        backgroundColor: '#ff5c5c',
        border: 'none',
        borderRadius: '8px',
        color: '#fff',
        cursor: 'pointer',
        marginBottom: '10px',
    },
    iconDefault: {
        fontSize: '24px',
        color: '#fff',
        transition: 'transform 0.3s, color 0.3s',
    },
    iconDefault2: {
        fontSize: '27px',
        color: '#fff',
        transition: 'transform 0.3s, color 0.3s',
    },
    iconHovered: {
        fontSize: '24px',
        color: 'red',
        transform: 'scale(1.11)',
    },
    iconHovered2: {
        fontSize: '24px',
        color: '#C8FFFD',
        transform: 'scale(1.065)',
    },
    iconHovered3: {
        fontSize: '27px',
        color: '#EDFFFE',
        transform: 'scale(1.11)',
    },
};
