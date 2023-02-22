import React from "react";
import PokemonLayout from "@/components/PokemonLayout";
import Link from "next/link";
export default function pokemon({ pokemon }) {
  const bgColor = () => {
    if (pokemon.types[0].type.name === "grass") {
      return "bg-green-200";
    } else if (pokemon.types[0].type.name === "fire") {
      return "bg-red-200";
    } else if (pokemon.types[0].type.name === "water") {
      return "bg-blue-200";
    } else if (pokemon.types[0].type.name === "bug") {
      return "bg-yellow-200";
    } else if (pokemon.types[0].type.name === "normal") {
      return "bg-gray-200";
    } else if (pokemon.types[0].type.name === "poison") {
      return "bg-purple-200";
    } else if (pokemon.types[0].type.name === "electric") {
      return "bg-yellow-200";
    } else if (pokemon.types[0].type.name === "ground") {
      return "bg-yellow-200";
    } else if (pokemon.types[0].type.name === "fairy") {
      return "bg-pink-200";
    } else if (pokemon.types[0].type.name === "fighting") {
      return "bg-red-200";
    } else if (pokemon.types[0].type.name === "psychic") {
      return "bg-pink-200";
    } else if (pokemon.types[0].type.name === "rock") {
      return "bg-yellow-200";
    } else if (pokemon.types[0].type.name === "ghost") {
      return "bg-purple-200";
    } else if (pokemon.types[0].type.name === "ice") {
      return "bg-blue-200";
    } else if (pokemon.types[0].type.name === "dragon") {
      return "bg-purple-200";
    } else if (pokemon.types[0].type.name === "flying") {
      return "bg-blue-200";
    } else if (pokemon.types[0].type.name === "dark") {
    return "bg-gray-200";
  }
  };
  // console.log(pokemon)
  return (
    <PokemonLayout title={pokemon.name}>
      <div className={bgColor()}>
        <h1 className="capitalize text-5xl mb-2 text-center Pokemon-font cap tracking-[0.5rem] p-2">
          {pokemon.name}
        </h1>
        <img src={pokemon.image} alt={pokemon.name} className="mx-auto pb-12" />
      </div>
      <div className="">
        <p>
          <span className="font-bold mr-2">Weight:</span>
          {pokemon.weight}
        </p>
        <p>
          <span className="font-bold mr-2">Height:</span>
          {pokemon.height}
        </p>
        <h2 className="text-2xl mt-6 mb-2">Types</h2>

        {pokemon.types.map((type, index) => (
          <p key={index}>{type.type.name}</p>
        ))}
        <p className="mt-10 text-center">
          <Link href="/">
            <button className="text-2xl underline">Back</button>
          </Link>
        </p>
      </div>
    </PokemonLayout>
  );
}
export async function getServerSideProps({ query }) {
  const name = query.name;

  try {
    const indexRes = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const { results: indexResults } = await indexRes.json();

    const foundPokemon = indexResults.find((p) => p.name === name);

    const res = await fetch(foundPokemon.url);
    const pokemon = await res.json();
    const paddedIndex = "00" + pokemon.id;
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
    pokemon.image = image;
    return {
      props: { pokemon },
    };
  } catch (err) {
    console.error(err);
  }
}
