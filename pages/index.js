import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import List from "../comps/List";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPaginador,
  setnextPage,
  setPrevPage,
  selectNextPage,
  selectPrevPage,
} from "../features/pagSlice";
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
  //border: 1px solid red;
`;
const Button = styled.button`
  border: none;
  padding: 5px;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: #e9463f;
  color: white;
  outline: none;
  cursor: pointer;
  :first-child {
    margin-right: 1rem;
  }
`;
const RegionContainer = styled.div`
  margin: 0 auto;
  padding: 0.3rem 2rem 0.3rem 0.5rem;
  //border: 1px solid red;
  width: 90vw;
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  @media (min-width: 768px) {
    justify-content: center;
    width: 100vw;
  }
`;
const Region = styled.button`
  //border: 1px solid blue;
  margin: 0 0.3rem;
  padding: 15px;
  border: none;
  outline: none;
  border-radius: 25px;
  cursor: pointer;
  background-color: #f3f3f3;
  text-transform: capitalize;
`;

const index = ({ pokemons, regiones, objetoCompleto }) => {
  const page = useSelector(selectPaginador);
  const cadenaNext = useSelector(selectNextPage);
  const cadenaPrev = useSelector(selectPrevPage);
  const dispatch = useDispatch();

  //destructuro el objeto que me llega como props
  const { next, previous } = objetoCompleto;
  let offset = next.indexOf("=");
  let limit = next.indexOf("&limit");
  useEffect(() => {
    dispatch(setnextPage(next.substring(offset, limit)));
    if (previous !== null) {
      dispatch(setPrevPage(previous.substring(offset, limit)));
    }
  }, [objetoCompleto]);
  const router = useRouter();

  return (
    <div>
      <RegionContainer>
        {React.Children.toArray(
          regiones.map((region) => (
            <Region
              onClick={() => {
                router.push({
                  pathname: `/region/${region.name}`,
                  //query: { region: region.name },
                });
              }}
            >
              {region.name}
            </Region>
          ))
        )}
      </RegionContainer>

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
      {/*aca va la lista */}
      <List pokemons={pokemons} />
    </div>
  );
};
export async function getServerSideProps({ query }) {
  //consulta para las regiones
  const pokemonRegion = await fetch("https://pokeapi.co/api/v2/region/");
  const pokemonRegionJson = await pokemonRegion.json();

  //consulta para los pokemons
  let pokemonsList = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?offset${query.offset}&limit=20`
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
    }, // will be passed to the page component as props
  };
}
export default index;
