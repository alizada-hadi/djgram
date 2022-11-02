import React, { useEffect } from "react";
import { motion } from "framer-motion";
import UploadForm from "./UploadForm";
import {
  selectAllImages,
  fetchImages,
  selectImage,
} from "../features/gallery/gallerySlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

function ImageList() {
  const dispatch = useDispatch();
  const { images, progress, selectedImage } = useSelector(
    (state) => state.gallery
  );
  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch, progress]);
  const onSelectImage = (e) => {
    dispatch(selectImage(e));
  };
  return (
    <>
      <UploadForm />
      <ImageGrid>
        {images.map((image) => {
          return (
            <motion.div
              layout
              whileHover={{ opacity: 1 }}
              key={image.id}
              onClick={() => onSelectImage(image.url)}
              className="img-wrap"
            >
              <motion.img
                src={`http://localhost:8000${image.url}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              />
            </motion.div>
          );
        })}
      </ImageGrid>
    </>
  );
}

const ImageGrid = styled.div`
  margin: 20px auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 40px;

  .img-wrap {
    overflow: hidden;
    height: 0;
    padding: 50% 0;
    /* padding controls height, will always be perfectly square regardless of width */
    position: relative;
    opacity: 0.8;

    img {
      min-width: 100%;
      min-height: 100%;
      max-width: 150%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
`;

export default ImageList;
