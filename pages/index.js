import React, { useEffect, useState } from "react";
import { List } from "../components";
import { ButtonContainer, Button, FaArrowLeft, FaArrowRight } from "../styles";
import { useDispatch, useSelector } from "react-redux";
import {
  setnextPage,
  setPrevPage,
  setRegiones,
  selectOffset,
  setOffset,
} from "../features/pagSlice";

const index = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  //destructuro el objeto que me llega como props
  const offset = useSelector(selectOffset);

  const handleData = async () => {
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
    setData({
      pokemonsData,
      count: pokemonsJSON.count,
      next: pokemonsJSON.next,
      previous: pokemonsJSON.previous,
    });
  };
  const handleDataRegion = async () => {
    const pokemonRegion = await fetch("https://pokeapi.co/api/v2/region/");
    const pokemonRegionJson = await pokemonRegion.json();
    dispatch(setRegiones(pokemonRegionJson.results));
  };
  const handleNextClick = () => {
    dispatch(setnextPage(data.next));
    dispatch(setOffset(offset + 20));
  };

  const handlePrevClick = () => {
    dispatch(setPrevPage(data.previous));
    dispatch(setOffset(offset - 20));
  };

  useEffect(() => {
    handleData();
    dispatch(setnextPage(data.next));
    if (data.previous !== null) {
      dispatch(setPrevPage(data.previous));
    }
    window.scrollTo(0, 0);
  }, [data, offset]);

  useEffect(() => {
    handleData();
    handleDataRegion();
  }, []);

  return (
    <main>
      {/*aca va la lista */}
      <List pokemons={data ? data.pokemonsData : []} />
      <ButtonContainer>
        {data.previous === null ? null : (
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

export default index;
