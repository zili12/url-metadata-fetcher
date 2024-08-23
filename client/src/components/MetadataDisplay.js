import React from 'react';

function MetadataDisplay({ metadata }) {
  return (
    <div className="metadata-display">
      {metadata.map((item, index) => (
        <div key={index} className="metadata-item">
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          {item.image && <img src={item.image} alt={item.title} />}
        </div>
      ))}
    </div>
  );
}

export default MetadataDisplay;