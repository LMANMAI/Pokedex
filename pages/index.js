import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { getTypeColor } from "../helper";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

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
  background-color: ${(props)=> props.background};
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
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
  //border: 1px solid red;
`;
const Button = styled.button`
  border: none;
  padding: 5px;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: #e9463f;
  color: white;
  outline: none;
  cursor: pointer;
:first-child{
  margin-right: 1rem;
}
`;

const index = ({ pokemons }) => {
  //states del paginador
  const [ paginador, setPaginador ] = useState(1);
  const [ nextPage, setnextPage ] = useState(0);
  const [ prevPage, setPrevPage ] = useState(20);
  const offset = 20;

  useEffect(() => {
    //if(prevPage === 0) return;
    setnextPage(Math.max(offset * paginador));
    setPrevPage(Math.min(nextPage - offset)); 
    console.log(offset)
    console.log()
  }, [paginador]);

  const router = useRouter();
  return (
    <div>
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
                    <PokemonType background={() => getTypeColor(type.type.name)}>
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
    <ButtonContainer>
    {paginador === 1 ?null :(
       <Button
       onClick={() => {
         setPaginador(paginador - 1)
         router.push({ pathname: "/", query: { page: prevPage } });            
       }}
     >
      <FaArrowLeft />
     </Button>
    )}

     <Button
       onClick={() => {
         setPaginador(paginador + 1)
         router.push({ pathname: "/", query: { page: nextPage } });
       }}
     >
       <FaArrowRight />
     </Button>
   </ButtonContainer>
   </div>
  );
};
export async function getServerSideProps({ query }) {
  console.log(query.page);

  const pokemonsList = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=${query.page}`
  );
  const pokemonsJSON = await pokemonsList.json();
  const pokemonsData = await Promise.all(
    pokemonsJSON.results.map(async ({ url }) => {
      const data = await fetch(url);
      const dataJSON = await data.json();
      return dataJSON;
    })
  );

  return {
    props: {
      pokemons: pokemonsData,
    }, // will be passed to the page component as props
  };
}
export default index;
