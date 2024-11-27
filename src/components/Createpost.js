import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography, IconButton, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Close from '@mui/icons-material/Close';
import { DataContext } from '../context/context';
import { useRouter } from 'next/navigation';

const Input = styled('input')({
  display: 'none',
});

function Createpost() {
  const Router = useRouter();
  const { setData } = useContext(DataContext);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'next_cloudinary_upload');

    try {
      setLoading(true);
      const response = await axios.post('https://api.cloudinary.com/v1_1/da2imhgtf/image/upload', formData);
      setImageUrl(response.data.secure_url);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async() => {
    const res = await axios.post("/api/createpost", {mediaUrl :  imageUrl, content : content });
    setContent('');
    setImage(null);
    setImageUrl('');
    setData("");
    Router.push("/homepage")
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <div style={styles.closeIconContainer}>
          <Close onClick={() => setData("")} style={styles.closeIcon} />
        </div>
        <Box sx={{ fontFamily: 'Poppins, sans-serif', textAlign: 'center', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "80%", height: "auto" }}>
          <Typography variant="h4" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', padding: "20px 0" }}>Create Post</Typography>
          <textarea
            style={styles.textarea}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <label htmlFor="upload-button" style={{ display: "flex", alignItems: "center" }}>
              <Input accept="image/*" id="upload-button" type="file" onChange={handleImageChange} />
              <IconButton color="primary" aria-label="upload picture" component="span">
                <UploadFileIcon fontSize="large" />
              </IconButton>
            </label>
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                disabled={!image || loading}
                startIcon={loading && <CircularProgress size={20} />}
                style={!image || loading ? { color: "gray" } : { color: "white" }}
              >
                Upload
              </Button>
            </Box>
          </div>
          {imageUrl && (
            <Box mt={4} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
              <Typography variant="h6">Uploaded Image:</Typography>
              <Box mt={2}>
                <img src={imageUrl} alt="Uploaded" style={styles.imagePreview} />
              </Box>
            </Box>
          )}
          <Button onClick={handleSubmit} style={(imageUrl !== '' && content !== '') ? styles.publishButton : {
            ...styles.publishButton, backgroundColor: '#6D6D6D',
            color: '#A7A7A7',
          }} disabled={!(imageUrl !== '' && content !== '')}>Publish</Button>
        </Box>
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

export default Createpost;
