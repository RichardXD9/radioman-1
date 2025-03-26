import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import Filter from '../components/Filter';
import VinilProductList from '../components/VinilProductList';

const Vinil = () => {
    const [filters, setFilters] = useState({
        genres: [],
        colors: [],
        availability: []
    });

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div>
            <Navbar />
            <div className="flex">
                <Filter onFilterChange={handleFilterChange} />
                <VinilProductList filters={filters} />
            </div>
        </div>
    );
};

export default Vinil;