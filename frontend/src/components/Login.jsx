import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AiOutlineLock } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { login } from "../features/users/usersSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(formData));
    navigate("/");
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Wrapper>
      <form onSubmit={submitHandler}>
        <h2>Login</h2>
        <div>
          <label htmlFor="">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} />
          <HiOutlineMail />
        </div>

        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
          <AiOutlineLock />
        </div>

        <button>Sign In</button>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;

  form {
    border: 2px solid #222;
    padding: 3rem;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    div {
      display: flex;
      flex-direction: column;
      position: relative;
      gap: 0.4rem;
      label {
        font-size: 1.2rem;
        font-weight: 500;
      }
      input {
        width: 25rem;
        height: 2.5rem;
        border: 1px solid #222;
        border-radius: 0.3rem;
        padding: 0rem 0rem 0rem 2rem;
        font-size: 1.4rem;
        color: #271e1e;
      }
      svg {
        position: absolute;
        top: 2.4rem;
        left: 0.5rem;
        font-size: 1.4rem;
      }
    }

    button {
      width: 8rem;
      height: 2.5rem;
      background-color: #000;
      color: #fff;
      border: none;
      cursor: pointer;
      font-size: 1.2rem;
      border-radius: 0.4rem;
      transition: all 0.5s;
    }

    button:hover {
      background: #fff;
      color: #000;
      border: 2px solid #000;
    }
  }
`;

export default Login;
