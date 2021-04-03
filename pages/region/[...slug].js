import React from "react";
import { pokeGen } from "../../helper";
import List from '../../comps/List';

const Region = ({pokemons}) => {
  return <List pokemons={pokemons}/>;
};
export async function getServerSideProps({ query }) {
  let slugs;
  if (query == {} || !query?.slug) {
    slugs = "";
  } else {
    const _slugs = query.slug;
    slugs = _slugs.join("_");
  }

  const data = await pokeGen(slugs);
  console.log("objeto que devulve el switch", data);
  const { limit, offset } = data;

  const pokemonList = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
  );
  const pokemonsJSON = await pokemonList.json(); 
  const pokemonsData = await Promise.all(
    pokemonsJSON.results.map(async ({ url }) => {
      //let urlBarra = url.substring(0, url.length - 1);
      const data = await fetch(url);
      const dataJSON = await data.json();
      return dataJSON;
    })
  );
  return {
    props: {
        pokemons: pokemonsData
    }, // will be passed to the page component as props
  };
}

export default Region;
