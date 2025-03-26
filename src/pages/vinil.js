import React from 'react';
import Navbar from "../components/Navbar";
import Filter from '../components/Filter';
import VinilProductList from '../components/VinilProductList';

const vinil = () => {
    const handleFilterChange = (filters) => {
        // You can add specific filter logic here if needed
        console.log('Filters applied:', filters);
    };

    return (
        <div>
            <Navbar />
            <div className="flex">
                <Filter onFilterChange={handleFilterChange} />
                <VinilProductList />
            </div>
        </div>
    );
};

export default vinil;