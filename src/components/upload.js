import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography, IconButton, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const Input = styled('input')({
  display: 'none',
});

const Upload = () => {
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
      const res = await axios.put("/api/addimage", { image: response.data.secure_url });
      console.log(res)

    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ fontFamily: 'Poppins, sans-serif', textAlign: 'center', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "80%", height: "auto" }}>
      <Typography variant="h4" gutterBottom style={{ fontFamily: 'Poppins, sans-serif' }}>Upload a profile image</Typography>
      <label htmlFor="upload-button">
        <Input accept="image/*" id="upload-button" type="file" onChange={handleImageChange} />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <UploadFileIcon fontSize="large" />
        </IconButton>
      </label>
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!image || loading}
          startIcon={loading && <CircularProgress size={20} />}
        >
          Upload
        </Button>
      </Box>
      {imageUrl && (
        <Box mt={4} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          <Typography variant="h6">Uploaded Image:</Typography>
          <Box mt={2}>
            <img src={imageUrl} alt="Uploaded" style={{ width: '300px', borderRadius: '8px' }} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Upload;
