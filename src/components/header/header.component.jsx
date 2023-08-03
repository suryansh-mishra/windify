import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const HeaderStyled = styled(motion.div)`
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
  }

  h1 {
    color: var(--color--container--header--title);
    color: #282828 !important;
    font-size: 2.5rem;

    font-family: Poppins, Helvetica, sans-serif;
    font-weight: 300;
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
      <motion.img
        whileHover={{
          rotateZ: '90deg',
          marginBottom: '2rem',
          marginTop: '-.25rem',
        }}
        transition={{
          type: 'ease-out',
          rotateZ: {
            duration: 0.125,
          },
          marginBottom: {
            delay: 0.15,
            duration: 0.25,
          },
          marginTop: {
            delay: 0.15,
            duration: 0.25,
          },
        }}
        src="wind_logo.png"
        alt="Logo"
      />
      <motion.h1
        initial={{
          letterSpacing: '.075rem',
        }}
        whileHover={{
          letterSpacing: '.65rem',
          color: 'var(--color--container--header--title-hover)',
        }}
        transition={{ duration: 0.25 }}
      >
        windify
      </motion.h1>
    </HeaderStyled>
  );
}

export default Header;
