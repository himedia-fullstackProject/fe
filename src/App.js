import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Entertainment from "./pages/post/category/entertainment/Entertainment";
import Etc from "./pages/post/category/entertainment/subcategory/Etc";
import Love from "./pages/post/category/entertainment/subcategory/Love";
import Travel from "./pages/post/category/entertainment/subcategory/Travel";
import FashionBeauty from "./pages/post/category/fashionbeauty/FashionBeauty";
import Beauty from "./pages/post/category/fashionbeauty/subcategory/Beauty";
import Fashion from "./pages/post/category/fashionbeauty/subcategory/Fashion";
import FB from "./pages/post/category/fb/FB";
import HotPlace from "./pages/post/category/fb/subcategory/HotPlace";
import Recipe from "./pages/post/category/fb/subcategory/Recipe";
import Health from "./pages/post/category/health/Health";
import Detail from "./pages/post/Detail";
import Home from "./pages/post/Home";
import PostList from "./pages/post/PostList"; 
import Update from "./pages/post/Update";
import WritePost from "./pages/post/WritePost"; 
import HashTagSearchResult from "./pages/result/HashTagSearchResult";
import SearchResult from "./pages/result/SearchResult";
import MyPage from "./pages/user/MyPage";
import SignUp from "./pages/user/Signup";
import UserLikesPage from "./pages/user/UserLikesPage";
import UserPostLists from "./pages/user/UserPostLists";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          
          {/* 포스트 관련 라우트 */}
          <Route path="postlist" element={<PostList />} />
          <Route path="write" element={<WritePost />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="update/:id" element={<Update />} />
          
          {/* 사용자 관련 라우트 */}
          <Route path="mypage" element={<MyPage />} />
          <Route path="userlikes" element={<UserLikesPage />} />
          <Route path="userpostlists" element={<UserPostLists />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          
          {/* 검색 관련 라우트 */}
          <Route path="search/result" element={<SearchResult />} />
          <Route path="hashtag-search-result" element={<HashTagSearchResult />} />

          {/* 카테고리별 포스트 라우트 */}
          <Route path="/category/4" element={<Entertainment />} />
          <Route path="/category/1" element={<FashionBeauty />} />
          <Route path="/category/3" element={<Health />} />
          <Route path="/category/2" element={<FB />} />
          
          {/* 서브 카테고리 라우트 */}
          <Route path="/sub-category/1" element={<Fashion />} />
          <Route path="/sub-category/2" element={<Beauty />} />
          <Route path="/sub-category/3" element={<Recipe />} />
          <Route path="/sub-category/4" element={<HotPlace />} />
          <Route path="/sub-category/5" element={<Love />} />
          <Route path="/sub-category/6" element={<Travel />} />
          <Route path="/sub-category/7" element={<Etc />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
