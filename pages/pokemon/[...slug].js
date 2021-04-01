import React from "react";
import styled from '@emotion/styled';
import { useRouter } from "next/router";
import Head from 'next/head';
import { IoMdArrowRoundBack } from 'react-icons/io';

const Container = styled.div`
  height: 80vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
 
  /* position: absolute; */
  ::before {
    content: "";
    width: 1000px;
    height: 1000px;
    border-radius: 50%;
    background-color: ${(props) => props.background};
    position: relative;
    transform: translateY(-74%);
    z-index: 0;
  }
  @media (min-width: 768px) {
    ::before {
      width: 2000px;
      height: 2000px;   
    }
    // background-color:${(props) => props.background} ;
  }
`;
const PokemonSingleImage = styled.img`
  width: 65%;
  position: absolute;
  top: 90px;
  @media(min-width: 480px){
    width: 45%;
  }
  @media (min-width: 768px) {
    width: 40%;
    top: 90px;
    left: 70px;
  }
`;
const HeadName = styled.div`
  position: absolute;
  top: 20px;
  left: 5%;
  text-transform: capitalize;
  z-index: 2;
  display: flex;
  align-items: center;
  svg {
    font-size: 2rem;
    color: white;
    margin-right: 10px;
    cursor: pointer;
  }
`;
const PokemonName = styled.h3`
  color: white;
  font-weight: bold;
  font-size: 2rem;
`;
const PokemonID = styled.p`
  font-size: 1.5rem;
  opacity: 0.5;
`;
const TypesContainer = styled.div`
  /* position: absolute; */
  /* top: 50%; */
  display: flex;
  /* width: 60vw; */
  justify-content: center;
`;
const TypeName = styled.div`
  background-color: ${(props) => props.background};
  width: fit-content;
  padding: 8px;
  border-radius: 35px;
  margin: 10px 5px;
  color: white;
`;
const BottomSideContainer = styled.div`
  position: absolute;
  top: 50%;
  box-shadow: 0 3px 6px rgba(154, 160, 185, 0.5),
    0 15px 40px rgba(166, 173, 201, 0.23);
  padding: 25px;
  border-radius: 35px;
  @media (min-width: 768px) {
    & {
      top: 40%;
      right: 10%;
      padding: 30px;
      width: 300px;
    }
  }
`;
const StatContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 5px 0;
`;
const StatName = styled.div`
  margin: 0 5px;
`;
const StatBase = styled.div`
  width: 100px;
  background-color: #e8e8e8;
  height: 20px;
  border-radius: 35px;
`;
const StatValue = styled(StatBase)`
  width: ${(props) => props.width};
  background-color: #bfbfbf;
  p {
    padding-left: 5px;
    line-height: 20px;
    color: white;
    font-size: 13px;
  }
`;
const PokemonPage = (props) => {
  //console.log(props);
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
    <div>
     <Head>
        <title>{props.pokemon.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    <Container
      background={() => getTypeColor(props.pokemon.types[0].type.name)}
    >
      <HeadName>
          <IoMdArrowRoundBack 
            onClick={()=>(
                router.back()
            )}
          />
       <PokemonName>
          <PokemonID>#0{props.pokemon.id}</PokemonID>
          {props.pokemon.name}
        </PokemonName>
      </HeadName>
      <PokemonSingleImage
        src={props.pokemon.sprites.other["official-artwork"].front_default}
        alt={props.pokemon.name}
      />
      <BottomSideContainer>
        <TypesContainer>
          {React.Children.toArray(
            props.pokemon.types.map((type) => (
              //{console.log(type.type.name)}
              <TypeName background={getTypeColor(type.type.name)}>
                {type.type.name}
              </TypeName>
            ))
          )}
        </TypesContainer>

        {React.Children.toArray(
          props.pokemon.stats.map((stat) => (
            //{ console.log(stat.stat.name)}
            <StatContainer>
              <StatName>{stat.stat.name}</StatName>
              <StatBase>
                <StatValue width={`${stat.base_stat}px`}>
                  <p>{stat.base_stat}</p>
                </StatValue>
              </StatBase>
            </StatContainer>
          ))
        )}
      </BottomSideContainer>
    </Container>
    </div>
  );
};
export async function getServerSideProps({ query }) {
  let slugs;
  if (query == {} || !query?.slug) {
    slugs = "";
  } else {
    const _slugs = query.slug;
    slugs = _slugs.join("_");
  }

  console.log("El slug que llega por el query es", slugs);

  const pokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${slugs}`);
  const pokemonDataJson = await pokemonData.json();

  return {
    props: {
      pokemon: pokemonDataJson,
    }, // will be passed to the page component as props
  };
}
export default PokemonPage;
