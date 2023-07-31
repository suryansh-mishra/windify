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
  padding-block: 2.5rem;
  margin-top: 2.75rem;
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
    background: #f1f1f1;
  }
`;

function CardList() {
  const cardsCollection = useStore((state) => state.cardsCollection);
  const listToRender =
    cardsCollection.length > 0 ? cardsCollection.slice(0).reverse() : [];
  return (
    <AnimatePresence>
      {cardsCollection.length > 0 && (
        <CardListStyled>
          {/* {cardsCollection.length === 0 && (
          <PlaceholderText
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            exit={{
              opacity: 0,
              transition: {
                delay: 0,
              },
            }}
          >
            <p>Ooops, looks like you&apos;ll need to tap on Map! 🍃</p>
          </PlaceholderText>
        )} */}

          <AnimatePresence>
            {listToRender.map((c) => (
              <Card key={c.markerId} content={c} />
            ))}
          </AnimatePresence>
        </CardListStyled>
      )}
    </AnimatePresence>
  );
}

export default CardList;
