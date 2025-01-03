import React, { useState } from 'react';
import apiClient from '../../api/api';
import errorDisplay from '../../api/errorDisplay';
import { useSelector } from 'react-redux';

const PostForm = ({ post, onSuccess }) => {
    const [title, setTitle] = useState(post ? post.title : '');
    const [image, setImage] = useState(post ? post.image : '');
    const [description, setDescription] = useState(post ? post.description : '');
    const token = useSelector((state) => state.user.jwtToken);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const postDTO = {
                title,
                image,
                description,
            };
            if (post) {
                await apiClient.put(`/api/posts/${post.id}`, postDTO, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else {
                await apiClient.post('/api/posts', postDTO, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
            onSuccess(); // 수정 후 성공 시 호출
        } catch (error) {
            errorDisplay(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목"
                required
            />
            <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="이미지 URL"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="내용"
                required
            />
            <button type="submit">{post ? '수정하기' : '작성하기'}</button>
        </form>
    );
};

export default PostForm;
