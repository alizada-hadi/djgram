import Header from "./components/Header";
import ImageList from "./components/ImageList";
import styled from "styled-components";
import Modal from "./components/Modal";
import { useSelector } from "react-redux";
import Register from "./components/Register";
import Login from "./components/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  const { selectedImage } = useSelector((state) => state.gallery);
  return (
    <Wrapper className="App">
      <Router>
        <Header />
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" exact element={<ImageList />} />
            <Route path="/profile" exact element={<Profile />} />
          </Route>
          <Route path="/signup" exact element={<Register />} />
          <Route path="/signin" element={<Login />} />
        </Routes>
      </Router>
      {selectedImage && <Modal />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

export default App;
