import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import {
  Container,
  Pokeball,
  PokedexTittle,
  SearchContainer,
  InputSearch,
} from "./styles";
import {
  selectRegiones,
  setSearch,
  setOffsetLimit,
} from "../../features/pagSlice";
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
  const handleRegionChange = (region) => {
    let offsetLimit = 0;
    switch (region) {
      case "kanto":
        offsetLimit = 151;
        break;
      case "johto":
        offsetLimit = 251;
        break;
      case "hoenn":
        offsetLimit = 386;
        break;
      case "sinnoh":
        offsetLimit = 493;
        break;
      case "unova":
        offsetLimit = 649;
        break;
      case "kalos":
        offsetLimit = 721;
        break;
      case "alola":
        offsetLimit = 809;
        break;
      case "galar":
        offsetLimit = 902;
        break;
      case "hisui":
        offsetLimit = 1015;
        break;
      case "paldea":
        offsetLimit = 1281;
        break;
      default:
        offsetLimit = 0;
    }

    dispatch(setOffsetLimit(offsetLimit));

    router.push({
      pathname: `/region/${region}`,
    });
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

      <select
        style={{
          padding: "8px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          backgroundColor: "#fff",
          color: "#333",
          width: "200px",
          outline: "none",
        }}
        onChange={(e) => handleRegionChange(e.target.value)}
      >
        {regiones?.map((region) => (
          <option
            key={region.name}
            value={region.name}
            style={{ textTransform: "capitalize" }}
          >
            {region.name}
          </option>
        ))}
      </select>
    </Container>
  );
};

export default Header;
