import React from 'react'
import { Avatar } from '@mui/material';
import { useRouter } from 'next/navigation';
import axios from 'axios';


const Sidefollowlist = ({ suggestedUsers }) => {
  const router = useRouter()

  const follow = async (id) => {
    const res = await axios.put("/api/updatepost/follow", { identity: id })
    console.log(res);
    router.push(`/user/${id}`);
  }

  const visit = async (id) => {
    router.push(`/user/${id}`);
  }

  return (
    <div style={styles.suggestions}>
      <h2 style={styles.suggestionsHeader}>Suggested for you</h2>
      <br />
      {suggestedUsers?.map(user => (
        <div key={user} style={styles.suggestion}>
          <Avatar src={user.profileImage} sx={{ width: 40, height: 40, mr: 1 }} onClick={() => visit(user._id)} />
          <div style={styles.suggestionInfo}>
            <span style={styles.suggestionName}>{user.username}</span>
            <button onClick={() => follow(user._id)} style={styles.followButton}>Follow</button>
          </div>
        </div>
      ))}
      {suggestedUsers?.length === 0 && (
        <p style={{ fontSize: "15px", color: "gray" }}>No suggestions</p>
      )}

    </div>
  )
}

const styles = {
  suggestedPosts: {
    textAlign: 'center',
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  suggestedHeader: {
    fontSize: '22px',
    marginBottom: '10px'
  },
  suggestions: {
    width: '320px',
    padding: '40px 25px 20px 25px',
    borderLeft: '1px solid #161616',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: "fixed",
    height: "100vh"
  },
  suggestionsHeader: {
    fontSize: '18px',
    marginBottom: '10px'
  },
  suggestion: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    width: '100%'
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
    marginBottom: '2px',
    color: "#B2B2B2"
  },
  followButton: {
    padding: '5px 10px',
    backgroundColor: '#0095f6',
    border: 'none',
    fontFamily: 'Poppins, sans-serif',
    borderRadius: '8px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    maxWidth: "100px"
  }
};

export default Sidefollowlist
