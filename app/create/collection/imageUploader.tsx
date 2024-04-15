import React, { useState } from 'react';

import { useGetImageStore } from './store';

const UploadImages = () => {
  const [modelName, setModelName] = useState('1234');
  const [userId, setUserId] = useState('jasonTest');
  const [files, setFiles] = useState([]);
  const [bseModel, setBaseModel] = useState('animerge_v30.safetensors [0bb26698cd]')
  const { setUploadImages } = useGetImageStore();

  const handleFileChange = (e) => {
    setUploadImages([...e.target.files])
  };

  return (
    <>
      <input type="file" multiple onChange={handleFileChange} />
    </>
  );
};

export default UploadImages;
