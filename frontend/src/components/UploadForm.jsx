import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import { uploadImage, reset } from "../features/gallery/gallerySlice";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "./ProgressBar";
function UploadForm() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const types = ["image/jpeg", "image/png", "image/jpg"];

  const { progress } = useSelector((state) => state.gallery);
  const changeHandler = (e) => {
    const selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      dispatch(uploadImage({ image: selected }));
      dispatch(reset());
      setError("");
    } else {
      setError(
        "Please select a correct type of file only (jpg, png, and jpeg)"
      );
    }
  };

  return (
    <Form>
      <label>
        <input type="file" onChange={changeHandler} />
        <AiOutlinePlus />
      </label>
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
        <ProgressBar progress={progress} />
      </div>
    </Form>
  );
}

const Form = styled.form`
  margin: 30px auto 10px;
  text-align: center;

  label {
    display: block;
    width: 30px;
    height: 30px;
    border: 1px solid #222;
    border-radius: 50%;
    margin: 10px auto;
    line-height: 30px;
    color: #222;
    padding: 1rem;
    font-weight: bold;
    font-size: 30px;
    cursor: pointer;
    transition: all 0.5s ease-out;

    input {
      width: 0;
      height: 0;
      opacity: 0;
    }
  }

  label:hover {
    color: white;
    background-color: #222;
  }

  .error {
    color: red;
  }
`;

export default UploadForm;
