import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBarComponent from "./components/NavBarComponent";
import PageNotFound from "./screens/PageNotFound";
import LandingScreen from "./screens/LandingScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBarComponent />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/landing" element={<LandingScreen />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
