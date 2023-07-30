import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import THEMES from './card.themes';
import useStore from '../../store/store';

const CardStyled = styled.div`
  color: var(--color--card--text);
  font-size: 1.5rem;
  font-family: Raleway;
  line-height: 2.25rem;
  font-weight: 500;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  height: auto;
  align-items: flex-start;
  position: relative;
  opacity: 1;
  background-color: var(--color--card--natural);
  background-image: ${(props) => props.bgImage ?? props.bgImage};
  border-radius: 1.5rem;
  box-shadow: var(--box--shadow--card);

  @media only screen and (max-width: 700px) {
    min-width: 35rem;
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
`;

function Card({ content }) {
  const cardRef = useRef(null);
  const deleteCard = useStore((state) => state.deleteCard);
  useEffect(() => {
    if (cardRef.current) cardRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [cardRef, content]);

  const backgroundImage = THEMES[`${content.condition.toUpperCase()}_WEATHER`];

  const closeHandler = () => {
    deleteCard(content?.markerId);
  };

  return (
    <CardStyled ref={cardRef} bgImage={backgroundImage}>
      <h3>{content.condition}</h3>
      <CloseButtonStyled onClick={closeHandler}>&#10006; </CloseButtonStyled>
      <p className={`location_${content.markerId}`}>
        Location : {content?.location}
      </p>
      <p className={`temperature_${content.markerId}`}>
        Temperature : {content?.temperature}
      </p>
      <p className={`air_${content.markerId}`}>
        Air Quality : {content?.airQualitativeName} ({content?.airQualityIndex})
      </p>
      <p className={`humidity_${content.markerId}`}>
        Humidity : {content?.humidity} 💧
      </p>
      <p className={`wind_${content.markerId}`}>
        Wind Speed : {content?.windSpeed} at {content?.windDegrees}° 💨
      </p>
      <WeatherIconWrapperStyled>
        <img src={content?.iconSource} className="weather-img" />
      </WeatherIconWrapperStyled>
    </CardStyled>
  );
}

export default Card;
