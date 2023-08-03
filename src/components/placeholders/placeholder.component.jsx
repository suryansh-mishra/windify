import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const PlaceHolder = styled(motion.div)`
  font-size: 2.75rem;
  min-width: 100%;
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
  color: #414141;
  padding: 0rem 4rem;
  margin-top: -6rem;
  font-family: Poppins, Arial, Helvetica, sans-serif;
  font-weight: 600;
  text-align: center;
  @media screen and (max-width: 768px) {
    margin-top: 0;
    height: 100%;
    padding: 6rem 4rem;
  }
`;

export default PlaceHolder;
