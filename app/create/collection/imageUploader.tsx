import React, { useState } from 'react';

import { useGetImageStore } from './store';

const UploadImages = () => {
  const { setUploadImages } = useGetImageStore();
  const [error, setError] = useState('');
  
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Check if the number of selected files exceeds 25
    if (files.length > 25) {
      setError('You can upload a maximum of 25 photos.');
      return;
    }

    // Check if the number of selected files is less than 20
  if (files.length < 20) {
    setError('You must upload at least 20 photos.');
    return;
  }

    // Check file formats
    const allowedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
    const invalidFiles = files.filter(file => !allowedFormats.includes(file.type));
    if (invalidFiles.length > 0) {
      setError('Only PNG, JPG, and JPEG file formats are allowed.');
      return;
    }

    setError(''); // Clear any previous error message
    setUploadImages(files);
  };

  return (
    <>
      <input type="file" multiple onChange={handleFileChange} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
};

export default UploadImages;
