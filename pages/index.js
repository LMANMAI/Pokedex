import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { List } from "../components";
import { ButtonContainer, Button, FaArrowLeft, FaArrowRight } from "../styles";
import { useDispatch } from "react-redux";
import { setnextPage, setPrevPage, setRegiones } from "../features/pagSlice";

const index = ({ regiones, objetoCompleto }) => {
  const dispatch = useDispatch();
  //destructuro el objeto que me llega como props
  const router = useRouter();
  const obtenerOffsetYLimit = (url) => {
    const regex = /offset=(\d+)&limit=(\d+)/;
    const match = url.match(regex);
    if (match) {
      return {
        offset: parseInt(match[1]),
      };
    } else {
      return null;
    }
  };

  const handleNextClick = () => {
    const { offset } = obtenerOffsetYLimit(objetoCompleto.next);
    dispatch(setnextPage(objetoCompleto.next));
    router.push({
      pathname: "/",
      query: {
        offset: offset,
      },
    });
  };

  const handlePrevClick = () => {
    const { offset } = obtenerOffsetYLimit(objetoCompleto.previous);
    dispatch(setPrevPage(objetoCompleto.previous));
    router.push({
      pathname: "/",
      query: {
        offset: offset,
      },
    });
  };

  useEffect(() => {
    dispatch(setnextPage(objetoCompleto.next));
    if (objetoCompleto.previous !== null) {
      dispatch(setPrevPage(objetoCompleto.previous));
    }
    window.scrollTo(0, 0);
  }, [objetoCompleto]);

  useEffect(() => {
    dispatch(setRegiones(regiones));
  }, []);

  return (
    <main>
      {/*aca va la lista */}
      <List pokemons={objetoCompleto.data} />
      <ButtonContainer>
        {objetoCompleto.previous === null ? null : (
          <Button onClick={handlePrevClick}>
            <FaArrowLeft />
          </Button>
        )}

        <Button onClick={handleNextClick}>
          <FaArrowRight />
        </Button>
      </ButtonContainer>
    </main>
  );
};
export async function getServerSideProps({ query }) {
  try {
    //consulta para las regiones
    const pokemonRegion = await fetch("https://pokeapi.co/api/v2/region/");
    const pokemonRegionJson = await pokemonRegion.json();
    let offset = query.offset ? query.offset : 0;
    //consulta para los pokemons
    let pokemonsList = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`
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
        regiones: pokemonRegionJson.results,
        objetoCompleto: {
          data: pokemonsData,
          count: pokemonsJSON.count,
          next: pokemonsJSON.next,
          previous: pokemonsJSON.previous,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        regiones: [],
        objetoCompleto: {},
      },
    };
  }
}
export default index;
