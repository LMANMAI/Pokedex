import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { List } from "../components";
import { ButtonContainer, Button, FaArrowLeft, FaArrowRight } from "../styles";
import { useDispatch } from "react-redux";
import { setnextPage, setPrevPage, setRegiones } from "../features/pagSlice";

const index = ({ pokemons, regiones, objetoCompleto }) => {
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
      <List pokemons={pokemons} />
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
  //consulta para las regiones
  try {
    const pokemonRegion = await fetch("https://pokeapi.co/api/v2/region/");
    const pokemonRegionJson = await pokemonRegion.json();

    //consulta para los pokemons
    let pokemonsList = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=${query.offset}&limit=20`
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
        regiones: pokemonRegionJson.results,
        objetoCompleto: pokemonsJSON,
      },
    };
  } catch (error) {
    return {
      props: {
        pokemons: [],
        regiones: [],
        objetoCompleto: [],
      },
    };
  }
}
export default index;
