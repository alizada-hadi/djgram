import { uploadImage } from "../features/gallery/gallerySlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useUpload = (file) => {
  const { error, status, images } = useSelector((state) => state.gallery);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(uploadImage(file));
  }, [file]);

  return { images, status };
};
