// src/pages/post/Update.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPostById, updatePost } from '../../api/api'; // 수정된 경로

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [tag1, setTag1] = useState('');
    const [tag2, setTag2] = useState('');
    const [tag3, setTag3] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPost = async () => {
            try {
                const postData = await fetchPostById(id);
                setPost(postData);
                setTitle(postData.title);
                setImage(postData.image);
                setDescription(postData.description);
                setTag1(postData.tag1);
                setTag2(postData.tag2);
                setTag3(postData.tag3);
            } catch (error) {
                console.error("포스트 조회 중 오류 발생:", error);
                setError("포스트를 불러오는 데 실패했습니다.");
            }
        };
        loadPost();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedPostDTO = {
                title,
                image,
                description,
                tag1,
                tag2,
                tag3,
                mainCategoryId: post.mainCategoryId, // 필요에 따라 수정
                subCategoryId: post.subCategoryId, // 필요에 따라 수정
            };
            await updatePost(id, updatedPostDTO);
            alert('포스트가 성공적으로 업데이트되었습니다!');
            navigate(`/detail/${id}`); // 업데이트 후 세부정보 페이지로 리다이렉트
        } catch (error) {
            console.error("포스트 업데이트 중 오류 발생:", error);
            setError("포스트 업데이트에 실패했습니다.");
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Update Post</h2>
            {post ? (
                <form onSubmit={handleUpdate}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
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
                        placeholder="Tag 1"
                        value={tag1}
                        onChange={(e) => setTag1(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Tag 2"
                        value={tag2}
                        onChange={(e) => setTag2(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Tag 3"
                        value={tag3}
                        onChange={(e) => setTag3(e.target.value)}
                    />
                    <button type="submit">Update</button>
                </form>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Update;
