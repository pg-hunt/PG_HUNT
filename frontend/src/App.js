import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBarComponent from "./components/NavBarComponent";
import PageNotFound from "./screens/PageNotFound";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import RequireAuth from "./utils/RequireAuth";
import MyProfileScreen from "./screens/MyProfileScreen";
import RequireHost from "./utils/RequireHost";
import CreatePostScreen from "./screens/CreatePostScreen";
import MyPostsScreen from "./screens/MyPostsScreen";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBarComponent />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route element={<RequireAuth />}>
            <Route path="/favorites" element={<FavoritesScreen />} />
            <Route path="/profile" element={<MyProfileScreen />} />
            <Route element={<RequireHost />}>
              <Route path="/create" element={<CreatePostScreen />} />
              <Route path="/myPosts" element={<MyPostsScreen />} />
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
