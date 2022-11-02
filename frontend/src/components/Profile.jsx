import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { logout, updateProfile } from "../features/users/usersSlice";

function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const [formData, setFormData] = useState({
    email: user ? user.email : "",
    username: user ? user.username : "",
    first_name: user.first_name ? user.first_name : "",
    last_name: user.last_name ? user.last_name : "",
    phone: user.phone ? user.phone : "",
    photo: user.photo ? user.photo : "",
    address: user.address ? user.address : "",
  });
  const { email, username, first_name, last_name, phone, photo, address } =
    formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onUploadImage = (e) => {
    let newFormData = { ...formData };
    newFormData["photo"] = e.target.files[0];
    setFormData(newFormData);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
  };

  return (
    <Wrapper>
      <div>
        <form onSubmit={submitHandler}>
          <Row>
            <div>
              <label htmlFor="">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="">Username</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={onChange}
              />
            </div>
          </Row>
          <Row>
            <div>
              <label htmlFor="">First Name</label>
              <input
                type="text"
                name="first_name"
                value={first_name}
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={last_name}
                onChange={onChange}
              />
            </div>
          </Row>
          <Row>
            <div>
              <label htmlFor="">Phone</label>
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="">Photo</label>
              <input type="file" name="photo" onChange={onUploadImage} />
            </div>
          </Row>
          <Row>
            <div>
              <label htmlFor="">Address</label>
              <textarea
                name="address"
                value={address}
                onChange={onChange}
                id=""
                cols="30"
                rows="10"
              ></textarea>
            </div>
          </Row>

          <button type="submit">Save</button>
        </form>
      </div>
      <div>
        <img src={`http://localhost:8000${user.photo}`} alt="" />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    img {
      width: 10rem;
      height: 10rem;
    }
  }
  div {
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      button {
        width: 7rem;
        height: 3rem;
        background-color: #fff;
        border: 2px solid #dfdfdf;
        border-radius: 0.5rem;
        font-size: 1.2rem;
        cursor: pointer;
        transition: all 0.5s;
      }
      button:hover {
        background-color: #000;
        color: #fff;
        border: 2px solid #dfdfdf;
      }
    }
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  div {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    label {
      font-size: 1.4rem;
    }
    input {
      width: 20rem;
      height: 2.7rem;
      border-radius: 0.4rem;
      border: 1px solid #dfdfdf;
      font-size: 1.1rem;
      padding: 0.3rem;
    }
    input:focus {
      outline-width: 0;
    }

    textarea {
      width: 42rem;
      border: 1px solid #dfdfdf;
      border-radius: 0.4rem;
      font-size: 1.3rem;
      padding: 0.3rem;
    }
    textarea:focus {
      outline-width: 0;
    }
  }
`;

export default Profile;
