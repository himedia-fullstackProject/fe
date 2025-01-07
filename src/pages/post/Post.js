// Post.js
import React from "react";
import { Link } from "react-router-dom";
import style from "../../css/searchResult.module.css";

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
    <div className={style.postCard}>
      <Link to={`detail/${id}`}>
        <img src={image} alt={title} className={style.postImage} />
        <div className={style.postContent}>
          <h3 className={style.postTitle}>{title}</h3>
          <p className={style.postAuthor}>by {username}</p>
        </div>
      </Link>
    </div>
  );
};

export default Post;
