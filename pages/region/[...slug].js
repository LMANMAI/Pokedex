import React from "react";
import { useState } from "react";
import { pokeGen } from "../../helper";
import { List } from "../../components";
import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";
import { ButtonRegion } from "../../styles";
import Head from "next/head";

const Region = ({ initialPokemons, region_name }) => {
  const router = useRouter();
  const [pokemons, setPokemons] = useState(initialPokemons);
  const [count, setCount] = useState(0);

  // const loadMorePokemons = async () => {
  //   const { limit, offset } = pokeGen([]);

  //   console.log(count);
  //   const pokemonList = await fetch(
  //     `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${count}`
  //   );

  //   const pokemonsJSON = await pokemonList.json();

  //   const newPokemonsData = await Promise.all(
  //     pokemonsJSON.results.map(async ({ url }) => {
  //       let urlBarra = url.substring(0, url.length - 1);
  //       const data = await fetch(urlBarra);
  //       const dataJSON = await data.json();
  //       return dataJSON;
  //     })
  //   );

  //   setPokemons((prevPokemons) => [...prevPokemons, ...newPokemonsData]);
  // };

  return (
    <div>
      <Head>
        <title>{region_name}</title>
      </Head>
      <ButtonRegion onClick={() => router.back()}>
        <FaArrowLeft />
      </ButtonRegion>
      <List pokemons={pokemons} />
      <button
        onClick={() => {
          setCount(count + 20);
          loadMorePokemons();
        }}
      >
        Load More
      </button>
    </div>
  );
};
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
export async function getStaticProps({ query }) {
  try {
    let slugs;
    if (query == {} || !query?.slug) {
      slugs = "";
    } else {
      const _slugs = query.slug;
      slugs = _slugs.join("_");
    }
    let regionname = slugs;
    const initialData = pokeGen(slugs);
    const { limit, offset } = initialData;

    const pokemonList = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    );

    const pokemonsJSON = await pokemonList.json();
    const initialPokemonsData = await Promise.all(
      pokemonsJSON.results.map(async ({ url }) => {
        let urlBarra = url.substring(0, url.length - 1);
        const data = await fetch(urlBarra);
        const dataJSON = await data.json();
        return dataJSON;
      })
    );

    return {
      props: {
        initialPokemons: initialPokemonsData,
        region_name: regionname,
      },
    };
  } catch (error) {
    return {
      props: {
        initialPokemons: [],
        region_name: "",
      },
    };
  }
}

export default Region;
