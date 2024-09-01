import React, { useState } from 'react';
import axios from 'axios';
import './GifSearch.css';

const GifSearch = () => {
  const [query, setQuery] = useState('');
  const [gifs, setGifs] = useState([]);

  const fetchGifs = async () => {
    try {
      const response = await axios.get(`http://ec2-3-92-0-153.compute-1.amazonaws.com/api/gifs/${query}`);
      console.log(response.data); // Verifica el formato de la respuesta
      setGifs(response.data.data); // Ajusta según el formato de la respuesta
    } catch (error) {
      console.error("Error fetching GIFs:", error);
    }
  };

  return (
    <div className="container">
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search for GIFs" 
      />
      <button onClick={fetchGifs}>Buscar</button>
      <div className="gif-container">
        {gifs.length > 0 ? (
          gifs.map((gif, index) => (
            <a key={index} href={gif.images.original.url} target="_blank" rel="noopener noreferrer">
              <img src={gif.images.fixed_height_small.url} alt="GIF" />
            </a>
          ))
        ) : (
          <p>No GIFs found</p>
        )}
      </div>
    </div>
  );
};

export default GifSearch;
