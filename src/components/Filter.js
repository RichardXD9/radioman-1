import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Bokor } from 'next/font/google';
import '../styles/filter.css';

const bokorFont = Bokor({
    subsets: ["latin"],
    weight:"400",
});

const Filter = ({ onFilterChange }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // Predefined filter options
  const genres = ['Numetal', 'Hardcore', 'Alternative', 'Punk'];
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

  // Toggle mobile filter visibility
  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <button 
        className="md:hidden fixed top-16 left-4 z-20 bg-red-600 text-white p-2 rounded"
        onClick={toggleFilterVisibility}
      >
        {isFilterVisible ? 'Fechar Filtros' : 'Abrir Filtros'}
      </button>

      <div 
        className={`filter-sidebar 
          ${isFilterVisible ? 'active' : ''} 
          md:translate-x-0`}
      >
        <h2 className={bokorFont.className}>Filtros</h2>
        
        {/* Genre Filter */}
        <div className="filter-section">
          <h3 className={bokorFont.className}>Gênero</h3>
          {genres.map(genre => (
            <div 
              key={genre} 
              className="filter-checkbox"
              onClick={() => handleGenreChange(genre)}
            >
              <input
                type="checkbox"
                id={`genre-${genre}`}
                checked={selectedGenres.includes(genre)}
                onChange={() => {}} // Empty onChange to suppress React warning
                className="cursor-pointer"
              />
              <label htmlFor={`genre-${genre}`}>{genre}</label>
            </div>
          ))}
        </div>

        {/* Color Filter */}
        <div className="filter-section">
          <h3 className={bokorFont.className}>Cor</h3>
          {colors.map(color => (
            <div 
              key={color} 
              className="filter-checkbox"
              onClick={() => handleColorChange(color)}
            >
              <input
                type="checkbox"
                id={`color-${color}`}
                checked={selectedColors.includes(color)}
                onChange={() => {}} // Empty onChange to suppress React warning
                className="cursor-pointer"
              />
              <label htmlFor={`color-${color}`}>{color}</label>
            </div>
          ))}
        </div>

        {/* Availability Filter */}
        <div className="filter-section">
          <h3 className={bokorFont.className}>Disponibilidade</h3>
          {availability.map(status => (
            <div 
              key={status} 
              className="filter-checkbox"
              onClick={() => handleAvailabilityChange(status)}
            >
              <input
                type="checkbox"
                id={`availability-${status}`}
                checked={selectedAvailability.includes(status)}
                onChange={() => {}} // Empty onChange to suppress React warning
                className="cursor-pointer"
              />
              <label htmlFor={`availability-${status}`}>{status}</label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// PropTypes for type checking
Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired
};

export default Filter;  