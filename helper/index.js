export const getTypeColor = (type) => {
    switch (type) {
      case "fire":
        return "#fba14d";
      case "water":
        return "#0875c8";
      case "normal":
        return "#9f9fa0";
      case "grass":
        return "#5cbf6c";
      case "electric":
        return "#f6de61";
      case "ice":
        return "#81d6ca";
      case "ground":
        return "#d97d4d";
      case "flying":
        return "#97acdf";
      case "ghost":
        return "#6c70c9";
      case "rock":
        return "#cec08d";
      case "fighting":
        return "#e04551";
      case "poison":
        return "#bc66d1";
      case "psychic":
        return "#fb9088";
      case "bug":
        return "#a6c53f";
      case "dark":
        return "#676971";
      case "steel":
        return "#5595a5";
      case "dragon":
        return "#0875c8";
      case "fairy":
        return "#f09ce6";
    }
  }; 

export  const pokeGen = (name) => {
  switch (name) {
    case "kanto":
      return {
        limit: 151,
        offset: 0,
      };
    case "johto":
      return {
        limit: 100,
        offset: 151,
      };
    case "hoenn":
      return {
        limit: 135,
        offset: 251,
      };
    case "sinnoh":
      return {
        limit: 107,
        offset: 386,
      };
    case "unova":
      return {
        limit: 156,
        offset: 493,
      };
    case "kalos":
      return {
        limit: 72,
        offset: 649,
      };
    case "alola":
      return {
        limit: 88,
        offset: 721,
      };
    case "galar":
      return {
        limit: 81,
        offset: 809,
      };
    default:
      return {
        limit: 20,
        offset: 20,
      };
  }
};



