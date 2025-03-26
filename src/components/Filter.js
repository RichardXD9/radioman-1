import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Filter = ({ onFilterChange }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);

  // Predefined filter options
  const genres = ['Rock', 'Metal', 'Alternative', 'Punk'];
  const colors = ['Black', 'White', 'Red', 'Blue'];
  const availability = ['Disponível', 'Esgotado'];

  // Handle genre selection
  const handleGenreChange = (genre) => {
    const newGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter(g => g !== genre)
      : [...selectedGenres, genre];
    
    setSelectedGenres(newGenres);
    onFilterChange({ 
      genres: newGenres, 
      colors: selectedColors, 
      availability: selectedAvailability 
    });
  };

  // Handle color selection
  const handleColorChange = (color) => {
    const newColors = selectedColors.includes(color)
      ? selectedColors.filter(c => c !== color)
      : [...selectedColors, color];
    
    setSelectedColors(newColors);
    onFilterChange({ 
      genres: selectedGenres, 
      colors: newColors, 
      availability: selectedAvailability 
    });
  };

  // Handle availability selection
  const handleAvailabilityChange = (status) => {
    const newAvailability = selectedAvailability.includes(status)
      ? selectedAvailability.filter(a => a !== status)
      : [...selectedAvailability, status];
    
    setSelectedAvailability(newAvailability);
    onFilterChange({ 
      genres: selectedGenres, 
      colors: selectedColors, 
      availability: newAvailability 
    });
  };

  return (
    <div className="filter-sidebar bg-gray-100 p-4 w-64 fixed left-0 top-16 bottom-0 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Filtros</h2>
      
      {/* Genre Filter */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Gênero</h3>
        {genres.map(genre => (
          <div key={genre} className="flex items-center mb-1">
            <input
              type="checkbox"
              id={`genre-${genre}`}
              checked={selectedGenres.includes(genre)}
              onChange={() => handleGenreChange(genre)}
              className="mr-2"
            />
            <label htmlFor={`genre-${genre}`}>{genre}</label>
          </div>
        ))}
      </div>

      {/* Color Filter */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Cor</h3>
        {colors.map(color => (
          <div key={color} className="flex items-center mb-1">
            <input
              type="checkbox"
              id={`color-${color}`}
              checked={selectedColors.includes(color)}
              onChange={() => handleColorChange(color)}
              className="mr-2"
            />
            <label htmlFor={`color-${color}`}>{color}</label>
          </div>
        ))}
      </div>

      {/* Availability Filter */}
      <div>
        <h3 className="font-semibold mb-2">Disponibilidade</h3>
        {availability.map(status => (
          <div key={status} className="flex items-center mb-1">
            <input
              type="checkbox"
              id={`availability-${status}`}
              checked={selectedAvailability.includes(status)}
              onChange={() => handleAvailabilityChange(status)}
              className="mr-2"
            />
            <label htmlFor={`availability-${status}`}>{status}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

// PropTypes for type checking
Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired
};

export default Filter;