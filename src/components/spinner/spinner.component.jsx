import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const SpinnerStyled = styled(motion.div)`
  position: relative;
  height: 5rem;
  width: 5rem;
  @media only screen and (max-width: 768px) {
    margin-top: 10rem;
    height: 4rem;
    width: 4rem;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-image: linear-gradient(115deg, #ffb0ca, #ff3030);
    height: 100%;
    width: 100%;
    border-radius: 10rem;
    animation: animationAfter 0.4s alternate infinite;
  }
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-image: linear-gradient(
      115deg,
      rgba(255, 223, 234, 0.7),
      rgba(255, 183, 183, 0.797)
    );
    height: 100%;
    width: 100%;
    border-radius: 10rem;
    animation: animationBefore 0.4s alternate infinite;
  }
  @keyframes animationAfter {
    0% {
      transform: translate(-50%, -50%) scale(0.35);
    }
    100% {
      transform: translate(-50%, -50%) scale(0.6);
    }
  }
  @keyframes animationBefore {
    0% {
      transform: translate(-50%, -50%) scale(0.85);
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

const Spinner = () => {
  return <SpinnerStyled />;
};

export default Spinner;
