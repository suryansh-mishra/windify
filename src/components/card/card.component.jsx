import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import THEMES from './card.themes';
import useStore from '../../store/store';
import { easeIn, motion } from 'framer-motion';

const CardStyled = styled(motion.article)`
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
  animation: ${(props) => props.hasChanged ?? 'cardContentChanged 1s linear'};
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

  @keyframes cardContentChanged {
    0% {
      scale: 0.975;
      color: red;
      outline: 'solid .45rem orange';
      outline-offset: '.35rem';
    }
    100% {
      scale: 0.975;
      outline: 'solid .45rem orange';
      outline-offset: '.35rem';
    }
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
  font-weight: 100;
  transition: all 0.2s ease-out;
  :hover {
    opacity: 0.8;
  }
`;

function Card({ content, ...props }) {
  const cardRef = useRef(null);
  let hasChanged = false;
  const deleteCard = useStore((state) => state.deleteCard);
  useEffect(() => {
    console.log('Use effect ran');
    if (cardRef.current)
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    cardRef.current.focus();
  }, [cardRef, content]);
  // const [iconSource, setIconSource] = useState(content?.iconSource);
  const backgroundImage =
    THEMES[
      `${content.condition.toUpperCase()}_WEATHER${content.dark ? '_DARK' : ''}`
    ];
  const closeHandler = () => {
    deleteCard(content?.markerId);
  };
  console.log('Currently moving on with hasChanged value : ', hasChanged);
  const variants = {
    initial: {
      rotate: 0,
      scale: 0.75,
      opacity: 0,
      x: 0,
      y: -100,
      outline: 'solid transparent .35rem',
      outlineOffset: '.5rem',
    },
    animate: {
      rotate: 0,
      scale: 1,
      opacity: 1,
      y: 0,
      x: 0,
    },
    hover: {
      scale: 0.975,
      outline: 'solid .45rem orange',
      outlineOffset: '.35rem',
      boxShadow: 'none',
    },
    exit: {
      opacity: 0,
      y: -50,
      scale: 1,
      x: 0,
      rotate: 0,
    },
  };

  return (
    <CardStyled
      ref={cardRef}
      variants={variants}
      whileHover={'hover'}
      initial={'initial'}
      transition={{
        duration: 0.15,
        type: easeIn,
      }}
      hasChanged={hasChanged}
      animate={'animate'}
      exit={'exit'}
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
      <WeatherIconWrapperStyled key={`WeatherIconWrapper_${content.markerId}`}>
        <img
          src={content?.iconSource}
          alt={`${content.condition}`}
          key={`WeatherIcon_${content.markerId}`}
          className={`weather_image_${content.markerId}`}
        />
      </WeatherIconWrapperStyled>
    </CardStyled>
  );
}

export default Card;
