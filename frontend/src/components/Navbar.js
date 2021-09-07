import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  height: 50px;
  border-top: 3px solid ${({ theme }) => theme.colors.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 1264px;
  margin: 0 auto;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  
  a {
    font-size: 13px;
    color: #525960;
    
    &:hover {
      background: #e3e6e8;
      border-radius: 1000px;
      padding: 6px 12px;
      margin: -6px -12px;
    }
  }
`;

const SearchBar = styled.input`
  flex: 1;
  max-width: 600px;
  margin: 0 20px;
  padding: 8px 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 3px;
  font-size: 13px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary};
    box-shadow: 0 0 0 4px rgba(0, 119, 204, 0.15);
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <NavContainer>
        <Logo to="/">
          <span>Dev</span>Flow
        </Logo>
        <SearchBar placeholder="Search Questions..." />
        <NavLinks>
          <Link to="/">Questions</Link>
          <Link to="/tags">Tags</Link>
          <Link to="/users">Users</Link>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
