import React, { useEffect, useState } from 'react';
import apiClient from '../api/api';
import errorDisplay from '../api/errorDisplay';

const SearchResult = ({ searchTerm }) => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    const fetchSearchResults = async () => {
        try {
            const response = await apiClient.post('/api/posts/search', { searchTerm });
            setPosts(response.data);
        } catch (error) {
            setError("검색 결과를 불러오는 데 실패했습니다.");
            errorDisplay(error);
        }
    };

    useEffect(() => {
        fetchSearchResults();
    }, [searchTerm]);

    if (error) return <p>{error}</p>;
    if (!posts.length) return <p>검색 결과가 없습니다.</p>;

    return (
        <div>
            <h2>검색 결과</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResult;
