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
  @media screen and (max-width: 768px) {
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
`;

function CardList() {
  const cardsCollection = useStore((state) => state.cardsCollection);
  const listToRender =
    cardsCollection.length > 0 ? cardsCollection.slice(0).reverse() : [];
  return (
    <CardListStyled
      initial={{ opacity: 1 }}
      exit={{
        transition: { duration: 0.15 },
      }}
    >
      <AnimatePresence>
        {listToRender.map((c) => (
          <Card key={c.markerId} content={c} />
        ))}
      </AnimatePresence>
    </CardListStyled>
  );
}

export default CardList;
