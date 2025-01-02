import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchPosts } from '../features/postSlice';

const SearchBar = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(searchPosts({ searchTerm }));
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;
