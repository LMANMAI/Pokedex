import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { List } from "../components";
import { ButtonContainer, Button, FaArrowLeft, FaArrowRight } from "../styles";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPaginador,
  setnextPage,
  setPrevPage,
  selectNextPage,
  selectPrevPage,
  setRegiones,
  selectSearch,
} from "../features/pagSlice";

const index = ({ pokemons, regiones, objetoCompleto }) => {
  const page = useSelector(selectPaginador);
  const cadenaNext = useSelector(selectNextPage);
  const cadenaPrev = useSelector(selectPrevPage);
  const search = useSelector(selectSearch);
  const dispatch = useDispatch();

  console.log(search);
  //destructuro el objeto que me llega como props
  const { next, previous } = objetoCompleto;
  let offset = next.indexOf("=");
  let limit = next.indexOf("&limit");
  const router = useRouter();

  useEffect(() => {
    dispatch(setnextPage(next.substring(offset, limit)));
    if (previous !== null) {
      dispatch(setPrevPage(previous.substring(offset, limit)));
    }
  }, [objetoCompleto]);

  useEffect(() => {
    dispatch(setRegiones(regiones));
  }, []);

  return (
    <div>
      {/*aca va la lista */}
      <List pokemons={pokemons} />
      <ButtonContainer>
        {page === 1 ? null : (
          <Button
            onClick={() => {
              dispatch(setPrevPage(previous));
              router.push({
                pathname: "/",
                query: { offset: cadenaPrev, paginador: page },
              });
            }}
          >
            <FaArrowLeft />
          </Button>
        )}

        <Button
          onClick={() => {
            dispatch(setnextPage(next));
            router.push({
              pathname: "/",
              query: { offset: cadenaNext, paginador: page },
            });
          }}
        >
          <FaArrowRight />
        </Button>
      </ButtonContainer>
    </div>
  );
};
export async function getServerSideProps({ query }) {
  //consulta para las regiones
  const pokemonRegion = await fetch("https://pokeapi.co/api/v2/region/");
  const pokemonRegionJson = await pokemonRegion.json();

  //consulta para los pokemons
  let pokemonsList = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?offset${query.offset}&limit=30`
  );
  const pokemonsJSON = await pokemonsList.json();

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
      pokemons: pokemonsData,
      regiones: pokemonRegionJson.results,
      objetoCompleto: pokemonsJSON,
    },
  };
}
export default index;
