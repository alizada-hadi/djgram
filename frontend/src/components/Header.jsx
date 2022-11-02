import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../features/users/usersSlice";
import { useDispatch } from "react-redux";
function Header() {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <Wrapper>
      <Nav>
        <ul>
          <li>
            <Link to={"/"}>DjGram</Link>
          </li>
        </ul>
        {user ? (
          <ul className="auth">
            <li>
              <Link to={"/profile"}>Profile</Link>
            </li>
            <li onClick={logoutHandler}>Logout</li>
          </ul>
        ) : (
          <ul className="auth">
            <li>
              <Link to={"/signup"}>Register</Link>
            </li>
            <li>
              <Link to={"/signin"}>Login</Link>
            </li>
          </ul>
        )}
      </Nav>

      <h2>Create your own gallery of images</h2>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  h2 {
    margin-top: 2rem;
    text-align: center;
    font-weight: normal;
    font-size: 2.3rem;
  }
`;
const Nav = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  ul li a {
    color: #222;
    text-decoration: none;
  }
  .auth li {
    margin: 0rem 1rem;
  }
  .auth li a {
    color: #222;
    text-decoration: none;
  }
  ul li {
    list-style: none;
    font-size: 2rem;
    font-family: "Dancing Script", cursive;
  }
`;
export default Header;
