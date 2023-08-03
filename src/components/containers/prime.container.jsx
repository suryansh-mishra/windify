import styled from '@emotion/styled';

const PrimeContainer = styled.main`
  display: flex;
  flex-flow: column;
  position: relative;
  padding-top: 2rem;
  flex-basis: 0;
  flex-grow: 1;
  z-index: 5;
  border-bottom-right-radius: var(--border-radius-soft-corner);
  border-top-right-radius: var(--border-radius-soft-corner);
  /* background-image: var(--color--container--prime); */
  background-image: url('/public/bg1.jpg');
  box-shadow: var(--box--shadow);
  background-size: 40px 40px;
  background-image: linear-gradient(
      to right,
      rgba(200, 200, 200, 0.3) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, rgba(200, 200, 200, 0.3) 1px, #fff 1px);

  @media only screen and (max-width: 700px) {
    border-radius: 0;
    background: transparent;
    padding-inline: 1rem;
    box-shadow: none;
  }
  ::after {
    content: '';
    position: absolute;
    width: 75%;
    z-index: -10;
    top: 0;
    aspect-ratio: 2/1;

    background-image: linear-gradient(
      135deg,
      rgb(45, 255, 215) 0%,
      rgba(225, 255, 243, 0.9) 74%
    );
    border-radius: 0 0 50rem 50rem;
  }

  ::before {
    content: '';
    position: absolute;
    width: 50%;
    z-index: -1;
    top: 0;
    transform: translateX(-40%);
    aspect-ratio: 2/1.05;
    background-image: linear-gradient(
      135deg,
      rgb(105, 255, 208) 0%,
      rgba(37, 255, 215, 0.608) 74%
    );
    /* background: linear-gradient(45deg, #d0ffd2 0%, #fee5f7 74%); */

    border-radius: 0rem 0rem 50rem 50rem;
  }
  > * {
    z-index: 10;
  }
`;

export default PrimeContainer;
