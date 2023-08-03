import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const HeaderStyled = styled(motion.header)`
  margin-bottom: 2rem;
  margin-top: 1.25rem;
  text-align: center;
  display: flex;
  flex-flow: column;
  position: relative;
  width: max-content;
  margin: 0 auto;
  user-select: none;

  img {
    position: relative;
    align-self: center;
    top: 0;
    height: 2.5rem;
    user-select: none;
    will-change: margin;
    transition: 0.25s margin, 0.125s transform;
    transition-delay: 0.15s margin;
    &:hover {
      margin-bottom: 2rem;
      margin-top: -0.25rem;
      transform: rotateZ(90deg);
    }
  }

  h1 {
    color: var(--color--container--header--title);
    color: #282828 !important;
    font-size: 2.5rem;
    font-family: Poppins, Helvetica, sans-serif;
    font-weight: 300;
    letter-spacing: 0.075rem;
    transition: 0.25s all ease-in-out;
    will-change: letter-spacing;
    &:hover {
      color: var(--color--container--header--title-hover);
      letter-spacing: 0.65rem;
    }
  }
`;
function Header() {
  return (
    <HeaderStyled
      initial={{}}
      transition={{
        duration: 0.5,
      }}
    >
      <motion.img src="wind_logo.png" alt="Logo" />
      <h1>windify</h1>
    </HeaderStyled>
  );
}

export default Header;
