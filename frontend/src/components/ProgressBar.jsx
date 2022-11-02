import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { resetProgress } from "../features/gallery/gallerySlice";
import { useDispatch } from "react-redux";
function ProgressBar({ progress }) {
  const dispatch = useDispatch();
  setTimeout(() => {
    dispatch(resetProgress());
  }, 2000);
  return (
    <Wrapper>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: progress + "%" }}
      ></motion.div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  div {
    height: 5px;
    background: yellowgreen;
    margin-top: 20px;
  }
`;

export default ProgressBar;
