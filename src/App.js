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
import WritePost from "./pages/post/WritePost";
import MyPage from "./pages/user/MyPage";
import SignUp from "./pages/user/Signup";
import Login from "./components/Login";
import UserLikesPage from "./pages/user/UserLikesPage";
import UserPostLists from "./pages/user/UserPostLists";

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
            <Route path="detail/:id" element={<Detail />}></Route>
            <Route path="write" element={<WritePost />}></Route>
            <Route path="update" element={<Update />}></Route>
            <Route path="mypage" element={<MyPage />}></Route>
            <Route path="userlikes" element={<UserLikesPage />}></Route>
            <Route path="userpostlists" element={<UserPostLists />}></Route>
            <Route path="signup" element={<SignUp />}></Route>
            <Route path="login" element={<Login />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
