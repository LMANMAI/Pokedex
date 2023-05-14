import React from "react";
import {
  PokedexContainer,
  PokemonItem,
  PokemonImg,
  PokemonNumber,
  PokemonName,
  PokemonType,
  TypeContainer,
} from "./styles";
import { getTypeColor } from "../../helper";
import { useRouter } from "next/router";

const List = ({ pokemons }) => {
  const router = useRouter();
  return (
    <PokedexContainer>
      {React.Children.toArray(
        pokemons.map((pokemon) => (
          <PokemonItem
            onClick={() => router.push(`/pokemon/${pokemon.id}`)}
            background={getTypeColor(pokemon.types[0].type.name)}
          >
            <PokemonImg
              src={pokemon.sprites.other["official-artwork"].front_default}
            />
            <PokemonNumber># {pokemon.id}</PokemonNumber>
            <div>
              <PokemonName>{pokemon.name}</PokemonName>
              <TypeContainer>
                {React.Children.toArray(
                  pokemon.types.map((type) => (
                    <PokemonType background={getTypeColor(type.type.name)}>
                      <p>{type.type.name}</p>
                    </PokemonType>
                  ))
                )}
              </TypeContainer>
            </div>
          </PokemonItem>
        ))
      )}
    </PokedexContainer>
  );
};

export default List;
