import styled from "@emotion/styled";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 40px;
`;
export const Button = styled.button`
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

export const Container = styled.div`
  height: calc(100vh - 40px);
  width: 100vw;
  overflow-x: hidden;
  background-color: ${(props) => props.background};
  display: grid;
  grid-template-rows: 1fr 1fr;
  @media (min-width: 768px) {
    height: calc(100vh - 40px);
    grid-template-columns: 1fr 1fr;
    grid-template-rows: initial;
  }
`;
export const PokemonSingleImage = styled.img`
  width: 90%;
  display: block;
  margin: auto;
`;
export const HeadName = styled.div`
  position: absolute;
  top: 20px;
  left: 5%;
  text-transform: capitalize;
  z-index: 2;
  display: flex;
  align-items: center;
  svg {
    font-size: 2rem;
    color: white;
    margin-right: 10px;
    cursor: pointer;
  }
`;
export const PokemonName = styled.h3`
  color: white;
  font-weight: bold;
  font-size: 2rem;
`;
export const PokemonID = styled.p`
  font-size: 1.5rem;
  opacity: 0.5;
`;
export const TypesContainer = styled.div`
  /* position: absolute; */
  /* top: 50%; */
  display: flex;
  /* width: 60vw; */
  justify-content: center;
`;
export const TypeName = styled.div`
  background-color: ${(props) => props.background};
  width: fit-content;
  padding: 8px;
  border-radius: 35px;
  margin: 10px 5px;
  color: white;
  text-transform: capitalize;
`;
export const TopSide = styled.div`
  display: flex;
`;
export const ImageContainer = styled.div`
  width: 100%;
  height: 80%;
  /* justify-content: center; */
  /* justify-self: center; */
  align-self: flex-end;
  margin: 0 auto;
  //border: 1px solid red;
  @media (min-width: 768px) {
    width: 80%;
    align-self: center;
    padding: 0.5rem;
  }
`;
export const BottomSideContainer = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
`;
export const Box = styled.div`
  background-color: white;
  margin-top: 1rem;
  border-radius: 35px;
  width: 80%;
  height: 60%;
  @media (min-width: 768px) {
    width: 60%;
    align-self: center;
    padding: 1rem;
    //width: fit-content;
    height: fit-content;
  }
`;
export const StatContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 5px 0;
`;
export const StatName = styled.div`
  margin: 0 5px;
  text-transform: capitalize;
`;
export const StatBase = styled.div`
  width: 100px;
  background-color: #e8e8e8;
  height: 20px;
  border-radius: 35px;
`;
export const StatValue = styled(StatBase)`
  width: ${(props) => props.width};
  background-color: #bfbfbf;
  p {
    padding-left: 5px;
    line-height: 20px;
    color: white;
    font-size: 13px;
  }
`;

export const ButtonRegion = styled.button`
  border: none;
  outline: none;
  position: fixed;
  z-index: 99;
  border-radius: 50%;
  width: 55px;
  height: 55px;
  background-color: #5595a5;
  color: white;
  margin-left: 1.5rem;
  cursor: pointer;
`;
export { FaArrowLeft, FaArrowRight, IoMdArrowRoundBack };
