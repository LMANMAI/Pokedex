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
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const List = ({ pokemons }) => {
  const router = useRouter();
  return (
    <motion.div
      className="container"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <PokedexContainer>
        {React.Children.toArray(
          pokemons &&
            pokemons.length > 0 &&
            pokemons.map((pokemon) => (
              <motion.div className="item" variants={item}>
                <PokemonItem
                  onClick={() => router.push(`/pokemon/${pokemon.id}`)}
                  background={getTypeColor(pokemon.types[0].type.name)}
                >
                  <PokemonImg
                    src={
                      pokemon.sprites.other["official-artwork"].front_default
                    }
                  />
                  <PokemonNumber># {pokemon.id}</PokemonNumber>
                  <div>
                    <PokemonName>{pokemon.name}</PokemonName>
                    <TypeContainer>
                      {React.Children.toArray(
                        pokemon.types.map((type) => (
                          <PokemonType
                            background={getTypeColor(type.type.name)}
                          >
                            <p>{type.type.name}</p>
                          </PokemonType>
                        ))
                      )}
                    </TypeContainer>
                  </div>
                </PokemonItem>
              </motion.div>
            ))
        )}
      </PokedexContainer>
    </motion.div>
  );
};

export default List;
