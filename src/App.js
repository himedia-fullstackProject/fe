import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/post/Home";
import FashionBeauty from "./pages/post/category/fashionbeauty/FashionBeauty";
import Fashion from "./pages/post/category/fashionbeauty/subcategory/Fashion";
import Beauty from "./pages/post/category/fashionbeauty/subcategory/Beauty";
import FB from "./pages/post/category/fb/FB";
import Recipe from "./pages/post/category/fb/subcategory/Recipe";
import HotPlace from "./pages/post/category/fb/subcategory/HotPlace";
import Health from "./pages/post/category/health/Health";
import Entertainment from "./pages/post/category/entertainment/Entertainment";
import Love from "./pages/post/category/entertainment/subcategory/Love";
import Travel from "./pages/post/category/entertainment/subcategory/Travel";
import Etc from "./pages/post/category/entertainment/subcategory/Etc";
import WritePost from "./pages/post/WritePost";
import SignUp from "./pages/user/Signup";
import Login from "./components/Login";

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
            <Route path="writepost" element={<WritePost />}></Route>
            <Route path="signup" element={<SignUp />}></Route>
            <Route path="login" element={<Login />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
