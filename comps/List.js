import React from 'react';
import styled from '@emotion/styled';
import { getTypeColor } from "../helper";
import { useRouter } from "next/router";

const PokedexContainer = styled.div`
  width: 90vw;
  margin: 10px auto;

  @media (min-width: 768px) {
    & {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
      grid-gap: 0.8rem;
    }
  }
`;
const PokemonItem = styled.div`
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
  /* .pkball {
    position: absolute;
    z-index: 0;
    width: 60%;
    filter: opacity(0.3);
    top: -45px;
    left: -110px;
  }*/
  :hover {
    transform: scale(1.03);
  }
  @media (min-width: 768px) {
    & {
      height: 150px;
    }
    /* .pkball {
      position: absolute;
      z-index: 0;
      width: 70%;
      opacity: 0.3;
      top: -10px;
      left: -70px;
    } */
  }
`;
const PokemonImg = styled.img`
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
const PokemonNumber = styled.div`
  position: absolute;
  right: 25px;
  bottom: 10px;
  color: white;
  font-style: italic;
  font-size: 3rem;
  font-weight: 700;
  opacity: 0.5;
`;
const PokemonName = styled.h4`
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
const PokemonType = styled.div`
  margin: 3px;
  padding: 5px;
  border-radius: 35px;
  background-color: ${(props) => props.background};
  //opacity: 0.5;
  border: 1px solid #f4f4f4;
  color: white;
  p {
    text-transform: capitalize;
  }
`;
const TypeContainer = styled.div`
  display: flex;
`;
const List = ({pokemons}) => {
    
  const router = useRouter();
    return (        
      <PokedexContainer>
      {React.Children.toArray(
        pokemons.map((pokemon) => (
          <PokemonItem
            onClick={() => router.push(`/pokemon/${pokemon.id}`)}
            background={() => getTypeColor(pokemon.types[0].type.name)}
          >
            <PokemonImg
              src={pokemon.sprites.other["official-artwork"].front_default}
            />
            <PokemonNumber># {pokemon.id}</PokemonNumber>
            <div>
              <PokemonName>{pokemon.name}</PokemonName>
              <TypeContainer>
                {React.Children.toArray(
                  pokemon.types.map((type) => (
                    <PokemonType
                      background={() => getTypeColor(type.type.name)}
                    >
                      <p>{type.type.name}</p>
                    </PokemonType>
                  ))
                )}
              </TypeContainer>
            </div>
          </PokemonItem>
        ))
      )}
    </PokedexContainer>
    )
}

export default List
