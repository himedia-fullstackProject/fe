// Post.js
import React from "react";
import { Link } from "react-router-dom";
import style from "../../css/likeThBox.module.css";

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
    <div className={style.likeContainer}>
      <Link to={`/detail/${id}`}>
        <img
          src={image || "https://via.placeholder.com/150x150/000080"}
          className={style.img}
        />
        <h3 className={style.post_title}>{title}</h3>
      </Link>
    </div>
  );
};

export default Post;
