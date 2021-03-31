import React, { useEffect, useState }  from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Container = styled.div`
 // border: 1px solid red;
  font-family: Helvetica, sans-serif;
`;
const ButtonContainer = styled.div`
  width: 50vw;
  margin: 0 auto;
  padding: 5px;
  display: flex;
  justify-content: center;
  button{
    width: 30px;
    height: 30px;
    border-radius: 100%;
    border: none;
    outline: none;
    margin: 1px 2px;
    cursor: pointer;
    color: white;
    background: #e9463f;
  }
`;
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
  .pkball {
    position: absolute;
    z-index: 0;
    width: 60%;
    filter: opacity(0.3);
    top: -45px;
    left: -110px;
  }
  :hover {
    transform: scale(1.03);
  }
  @media (min-width: 768px) {
    & {
      height: 150px;
    }
    .pkball {
      position: absolute;
      z-index: 0;
      width: 70%;
      opacity: 0.3;
      top: -10px;
      left: -70px;
    }
  }
`;
const PokemonImage = styled.img`
  z-index: 1;
  width: fit-content;
  max-width: 90px;
  padding: 5px;
  @media (min-width: 768px) {
    & {
      height: fit-content;
      align-self: center;
    }
  }
`;
const PokemonNumber = styled.h3`
  position: absolute;
  right: 25px;
  bottom: 10px;
  color: white;
  font-style: italic;
  font-size: 3rem;
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
const PokemonTypes = styled.div`
  display: flex;
`;
const PokemonType = styled.div`
  margin: 3px;
  padding: 5px;
  border-radius: 35px;
  background-color: #fff;
  opacity: 0.5;
  p {
    text-transform: capitalize;
  }
`;
const HomePage = ({ pokemons }) => {
    // const [ offset, setOffset ] = useState(1);
    // const [ nextPage, setnextPage ] = useState();
    // const [ prevPage, setPrevPage ] = useState();
    // const paginador = 30;
  
    // useEffect(() => {
    //   setnextPage(paginador * offset);
    //   setPrevPage(nextPage - paginador); 
  
    // }, [offset]);
    const getTypeColor = (type) => {
        switch (type) {
          case "fire":
            return "#fba14d";
          case "water":
            return "#0875c8";
          case "normal":
            return "#9f9fa0";
          case "grass":
            return "#5cbf6c";
          case "electric":
            return "#f6de61";
          case "ice":
            return "#81d6ca";
          case "ground":
            return "#d97d4d";
          case "flying":
            return "#97acdf";
          case "ghost":
            return "#6c70c9";
          case "rock":
            return "#cec08d";
          case "fighting":
            return "#e04551";
          case "poison":
            return "#bc66d1";
          case "psychic":
            return "#fb9088";
          case "bug":
            return "#a6c53f";
          case "dark":
            return "#676971";
          case "steel":
            return "#5595a5";
          case "dragon":
            return "#0875c8";
          case "fairy":
            return "#f09ce6";
        }
      };
      const router = useRouter();
  return (
    <Container>     
      <PokedexContainer>
      {React.Children.toArray(
        pokemons.map((pokemon) => (
          <Link href={`/pokemon/${pokemon.id}`}>
            <PokemonItem
              onClick={() => {
                console.log(pokemon.id);
                router.push(`/pokemon/${pokemon.id}`);
              }}
              background={() => getTypeColor(pokemon.types[0].type.name)}
            >
              <img
                className="pkball"
                src="/images/pokeball-bg.png"
                alt="pokeball"
              />
              <PokemonImage
                src={pokemon.sprites.other["official-artwork"].front_default}
              />
              <PokemonNumber># {pokemon.id}</PokemonNumber>
              <div>
                <PokemonName>{pokemon.name}</PokemonName>
                <PokemonTypes>
                  {React.Children.toArray(
                    pokemon.types.map((type) => (
                      <PokemonType>
                        <p>{type.type.name}</p>
                      </PokemonType>
                    ))
                  )}
                </PokemonTypes>
              </div>
            </PokemonItem>
          </Link>
        ))
      )}
    </PokedexContainer>
    {/* <ButtonContainer>
        {offset === 1 ? null : (
          <Link href={{ pathname: "/", query: { query: prevPage } }}>
            <button onClick={() => setPrevPage(offset - 1)}>
              <IoIosArrowBack />
            </button>
          </Link>
        )}
        <Link href={{ pathname: "/", query: { query: nextPage } }}>
          <button onClick={() => setOffset(offset + 1)}>
            <IoIosArrowForward />
          </button>
        </Link>
      </ButtonContainer> */}
    </Container>
  );
};
export async function getServerSideProps(context) {
  // let offset;
  // if(query.query === undefined || isNaN(query.query)) {
  //   offset = 0;
  // }else
  const pokemonList = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=0&limit=50`
  );
  const pokemonJSON = await pokemonList.json();
  const pokemonData = await Promise.all(
      pokemonJSON.results.map(async ({url}) =>{
          const data = await fetch(url);
          const dataJSON = await data.json();
          return await dataJSON;
      })
  )
  //console.log(pokemonData);
  return {
    props: {
      pokemons: pokemonData,
    }, // will be passed to the page component as props
  };
}
export default HomePage;
