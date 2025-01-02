import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostById } from '../features/postSlice';

const PostDetail = ({ id }) => {
    const dispatch = useDispatch();
    const post = useSelector((state) => state.posts.post);

    React.useEffect(() => {
        dispatch(fetchPostById(id));
    }, [dispatch, id]);

    if (!post) return <div>Loading...</div>;

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <img src={post.image} alt={post.title} />
        </div>
    );
};

export default PostDetail;
