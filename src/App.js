import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import pokemons from "./pokemon/pokemon.json";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import { getColors } from "./utils/ReturnCardColor";
import Header from "./components/Header/Header.js";

const GlobalStyle = createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Inter", sans-serif;
  
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(440px, 1fr));
  justify-items: center;
`;

function App() {
  const [pesquisa, setPesquisa] = useState("");
  const [idFilter, setIdFilter] = useState("");
  const [tipos, setTipos] = useState("")
  const [ordemAlfabetica, setOrdemAlfabetica] = useState("")

  return (
    <>
      <GlobalStyle />
      <Header
        idFilter={idFilter}
        setIdFilter={setIdFilter}
        pesquisa={pesquisa}
        setPesquisa={setPesquisa}
        tipos={tipos}
        setTipos={setTipos}
        ordemAlfabetica={ordemAlfabetica}
        setOrdemAlfabetica={setOrdemAlfabetica}
      />

      <CardsContainer>
        {pokemons.filter((pokemon) => {
          return idFilter ? pokemon.id.includes(idFilter) : pokemon
        })

          .filter((pokemon) => {
            return pokemon.name.english.toLowerCase().includes(pesquisa.toLowerCase());
          })

          //filtrar por tipo
          .filter((pokemon) => {
            return tipos ? pokemon.type.includes(tipos) : pokemon
          })

          //filtrar por ordem
          .sort((a, b)=>{
            if(ordemAlfabetica === "crescente"){
              if(a.name.english < b.name.english) {
                return -1
              } else {
                return 1
              }
            } else if (ordemAlfabetica === "decrescente"){
              if(a.name.english < b.name.english) {
                return 1
              } else {
                return -1
              }
            }
          })

          .map((pokemon) => {
            return (
              <PokemonCard
                cardColor={getColors(pokemon.type[0])}
                key={pokemon.id}
                pokemon={pokemon}
              />
            );
          })}
      </CardsContainer>
    </>
  );
}

export default App;
