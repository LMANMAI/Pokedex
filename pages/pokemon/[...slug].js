import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  IoMdArrowRoundBack,
  Container,
  PokemonSingleImage,
  HeadName,
  PokemonName,
  PokemonID,
  TypesContainer,
  TypeName,
  TopSide,
  ImageContainer,
  BottomSideContainer,
  Box,
  StatContainer,
  StatName,
  StatBase,
  StatValue,
} from "../../styles";
import { getTypeColor } from "../../helper";

const PokemonPage = (props) => {
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
        <TopSide>
          <HeadName>
            <IoMdArrowRoundBack onClick={() => router.back()} />
            <PokemonName>
              <PokemonID>#0{props.pokemon.id}</PokemonID>
              {props.pokemon.name}
            </PokemonName>
          </HeadName>
          <ImageContainer>
            <PokemonSingleImage
              src={
                props.pokemon.sprites.other["official-artwork"].front_default
              }
              alt={props.pokemon.name}
            />
          </ImageContainer>
        </TopSide>

        <BottomSideContainer>
          <Box>
            <TypesContainer>
              {React.Children.toArray(
                props.pokemon.types.map((type) => (
                  <TypeName background={getTypeColor(type.type.name)}>
                    {type.type.name}
                  </TypeName>
                ))
              )}
            </TypesContainer>

            {React.Children.toArray(
              props.pokemon.stats.map((stat) => (
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
          </Box>
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

  const pokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${slugs}`);
  const pokemonDataJson = await pokemonData.json();

  return {
    props: {
      pokemon: pokemonDataJson,
    },
  };
}
export default PokemonPage;
