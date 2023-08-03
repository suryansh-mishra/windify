import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

const SmallText = styled.span`
  padding: 1rem 0 1.5rem 0;
  font-size: 1rem;
  color: grey;
`;

const Button = styled.button`
  margin: 1.5rem 0;
  font-family: Monteserrat, Arial, Helvetica, sans-serif;
  background-color: var(--color--modal--button);
  font-weight: 500;
  padding: 1rem 2rem;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  font-size: medium;
  border-radius: 5rem;
  outline: var(--color--modal--button--outline);
  border: none;
  transition: all 0.2s ease-out;
  &:hover {
    background-color: var(--color--modal--button-hover);
    outline: var(--color--modal--button--outline-hover);
  }
`;

const ModalContainer = styled.div`
  position: relative;
  color: black;
  max-width: 35%;
  font-family: Poppins, Arial, Helvetica, sans-serif;
  background-color: var(--color--modal);
  font-size: 1.35rem;
  font-weight: 500;
  padding: 3rem;
  display: flex;
  text-align: justify;
  flex-direction: column;
  align-items: center;
  box-shadow: var(--box--shadow);
  z-index: 100;
  transition: all 0.3s ease-out;
  border-radius: 1.5rem;
  h2 {
    font-weight: 300;
    font-size: 2.25rem;
    padding-bottom: 2rem;
    padding-top: 0.5rem;
  }
  @media only screen and (max-width: 768px) {
    left: 0;
    top: 0;
    transform: translate(0, 0);
    max-width: 80%;
  }
  @media screen and (max-width: 500px) {
    max-width: 90%;
  }
`;

const ModalWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: grid;
  place-items: center;
`;

function Modal({ clickHandler }) {
  const modalRef = useRef(null);
  useEffect(() => {
    modalRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return () => {};
  });
  return (
    <ModalWrapper>
      <ModalContainer ref={modalRef}>
        <h2>Welcome To Windify</h2>
        <p>
          App uses location permissions, to find your current location and
          generate appropriate Weather Information. <br />
          <br />
          You can click on any place in the map canvas to know it&apos;s
          location and Weather Information, a marker is formed as a result of
          the click. Cards on the left pane of screen show Weather Information.
          You can drag and position the marker, to location of choice, the
          Weather card updates automatically!
        </p>
        <Button onClick={clickHandler}>Let&apos;s Go →</Button>
        <SmallText data-item="author" data-value="Suryansh Mishra">
          This Project Is Made By Suryansh Mishra
        </SmallText>
      </ModalContainer>
    </ModalWrapper>
  );
}

export default Modal;
