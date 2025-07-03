import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Bokor } from 'next/font/google';


const bokorFont = Bokor({
    subsets: ["latin"],
    weight:"400",
});

const Filter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    genres: [],
    colors: [],
    availability: [],
  });
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // Predefined filter options
  const genres = ['Numetal', 'Hardcore', 'Alternative', 'Punk'];
  const colors = ['Preto', 'Branco', 'Vermelho'];
  const availability = ['Disponível', 'Esgotado'];

  // Unified handler for all filter changes
  const handleFilterChange = (category, value) => {
    setFilters(prevFilters => {
      const currentValues = prevFilters[category];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      const newFilters = {
        ...prevFilters,
        [category]: newValues,
      };

      onFilterChange(newFilters);
      return newFilters;
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
              className="filter-checkbox" // The onClick handler is moved to the input's onChange
            >
              <input
                type="checkbox"
                id={`genre-${genre}`}
                checked={filters.genres.includes(genre)}
                onChange={() => handleFilterChange('genres', genre)}
                className="cursor-pointer"
              />
             <label 
                htmlFor={`genre-${genre}`} 
                style={{

                  color: genre === 'Numetal' ? 'black' : 
                         genre === 'Hardcore' ? 'black' : 
                         genre === 'Alternative' ? 'black' : 
                         genre === 'Punk' ? 'black' :'inherit'
                }}
              >
                {genre}
              </label>
            </div>
          ))} 
        </div>

        {/* Color Filter */}
        <div className="filter-section">
          <h3 className={bokorFont.className}>Cor</h3>
          {colors.map(color => (
            <div 
              key={color} 
              className="filter-checkbox" // The onClick handler is moved to the input's onChange
            >
              <input
                type="checkbox"
                id={`color-${color}`}
                checked={filters.colors.includes(color)}
                onChange={() => handleFilterChange('colors', color)}
                className="cursor-pointer"
              />
              <label 
                htmlFor={`color-${color}`} 
                style={{

                  color: color === 'Preto' ? 'black' : 
                         color === 'Branco' ? 'black' : 
                         color === 'Vermelho' ? 'black' : 'inherit'
                }}
              >
                {color}
              </label>
            </div>
          ))}
        </div>

        {/* Availability Filter */}
        <div className="filter-section">
          <h3 className={bokorFont.className}>Disponibilidade</h3>
          {availability.map(status => (
            <div 
              key={status} 
              className="filter-checkbox" // The onClick handler is moved to the input's onChange
            >
              <input
                type="checkbox"
                id={`availability-${status}`}
                checked={filters.availability.includes(status)}
                onChange={() => handleFilterChange('availability', status)}
                className="cursor-pointer"
              />
               <label 
                htmlFor={`availability-${status}`} // Fix: Match the input's id
                style={{
                  color: status === 'Disponível' ? 'black' : 
                  status === 'Esgotado' ? 'black' : 'inherit'
                }}
              >
                {status}
              </label>
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