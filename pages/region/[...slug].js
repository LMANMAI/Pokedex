import React from "react";
import { pokeGen } from "../../helper";
import { List } from "../../components";
import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";
import { ButtonRegion } from "../../styles";
import Head from "next/head";

const Region = ({ pokemons, region_name }) => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{region_name}</title>
      </Head>
      <ButtonRegion onClick={() => router.back()}>
        <FaArrowLeft />
      </ButtonRegion>
      <List pokemons={pokemons} />
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
  let regionname = slugs;
  const data = await pokeGen(slugs);
  const { limit, offset } = data;

  const pokemonList = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
  );
  const pokemonsJSON = await pokemonList.json();
  const pokemonsData = await Promise.all(
    pokemonsJSON.results.map(async ({ url }) => {
      let urlBarra = url.substring(0, url.length - 1);
      const data = await fetch(urlBarra);
      const dataJSON = await data.json();
      return dataJSON;
    })
  );
  return {
    props: {
      pokemons: pokemonsData,
      region_name: regionname,
    }, // will be passed to the page component as props
  };
}

export default Region;
