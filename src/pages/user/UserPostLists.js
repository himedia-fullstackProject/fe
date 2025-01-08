import React, { useEffect, useState } from 'react';
import { fetchPost } from '../../api/postapi'; // fetchPost 함수를 가져옵니다.

const UserPostLists = ({ currentUser }) => {
  const [posts, setPosts] = useState([]); // 로컬 상태로 포스트 저장
  const [error, setError] = useState(null); // 에러 상태 저장

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const allPosts = await fetchPost(); // 모든 포스트 가져오기
        setPosts(allPosts); // 포스트를 로컬 상태에 저장
        setError(null); // 에러 초기화
      } catch (err) {
        setError("포스트를 불러오는 데 실패했습니다."); // 에러 설정
      }
    };

    fetchUserPosts();
  }, []);

  // 로그인된 사용자 ID
  const userId = currentUser?.userId;

  // 로그인된 사용자와 일치하는 포스트 필터링
  const userPosts = posts.filter(post => post.userId === userId);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>내 포스트</h2>
      {userPosts.length > 0 ? (
        <ul>
          {userPosts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>작성한 포스트가 없습니다.</p>
      )}
    </div>
  );
};

export default UserPostLists;
