import React from 'react';

const listPage = ({pokemons}) => {
    return (
        <div>
            <ul>
                {React.Children.toArray(
                    pokemons.map((pokemon)=>
                        <li>{pokemon.name}</li>
                    )
                )}
            </ul>
        </div>
    )
}
export async function getServerSideProps(context) {
    const pokemonList = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0`);
    const pokemonJSON = await pokemonList.json();
    // const pokemonData = await Promise.all(
    //     pokemonJSON.results.map(async ({url}) =>{
    //         const data = await fetch(url);
    //         const dataJSON = await data.json();
    //         return await dataJSON;
    //     })
    // )
    console.log(pokemonJSON.results)
    return {
      
      props: {
          pokemons: pokemonJSON.results,
      }, // will be passed to the page component as props
    }
  }
export default listPage
