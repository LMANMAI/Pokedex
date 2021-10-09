import React from "react";
import { pokeGen } from "../../helper";
import List from "../../comps/List";
import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";
import styled from "@emotion/styled";
import Head from "next/head";

const Button = styled.button`
  border: none;
  outline: none;

  border-radius: 50%;
  width: 55px;
  height: 55px;
  background-color: #5595a5;
  color: white;
  margin-left: 1.5rem;
  cursor: pointer;
`;
const Region = ({ pokemons, region_name }) => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{region_name}</title>
      </Head>
      <Button onClick={() => router.back()}>
        <FaArrowLeft />
      </Button>
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
