import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import {
  RegionContainer,
  Region,
  Container,
  Pokeball,
  PokedexTittle,
  SearchContainer,
  InputSearch,
} from "./styles";
import { selectRegiones, setSearch } from "../../features/pagSlice";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const [search, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const regiones = useSelector(selectRegiones);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

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
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <PokedexTittle>
        <Pokeball
          src="/images/pokebola.png"
          alt="Logo"
          onClick={() => {
            router.push("/");
          }}
        />
        {pathname === `/region/` ? (
          <SearchContainer className="search_container">
            <InputSearch
              autocomplete="off"
              type="text"
              name="buscador"
              placeholder="Buscar"
              onChange={(e) => handleChange(e)}
            />
            <AiOutlineSearch onClick={() => dispatch(setSearch(search))} />
          </SearchContainer>
        ) : null}
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
