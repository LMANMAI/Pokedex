import styled from "@emotion/styled";

export const PokedexContainer = styled.div`
  width: 90vw;
  margin: 0px auto;
  @media (min-width: 768px) {
    & {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
      grid-gap: 0.8rem;
    }
  }
`;
export const PokemonItem = styled.div`
  cursor: pointer;
  display: flex;
  border-radius: 15px;
  margin-top: 1rem;
  position: relative;
  box-shadow: 0 3px 6px rgba(154, 160, 185, 0.5),
    0 15px 40px rgba(166, 173, 201, 0.23);
  background-color: ${(props) => props.background};
  transition: all 300ms;
  overflow: hidden;
  position: relative;

  &:hover {
    transform: scale(1.03);
  }
  @media (min-width: 768px) {
    & {
      height: 150px;
    }
  }
`;
export const PokemonImg = styled.img`
  z-index: 1;
  width: fit-content;
  max-width: 75px;
  padding: 5px;
  @media (min-width: 768px) {
    & {
      height: fit-content;
      align-self: center;
    }
  }
`;
export const PokemonNumber = styled.div`
  position: absolute;
  right: 25px;
  bottom: 10px;
  color: white;
  font-style: italic;
  font-size: 3rem;
  font-weight: 700;
  opacity: 0.5;
`;
export const PokemonName = styled.h4`
  z-index: 2;
  color: white;
  font-size: 2rem;
  text-transform: capitalize;
  margin: 5px 0;
  @media (min-width: 768px) {
    & {
      font-size: 1.2rem;
      justify-self: start;
    }
  }
`;
export const PokemonType = styled.div`
  margin: 3px;
  padding: 5px;
  border-radius: 10px;
  font-size: 13px;
  background-color: ${(props) => props.background};
  border: 1px solid #f4f4f4;
  color: white;
  p {
    text-transform: capitalize;
  }
`;
export const TypeContainer = styled.div`
  display: flex;
`;
