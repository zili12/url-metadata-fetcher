import React, { useState } from 'react';

function UrlForm({ onSubmit }) {
  const [urls, setUrls] = useState(['', '', '']);
  const [error, setError] = useState('');

  const handleUrlChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validUrls = urls.filter((url) => url.trim() !== '');
    if (validUrls.length < 3) {
      setError('Please enter at least 3 valid URLs');
      return;
    }
    setError('');
    onSubmit(validUrls);
  };

  return (
    <form onSubmit={handleSubmit}>
      {urls.map((url, index) => (
        <input
          key={index}
          type="url"
          value={url}
          onChange={(e) => handleUrlChange(index, e.target.value)}
          placeholder="Enter URL"
          required
        />
      ))}
      <button type="submit">Fetch Metadata</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default UrlForm;