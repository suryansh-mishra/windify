import styled from '@emotion/styled';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import THEMES from './card.themes';
import useStore from '../../store/store';
import { motion } from 'framer-motion';

const CardStyled = styled(motion.div)`
  color: var(--color--card--text);
  font-size: 1.5rem;
  font-family: Poppins, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 2.25rem;
  font-weight: 400;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  height: auto;
  align-items: flex-start;
  position: relative;
  opacity: 1;
  background-color: var(--color--card--natural);

  background-image: ${(props) => props.bgImage ?? props.bgImage};
  cursor: pointer;
  border-radius: 1.5rem;
  box-shadow: var(--box--shadow--card);
  h1 {
    font-weight: 300;
    font-size: 3.25rem;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }
  h1,
  p {
    max-width: 70%;
  }
  @media only screen and (max-width: 700px) {
    min-width: 30rem;
  }
`;
const WeatherIconWrapperStyled = styled.div`
  position: absolute;
  border-top-left-radius: 7rem;
  border-bottom-right-radius: 1.5rem;
  background-color: rgba(255, 255, 255, 0.3);
  bottom: 0rem;
  right: 0rem;
  height: 7rem;
  width: 7rem;
  overflow: hidden;
  // ICON THEMING :
  img {
    box-sizing: content-box;
    position: relative;
    opacity: 1;
    outline: rgba(255, 255, 255, 0.4) solid 1rem;
    background-color: rgb(255, 255, 255, 60%);
    border-radius: 10rem 6rem;
    border-bottom-right-radius: 1.5rem;
    top: 2rem;
    left: 2rem;
    height: 5rem;
    width: 5rem;
  }
  img,
  svg {
    width: '1rem';
    shape-rendering: optimizeSpeed;
  }
`;
const CloseButtonStyled = styled.button`
  border: 0;
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 1rem;
  margin-top: 1rem;
  padding: 0 0.4rem;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease-out;
  :hover {
    opacity: 0.8;
  }
`;

function Card({ content, ...props }) {
  const cardRef = useRef(null);
  const deleteCard = useStore((state) => state.deleteCard);
  useEffect(() => {
    if (cardRef.current)
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [cardRef, content]);
  // const [iconSource, setIconSource] = useState(content?.iconSource);
  const backgroundImage =
    THEMES[
      `${content.condition.toUpperCase()}_WEATHER${content.dark ? '_DARK' : ''}`
    ];
  const closeHandler = () => {
    deleteCard(content?.markerId);
  };

  return (
    <CardStyled
      ref={cardRef}
      whileHover={{
        scale: 0.975,
        outline: 'solid .45rem orange',
        outlineOffset: '.35rem',
        boxShadow: 'none',
      }}
      initial={{
        opacity: 0,
        y: -100,
        scale: 0.75,
        outline: 'solid transparent .35rem',
        outlineOffset: '.5rem',
      }}
      transition={{
        duration: 0.2,
        delay: 0.075,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      exit={{ opacity: 0, y: 5 }}
      bgImage={backgroundImage}
      {...props}
    >
      <h1 className={`temperature_${content.markerId}`}>
        {content?.temperature}
      </h1>
      <CloseButtonStyled onClick={closeHandler}>&#10006; </CloseButtonStyled>
      <p className={`condition_${content.markerId}`}>{content.condition}</p>
      <p className={`location_${content.markerId}`}>{content?.location} </p>
      <p className={`air_${content.markerId}`}>
        Air Quality is {content?.airQualitativeName} ({content?.airQualityIndex}
        )
      </p>
      <p className={`humidity_${content.markerId}`}>
        Humidity of {content?.humidity} 💧
      </p>
      <p className={`wind_${content.markerId}`}>
        Winds blowing at {content?.windSpeed} m/s at {content?.windDegrees}° 💨
      </p>
      {/* <img
        src={iconSource}
        key={`WeatherIcon_${content.markerId}`}
        className={`weather_image_${content.markerId}`}
      /> */}
      <WeatherIconWrapperStyled key={`WeatherIconWrapper_${content.markerId}`}>
        <img
          src={content?.iconSource}
          key={`WeatherIcon_${content.markerId}`}
          className={`weather_image_${content.markerId}`}
        />
      </WeatherIconWrapperStyled>{' '}
    </CardStyled>
  );
}

export default Card;
