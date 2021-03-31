import React from "react";
import styled from "@emotion/styled";

const Pokemon = styled.li`
  color: blue;
`;
const index = ({ pokemons }) => {
  return (
    <div>
      <ul>
        {React.Children.toArray(
          pokemons.map((pokemon) => <Pokemon>{pokemon.name}</Pokemon>)
        )}
      </ul>
    </div>
  );
};
export async function getServerSideProps(context) {
  const pokemonsList = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?offset=0"
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
