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

import MyPage from "./pages/user/MyPage";
import SignUp from "./pages/user/Signup";
import UserLikesPage from "./pages/user/UserLikesPage";
import UserPostLists from "./pages/user/UserPostLists";
import SearchResult from "./pages/post/SearchResult";
import HashTagSearchResult from "./pages/result/HashTagSearchResult";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="detail/:id" element={<Detail />}></Route>
            <Route path="write" element={<WritePost />}></Route>
            <Route path="edit/:id" element={<Update />}></Route>
            <Route path="mypage" element={<MyPage />}></Route>
            <Route path="userlikes" element={<UserLikesPage />}></Route>
            <Route path="userpostlists" element={<UserPostLists />}></Route>
            <Route path="signup" element={<SignUp />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="search/result" element={<SearchResult />} />
            <Route path="search/tag" element={<HashTagSearchResult />} />
            <Route path="/category/4" element={<Entertainment />} />
            <Route path="/category/1" element={<FashionBeauty />} />
            <Route path="/category/3" element={<Health />} />
            <Route path="/category/2" element={<FB />} />
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
    </>
  );
}

export default App;
