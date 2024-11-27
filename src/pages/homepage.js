import React, { useContext, useState } from 'react';
import { Avatar } from '@mui/material';
import { FavoriteBorder, BookmarkBorder, Favorite, Bookmark, Send } from '@mui/icons-material';
import { FaRegComment, FaComment } from 'react-icons/fa';
import Sidebar from '@/components/Sidebar';
import Sidefollowlist from '@/components/Sidefollowlist';
import axios from 'axios';
import { DataContext } from '../context/context';
import Createpost from '@/components/Createpost';
import { parseCookies } from 'nookies';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SearchBar from '@/components/Searchbar';
import NotificationBar from '@/components/Notifications';

export async function getServerSideProps(context) {
    try {
        const cookies = parseCookies(context);
        const res = await axios.post(`${process.env.HOST}/api/getallposts`, { token: cookies.token });
        const res2 = await axios.post(`${process.env.HOST}/api/getsuggestion`, { token: cookies.token });
        const { posts, likedPosts, bookmarked, Userdetails, allusers, notificationsbyusers } = res.data;
        const { suggestedUsers } = res2.data;
        console.log(suggestedUsers)
        return {
            props: {
                posts,
                likedPosts,
                bookmarked,
                Userdetails,
                allusers,
                notificationsbyusers,
                suggestedUsers
            },
        };
    } catch (error) {
        console.error('Error fetching posts:', error);
        return {
            props: {
                posts: [],
            },
        };
    }
}

const Post = ({ post, likedPosts, bookmarked, Userdetails }) => {
    const [hoverheart, setHoverheart] = useState(false);
    const [hovercomment, setHovercomment] = useState(false);
    const [hoverbookmark, setHoverbookmark] = useState(false);
    const [showcomment, setshowcomment] = useState(false);
    const [heart, setHeart] = useState(false);
    const [bookmark, setBookmark] = useState(false);
    const [userprofilepic] = useState(Userdetails.profileImage);
    const [allcomments, setallcomments] = useState(post.comments);

    const router = useRouter();

    useEffect(() => {
        if (likedPosts?.includes(post._id)) {
            setHeart(true);
        } else {
            setHeart(false);
        }
    }, [likedPosts, post._id]);

    useEffect(() => {
        if (bookmarked?.includes(post._id)) {
            setBookmark(true);
        } else {
            setBookmark(false);
        }
    }, [bookmarked, post._id]);


    const [likes, setLikes] = useState(post.alllikes.length);

    const addLike = async (id) => {
        setLikes(likes + 1);
        setHeart(true);
        const response = await axios.put("/api/updatepost/like", { identity: id });
    }

    const removeLike = async (id) => {
        setLikes(likes - 1);
        setHeart(false);
        const response = await axios.put("/api/updatepost/removelike", { identity: id });
    }

    const addbookmark = async (id) => {
        setBookmark(true);
        const response = await axios.put("/api/updatepost/book", { identity: id });
    }

    const unbookmark = async (id) => {
        setBookmark(false);
        const response = await axios.put("/api/updatepost/rembook", { identity: id });
    }

    const [comment, setcomment] = useState("");


    const commentonpost = async (id) => {
        const response = await axios.put("/api/updatepost/addcomment", { identity: id, comment });
        setallcomments(response.data.post.comments);
        setcomment("");
    }

    const showprofile = async (id) => {
        const res = await axios.post("/api/checkprofile", { id: id });
        console.log(res)
        if (res.data.same) {
            router.push(`/myprofile`)
        } else {
            router.push(`/user/${id}`)
        }
    }

    const route = (id) => {
        router.push(`/user/${id}`);
    }


    return (
        <div className='post' key={post._id} style={{ backgroundColor: '#282828', marginBottom: '40px', borderRadius: '10px' }}>
            <div onClick={() => showprofile(post.author)} style={{ display: 'flex', flexDirection: 'initial', width: '95%', margin: '0 auto', padding: '20px 0px' }}>
                <Avatar src={post.authordetails.profileImage} sx={{ width: 50, height: 50, mr: 1 }} />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h4 style={{ display: 'flex', flexDirection: 'initial' }}>{post.authordetails.name}</h4>
                    <h6 style={{ color: 'gray', display: 'flex', flexDirection: 'initial', fontSize: '13px' }}>@{post.authordetails.username}</h6>
                </div>
            </div>
            <hr style={{ width: '95%', margin: '0 auto', backgroundColor: '#838383', height: '0.5px', border: 'none' }} />
            <div style={{ padding: '20px 0', width: '95%', margin: '0 auto', display: 'flex', flexDirection: 'initial' }}>
                <p style={{ fontSize: '13px', color: 'white', textAlign: "left" }}>{post.content}</p>
            </div>
            <img src={post.mediaUrl} alt='' style={{ width: '95%', borderRadius: '10px' }} />
            <div style={{ display: 'flex', justifyContent: "space-between", gap: '18px', width: '91%', margin: '0 auto', padding: '20px 0px', alignItems: "center" }}>
                <div style={{ display: "flex", gap: "15px" }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {heart ?
                            <Favorite style={hoverheart ? styles.iconHovered : { ...styles.iconDefault, color: "red" }}
                                onMouseEnter={() => setHoverheart(true)}
                                onMouseLeave={() => setHoverheart(false)}
                                onClick={() => removeLike(post._id)} />
                            : (
                                <FavoriteBorder
                                    onMouseEnter={() => setHoverheart(true)}
                                    onMouseLeave={() => setHoverheart(false)}
                                    style={hoverheart ? styles.iconHovered : styles.iconDefault}
                                    onClick={() => addLike(post._id)}
                                />
                            )
                        }
                        <p>{likes}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: "3px" }}>
                        {!showcomment ? (
                            <FaRegComment
                                onMouseEnter={() => setHovercomment(true)}
                                onMouseLeave={() => setHovercomment(false)}
                                style={hovercomment ? styles.iconHovered2 : styles.iconDefault}
                                onClick={() => setshowcomment(true)}
                            />) :
                            (
                                <FaComment
                                    onMouseEnter={() => setHovercomment(true)}
                                    onMouseLeave={() => setHovercomment(false)}
                                    style={hovercomment ? styles.iconHovered2 : styles.iconDefault}
                                    onClick={() => setshowcomment(false)}
                                />
                            )}
                        <p>{allcomments?.length}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {bookmark ? (
                            <Bookmark
                                onMouseEnter={() => setHoverbookmark(true)}
                                onMouseLeave={() => setHoverbookmark(false)}
                                style={hoverbookmark ? styles.iconHovered3 : styles.iconDefault2}
                                onClick={() => unbookmark(post._id)} />
                        ) : (
                            <BookmarkBorder
                                onMouseEnter={() => setHoverbookmark(true)}
                                onMouseLeave={() => setHoverbookmark(false)}
                                style={hoverbookmark ? styles.iconHovered3 : styles.iconDefault2}
                                onClick={() => addbookmark(post._id)} />
                        )}

                    </div>
                </div>
                <div>
                    <p style={{ color: "gray", fontSize: "13px" }}>{post.createdAt.slice(0, 10)}</p>
                </div>
            </div>
            {allcomments.length === 1 && !showcomment &&
                (<div style={{ display: 'flex', flexDirection: 'initial', width: '91%', margin: '0 auto', padding: '0px 0px 20px 0px' }}>
                    <p style={{ fontSize: '14px', color: '#909090' }}>{allcomments[0].user.name} has also commented...</p>
                </div>)}

            {allcomments.length > 1 && !showcomment &&
                (<div style={{ display: 'flex', flexDirection: 'initial', width: '91%', margin: '0 auto', padding: '0px 0px 20px 0px' }}>
                    <p style={{ fontSize: '14px', color: '#909090' }}>{allcomments[0].user.name} and others have also commented...</p>
                </div>)}
            {showcomment && (
                <div style={{ display: 'flex', flexDirection: 'column', width: '90%', margin: '0 auto', padding: '40px 0' }}>
                    <h4 style={{
                        fontSize: '24px', color: '#F2F2F2', textAlign: 'center', marginBottom: '20px'
                    }}>
                        <b>Comments</b>
                    </h4>
                    <div style={{
                        display: 'flex', justifyContent: 'center', alignItems: "center"
                    }}>
                        <Avatar src={userprofilepic} sx={{ mr: 1 }} />
                        <input placeholder='Add a comment...' onChange={(e) => setcomment(e.target.value)} value={comment} style={{
                            height: '40px', borderRadius: '20px', width: '70%', padding: '8px 20px', border: '2px solid #555', fontSize: '14px', color: '#F4F4F4', fontFamily: 'Poppins, sans-serif',
                        }} />
                        <Send onClick={() => commentonpost(post._id)} style={{ marginLeft: "10px", color: (comment ? "white" : "#686868"), cursor: comment ? "pointer" : "default" }} disabled={!comment} />
                    </div>
                    <div className="commentsContainer" style={{ backgroundColor: "#272727", marginTop: "30px", padding: "20px 10px", borderRadius: "10px" }}>
                        {allcomments?.map((comm) => (
                            <div onClick={()=> route(comm.user._id)} className="comment" style={{ display: 'flex', flexDirection: 'initial', width: '95%', margin: '0px auto 25px auto', padding: '20px 10px', backgroundColor: "#353535", borderRadius: "5px" }}>
                                <Avatar src={comm.user.profileImage} />
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                        <h4 style={{ display: 'flex', flexDirection: 'initial', marginLeft: "8px", color: "#F1F1F1", fontSize: "13px" }}>{comm.user.name}</h4><p style={{ color: "#CBCBCB", fontSize: "9px" }}>{comm.user.createdAt.slice(0, 10)}</p>
                                    </div>
                                    <p style={{ marginLeft: "8px", color: "#EBEBEB", fontSize: "13px", display: "flex", flexDirection: "initial", textAlign: "left" }}>{comm.content}</p>
                                </div>
                            </div>

                        ))}
                        {allcomments.length === 0 && (
                            <h5 style={{ fontSize: '20px', color: '#F2F2F2', textAlign: 'center' }}>
                                <b>No comments on this post.</b>
                            </h5>
                        )}

                    </div>
                </div>
            )}

        </div>
    );
};

const Homepage = ({ posts, likedPosts, bookmarked, Userdetails, allusers, notificationsbyusers, suggestedUsers }) => {
    const { data } = useContext(DataContext);
    if (!Array.isArray(posts) || posts.length === 0) {
        return <p>Loading...</p>
    }

    return (
        <>
            <div style={styles.container}>
                {(data !== "Search" && data !== "Notifications") ? (
                    <div style={{ width: '300px', zIndex: '7' }}>
                        <Sidebar img={Userdetails.profileImage} />
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

                <div style={styles.main}>
                    <div style={styles.content}>
                        <div style={styles.suggestedPosts}>
                            <nav style={{ backgroundColor: 'black', position: 'fixed', margin: '0px auto', height: '75px', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '5', width: '100%' }}>
                                <h1 style={{ fontSize: '30px' }}>Your Feed:</h1>
                            </nav>
                            <div className='postscontainer' style={{ backgroundColor: 'black', width: '92%', height: 'auto', borderRadius: '15px', paddingTop: '120px' }}>
                                {posts.map(post => (
                                    <Post key={post._id} post={post} likedPosts={likedPosts} bookmarked={bookmarked} Userdetails={Userdetails} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ width: '320px', zIndex: '7' }}><Sidefollowlist suggestedUsers={suggestedUsers} /></div>
            </div>
            {data === "Create" && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <Createpost />
                    </div>
                </div>
            )}
        </>
    );
};

export default Homepage;

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
        flexDirection: 'column',
    },
    content: {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    suggestedPosts: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: "100%",
        width: "auto"
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
