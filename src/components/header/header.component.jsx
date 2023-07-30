import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const HeaderStyled = styled(motion.div)`
  margin-bottom: 2rem;
  margin-top: 1.25rem;
  text-align: center;
  img {
    position: relative;
    top: 0;
    display: inline-block;
    height: 2.5rem;
  }

  h1 {
    color: var(--color--container--header--title);
    font-size: 2.5rem;
    font-family: Montserrat;
    font-weight: 900;
    display: inline-block;
    margin-left: 1rem;
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
      <img src="logo.png" />
      <motion.h1
        whileHover={{
          letterSpacing: '.1rem',
          color: 'var(--color--container--header--title-hover)',
          paddingLeft: '50%',
        }}
        transition={{ duration: 0.25 }}
      >
        windify
      </motion.h1>
    </HeaderStyled>
  );
}

export default Header;
