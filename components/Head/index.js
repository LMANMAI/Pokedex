import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  RegionContainer,
  Region,
  Container,
  Pokeball,
  PokedexTittle,
} from "./styles";
import { useSelector } from "react-redux";
import { selectRegiones } from "../../features/pagSlice";

const Header = () => {
  const router = useRouter();
  const regiones = useSelector(selectRegiones);
  if (
    router.pathname === "/region/[...slug]" ||
    router.pathname === "/pokemon/[...slug]"
  )
    return null;
  return (
    <Container>
      <Head>
        <title>Pokedex</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="shortcut icon"
          href="/images/pokebola.png"
          type="image/x-icon"
        />
        nk
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <PokedexTittle
        onClick={() => {
          router.push("/");
        }}
      >
        {router.pathname === "/" ? null : (
          <button
            className="back_btn"
            onClick={() => {
              router.back();
            }}
          ></button>
        )}
        <Pokeball src="/images/pokebola.png" alt="Logo" />
        Pokedex NextJs
      </PokedexTittle>

      <RegionContainer>
        {React.Children.toArray(
          regiones?.map((region) => (
            <Region
              onClick={() => {
                router.push({
                  pathname: `/region/${region.name}`,
                });
              }}
            >
              {region.name}
            </Region>
          ))
        )}
      </RegionContainer>
    </Container>
  );
};

export default Header;
