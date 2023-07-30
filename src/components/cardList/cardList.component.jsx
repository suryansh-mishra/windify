import styled from '@emotion/styled';
import Card from '../card/card.component';
import useStore from '../../store/store';
import { AnimatePresence, motion } from 'framer-motion';

const CardListStyled = styled(motion.div)`
  display: flex;
  flex-grow: 10;
  flex-flow: column;
  flex-direction: column;
  flex-basis: 1;
  gap: 1.5rem;
  position: relative;
  padding-block: 1.5rem;
  padding-bottom: 10rem;
  padding-inline: 2.5rem;
  overflow-y: auto;
  height: 100vh;

  @media screen and (max-width: 700px) {
    flex-flow: row;
    align-items: stretch;
    height: 100%;
    overflow-y: hidden;
    overflow-x: auto;
    padding-bottom: 2rem;
    padding-inline: 2rem;
    margin-bottom: 2rem;
  }
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    width: 1rem;
  }

  ::-webkit-scrollbar-track {
    border-radius: 2rem;
    box-shadow: -4px 0 20px 1px rgba(0, 0, 0, 0.1);
    background: #2121213c;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    border-radius: 2rem;
    /* height: 2rem; */
    background: #f6f6f6;
  }
`;

const PlaceholderText = styled.div`
  font-size: 2.75rem;
  display: grid;
  place-items: center;
  height: 100%;
  width: 100%;
  color: #414141;
  padding: 0 4rem;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
  text-align: center;
`;

function CardList() {
  const cardsCollection = useStore((state) => state.cardsCollection);
  // console.log(cardsCollection);
  const listToRender =
    cardsCollection.length > 0 ? cardsCollection.slice(0).reverse() : [];
  return (
    <CardListStyled>
      {cardsCollection.length === 0 && (
        <PlaceholderText>
          <p>Ooops, looks like you&apos;ll need to tap on Map! 🍃</p>
        </PlaceholderText>
      )}

      <AnimatePresence>
        {cardsCollection.length > 0 &&
          listToRender.map((c) => <Card key={c.markerId} content={c} />)}
      </AnimatePresence>
    </CardListStyled>
  );
}

export default CardList;
