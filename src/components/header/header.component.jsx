import styled from '@emotion/styled';

const HeaderStyled = styled.div`
  margin-bottom: 2rem;
  text-align: center;
  img {
    position: relative;
    top: 0;
    display: inline-block;
    height: 2.5rem;
  }

  h1 {
    font-size: 2.5rem;
    display: inline-block;
    margin-left: 1rem;
  }
`;
function Header({ children }) {
  return <HeaderStyled>{children}</HeaderStyled>;
}

export default Header;
