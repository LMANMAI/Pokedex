import styled from "@emotion/styled";
export const Container = styled.nav`
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  font-family: Helvetica, sans-serif;
  background-color: #f9fafc;
  padding: 10px;
  z-index: -2;
  .back_btn {
    margin-right: 20px;
    border: none;
    outline: none;
    width: 35px;
    height: 35px;
    border-radius: 100%;
    color: white;
    background-color: #e9463f;
    cursor: pointer;
  }
`;
export const RegionContainer = styled.div`
  padding: 0.3rem 2rem 0.3rem 0.5rem;
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  @media (min-width: 768px) {
    justify-content: center;
  }
`;

export const Region = styled.button`
  margin: 0 0.3rem;
  padding: 15px;
  border: none;
  outline: none;
  border-radius: 25px;
  cursor: pointer;
  background-color: #f3f3f3;
  text-transform: capitalize;
`;

export const PokedexTittle = styled.h1`
  color: #e9463f;
  margin-top: 10px;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  width: 350px;
  align-items: center;
`;

export const Pokeball = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 5px;
`;

export const SearchContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 15%;
  width: 100%;
  border: 1px solid red;
  border-radius: 15px;
  margin-left: 10px;
  align-items: center;
  svg {
    margin: 5px;
  }
`;
export const InputSearch = styled.input`
  padding: 5px 10px;
  border: none;
  outline: none;
  background-color: transparent;
  &:focus {
    .search_container {
      border: 1px solid blue;
    }
  }
`;
