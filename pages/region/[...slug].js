import React from "react";
import Head from "next/head";
import { useState } from "react";
import { pokeGen } from "../../helper";
import { List, Loader } from "../../components";
import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";
import { ButtonRegion, ContainerLoadMore } from "../../styles";

const Region = ({ initialPokemons, region_name, offset }) => {
  const router = useRouter();
  const [pokemons, setPokemons] = useState(initialPokemons);
  const [limit, setLimit] = useState(offset + 20);
  const [load, setLoad] = useState(false);

  const loadMorePokemons = async (currentPokemons) => {
    const pokemonList = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=${limit}&limit=20`
    );
    const pokemonsJSON = await pokemonList.json();
    const newPokemonsData = await Promise.all(
      pokemonsJSON.results.map(async ({ url }) => {
        let urlBarra = url.substring(0, url.length - 1);
        const data = await fetch(urlBarra);
        const dataJSON = await data.json();
        return dataJSON;
      })
    );
    setLoad(false);
    const filteredPokemons = newPokemonsData.filter(
      (pokemon) => !currentPokemons.some((p) => p.id === pokemon.id)
    );
    setLimit((prevLimit) => prevLimit + 20);
    setPokemons((prevPokemons) => [...prevPokemons, ...filteredPokemons]);
  };

  return (
    <div>
      <Head>
        <title>{region_name}</title>
      </Head>
      <ButtonRegion onClick={() => router.back()}>
        <FaArrowLeft />
      </ButtonRegion>

      <div style={{ marginTop: "55px" }}>
        <List pokemons={pokemons} />
        <ContainerLoadMore>
          {load ? (
            <Loader />
          ) : (
            <button
              className="button_loadMore"
              onClick={() => {
                setLoad(true);
                loadMorePokemons(pokemons);
              }}
            >
              Load More
            </button>
          )}
        </ContainerLoadMore>
      </div>
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
  const { limit, offset, limitgen } = data;

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
      initialPokemons: pokemonsData,
      region_name: regionname,
      limitgen: limitgen,
      limitn: limit,
      offset: offset,
    },
  };
}

export default Region;
