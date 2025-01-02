import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../features/postSlice';

const PostForm = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPost({ title, description, image }));
        setTitle('');
        setDescription('');
        setImage('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Post</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
            />
            <button type="submit">Create Post</button>
        </form>
    );
};

export default PostForm;
