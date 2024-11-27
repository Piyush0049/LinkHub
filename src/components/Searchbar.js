import React, { useContext, useState } from 'react';
import { Search as SearchIcon, Close } from '@mui/icons-material';
import { InputBase, Avatar } from '@mui/material';
import { DataContext } from '@/context/context';
import { useRouter } from 'next/navigation';

const SearchBar = ({ allusers }) => {
    const router = useRouter()
    const { setData } = useContext(DataContext);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const route = (id) => {
        router.push(`/user/${id}`);
        setData("")
    }

    return (
        <div style={styles.searchBarContainer}>
            <div style={{ display: "flex", justifyContent: "flex-end", width: "100%", marginTop: "5px" }}>
                <Close onClick={() => setData("")} style={{backgroundColor : "#272727"}}/>
            </div>
            <h2 style={{ display: "flex", alignItems: "center", marginTop: "40px" }}>
                <SearchIcon /> Search
            </h2>
            <form style={styles.form}>
                <SearchIcon style={styles.searchIcon} />
                <InputBase
                    placeholder="Search…"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={styles.input}
                />
            </form>

            <div className='searchedusers' style={{ color: "white", width: "100%", paddingTop: "10px" }}>
                {searchTerm &&
                    allusers.map((user) => (
                        user.name.toLowerCase().startsWith(searchTerm.toLowerCase()) ? (
                            <div onClick={()=>route(user._id)} key={user._id} className="user" style={{ display: 'flex', flexDirection: 'initial', width: '100%', marginBottom: '10px', padding: '10px 10px', backgroundColor: "#1C1C1C", borderRadius: "5px" }}>
                                <Avatar src={user.profileImage} />
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <p style={{ display: 'flex', flexDirection: 'initial', marginLeft: "8px", color: "#EBEBEB", fontSize: "13px" }}>{user.name}</p>
                                    <p style={{ display: 'flex', flexDirection: 'initial', marginLeft: "8px", color: "#AEAEAE", fontSize: "12px" }}>{user.username}</p>
                                </div>
                            </div>
                        ) : null
                    ))
                }
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
        justifyContent: 'center',
        padding: '30px',
        backgroundColor: '#000',
        borderBottom: '1px solid #161616',
        gap: "20px"
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

export default SearchBar;
