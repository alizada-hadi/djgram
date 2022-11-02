import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { diselectImage } from "../features/gallery/gallerySlice";
import { motion } from "framer-motion";
function Modal() {
  const dispatch = useDispatch();
  const { selectedImage } = useSelector((state) => state.gallery);
  const deselectImageHandler = (e) => {
    if (e.target.classList.contains("backdrop")) {
      dispatch(diselectImage());
    }
  };
  return (
    <Wrapper className="backdrop" onClick={deselectImageHandler}>
      {selectedImage && (
        <motion.img
          src={`http://localhost:8000${selectedImage}`}
          alt=""
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);

  img {
    display: block;
    max-width: 60%;
    max-height: 80%;
    margin: 60px auto;
    box-shadow: 3px 5px 7px rgba(0, 0, 0, 0.5);
    border: 3px solid white;
  }
`;
export default Modal;
