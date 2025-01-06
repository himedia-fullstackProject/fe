import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
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
import Home from "./pages/post/Home";
import Detail from "./pages/post/Detail";
import Update from "./pages/post/Update";
import WritePost from "./pages/post/WritePost"; // 포스트 작성 컴포넌트
import MyPage from "./pages/user/MyPage";
import SignUp from "./pages/user/Signup";
import Login from "./components/Login";
import UserLikesPage from "./pages/user/UserLikesPage";
import UserPostLists from "./pages/user/UserPostLists";
import PostList from "./pages/post/PostList"; // 포스트 목록 컴포넌트
import SearchResult from "./pages/result/SearchResult";
import HashTagSearchResult from "./pages/result/HashTagSearchResult";
import CategoryPage from "./pages/post/category/CategoryPage"; // 카테고리 페이지
import SubCategoryPage from "./pages/post/category/SubCategoryPage"; // 서브 카테고리 페이지
import ThBox from "./components/ThBox";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="fashion&beauty" element={<FashionBeauty />}>
              <Route path="fashion" element={<Fashion />}></Route>
              <Route path="beauty" element={<Beauty />}></Route>
            </Route>
            <Route path="f&b" element={<FB />}>
              <Route path="recipe" element={<Recipe />}></Route>
              <Route path="hotplace" element={<HotPlace />}></Route>
            </Route>
            <Route path="health" element={<Health />}></Route>
            <Route path="entertainment" element={<Entertainment />}>
              <Route path="love" element={<Love />}></Route>
              <Route path="travel" element={<Travel />}></Route>
              <Route path="etc" element={<Etc />}></Route>
            </Route>
            {/* 포스트 관련 라우트 추가 */}
            <Route path="posts" element={<PostList />} /> {/* 포스트 목록 */}
            <Route path="write" element={<WritePost />} /> {/* 포스트 작성 */}
            <Route path="detail/:id" element={<Detail />} /> {/* 포스트 세부정보 */}
            <Route path="update/:id" element={<Update />} /> {/* 포스트 업데이트 */}
            <Route path="mypage" element={<MyPage />}></Route>
            <Route path="userlikes" element={<UserLikesPage />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="userpostlists" element={<UserPostLists />}></Route>
            <Route path="signup" element={<SignUp />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="search/result" element={<SearchResult />} />
            <Route
              path="hashtag-search-result"
              element={<HashTagSearchResult />}
              
            />
            <Route path="category/:categoryId" element={<CategoryPage />} /> {/* 카테고리 페이지 */}
            <Route path="category/:categoryId/:subCategoryId" element={<SubCategoryPage />} /> {/* 서브 카테고리 페이지 */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
