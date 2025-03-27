import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import Filter from '../components/Filter';
import CdsProductList from '../components/CdsProductList';

const Cd = () => {
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
                <CdsProductList filters={filters} />
            </div>
        </div>
    );
};

export default Cd;