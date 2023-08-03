import styled from '@emotion/styled';
import { useRef } from 'react';
import useStore from '../../store/store';

const FormBoxStyled = styled.form`
  margin-top: 2rem;
  border-radius: 1rem;
  margin-inline: 2.75rem;
  z-index: 10000;
  position: relative;
  @media only screen and (max-width: 768px) {
    margin-top: 3rem;
  }
`;
const SearchBoxStyled = styled.input`
  width: 100%;
  border: none;
  padding: 1rem;
  font-family: inherit;
  border-radius: 1rem;
  padding-right: 5rem;
  text-indent: 2.5rem;
  box-shadow: var(--box-shadow--search-box);
  backdrop-filter: blur(100px);
  :focus {
    outline: none;
    background-color: #ffffff;
    border: 2px solid inset transparent;
  }
  :focus::placeholder {
    opacity: 0;
  }
  :invalid {
    background-color: rgba(255, 255, 255, 0.2);
  }
  :valid {
    backdrop-filter: blur(100px);
    background-color: rgba(255, 255, 255, 0.75);
  }
`;
const ButtonStyled = styled.button`
  position: absolute;
  right: 0rem;
  background-color: rgba(255, 255, 255, 0.2);
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  aspect-ratio: 1;
  font-size: 1.85rem;
  top: 50%;
  right: 0.25rem;
  transform: translate(0, -50%);
  border: none;
  height: 90%;
  border-radius: 10.5rem;
  cursor: pointer;
  transition: all 0.3s ease-out;
  :hover {
    background-color: #e4e4e4;
  }
  :active {
    background-color: #fefefe;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 50%;
    position: relative;
    top: 0;
    left: 0;
  }
`;

function SearchBox() {
  const addMarkerByCityName = useStore((state) => state.addMarkerByCityName);
  const searchBoxRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchBoxRef.current.value);
    searchBoxRef.current.blur();
    addMarkerByCityName(searchBoxRef.current.value);
    searchBoxRef.current.value = '';
  };
  return (
    <FormBoxStyled onSubmit={handleSubmit}>
      <SearchBoxStyled
        type="text"
        placeholder="Search by city name"
        ref={searchBoxRef}
        required
      />
      <ButtonStyled type="button" onClick={handleSubmit}>
        <img src="/search-icon.svg"></img>
      </ButtonStyled>
    </FormBoxStyled>
  );
}

export default SearchBox;
