import React, { useState } from 'react';

const FetchImages = () => {
  const [userId, setUserId] = useState('');
  const [requestId, setRequestId] = useState('');
  const [images, setImages] = useState([]);

  const fetchImages = () => {
    if (!userId) {
      alert("Please enter a User ID.");
      return;
    }
    if (!requestId) {
      alert("Please enter a Request ID.");
      return;
    }

    fetch(`https://f3593qhe00.execute-api.ap-northeast-1.amazonaws.com/dev/genImages?requestID=${requestId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'user-id': userId
      }
    })
      .then(response => response.json())
      .then(data => {
        setImages(data.images);
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to fetch images.');
      });
  };

  return (
    <div>
      <h2>Images</h2>
      User ID: <input type="text" value={userId} onChange={e => setUserId(e.target.value)} placeholder="Enter User ID" /><br />
      Request ID: <input type="text" value={requestId} onChange={e => setRequestId(e.target.value)} placeholder="Enter Request ID" /><br />
      <button onClick={fetchImages}>Fetch Images</button>
      <div id="images">
        {images.map((imgData, index) => (
          <img key={index} src={`data:image/jpeg;base64,${imgData}`} alt={`Image ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default FetchImages;
