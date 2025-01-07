import React from "react";
import { Link } from "react-router-dom";
import { fetchPosts } from "../../api/postApi";
const Post = ({
  id,
  title,
  image,
  description,
  tag1,
  tag2,
  tag3,
  likes,
  mainCategoryId,
  subCategoryId,
  userId,
  createdAt,
  updatedAt,
  username,
}) => {
  return (
    <div>
      <Link to={`detail/${id}`}>
        <img src={image}></img>
        <h1>{title}</h1>
        <p>by.{username}</p>
      </Link>
    </div>
  );
};

export default Post;
