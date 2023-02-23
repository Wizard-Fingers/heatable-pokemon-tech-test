import React from "react";
import PokemonLayout from "@/components/PokemonLayout";
import Link from "next/link";
export default function pokemon({ pokemon }) {
  const bgColor = () => {
    switch (pokemon.types[0].type.name) {
      case "grass":
        return "bg-green-200 text-green-900";
      case "fire":
      case "fighting":
        return "bg-red-200 text-red-900";
      case "water":
      case "ice":
      case "flying":
        return "bg-blue-200 text-blue-900";
      case "bug":
      case "electric":
      case "ground":
      case "rock":
        return "bg-yellow-200 text-yellow-900";
      case "fire":
        return "bg-red-200 text-red-900";
      case "poison":
      case "ghost":
      case "dragon":
        return "bg-purple-200 text-purple-900";
      case "fairy":
      case "psychic":
        return "bg-pink-200 text-pink-900";
      case "normal":
      case "dark":
      default:
        return "bg-gray-200 text-gray-900";
    }
  };
  const styles = {
    header:
      "capitalize text-5xl mb-2 text-center Pokemon-font cap tracking-[0.5rem] p-2",
    image: "mx-auto -mb-32",
    foreground: "bg-white w-full rounded-3xl text-center p-10 pt-36",
    textWrapper: "pt-6",
    textInner: "font-bold Pokemon-font text-[2rem] tracking-[4px] mr-2",
    textNum: "text-4xl",
    cardWrapper: "w-full flex justify-center m-2",
    h2Text: "text-4xl mb-10 Pokemon-font",
  };

  // console.log(pokemon)
  return (
    <PokemonLayout title={pokemon.name}>
      <div className={`${bgColor()} p-10`}>
        <div className="h-full">
          <h1 className={styles.header}>{pokemon.name}</h1>
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className={styles.image}
          />
        </div>
        <div className={styles.foreground}>
          <p className={styles.textWrapper}>
            <span className={styles.textInner}>Weight:</span>
            <span className={styles.textNum}>{pokemon.weight}</span>
          </p>
          <p className={styles.textWrapper}>
            <span className={styles.textInner}>Height:</span>
            <span className={styles.textNum}>{pokemon.height}</span>
          </p>
          <div className={styles.cardWrapper}>
            <div
              className={`${bgColor()} p-4 mt-6 w-[20rem] rounded-2xl hover:scale-110 hover:drop-shadow-2xl transition drop-shadow-md`}
            >
              <h2 className={styles.h2Text}>Types</h2>
              {pokemon.types.map((type, index) => (
                <p className="p-2 text-4xl" key={index}>
                  {type.type.name}
                </p>
              ))}
              <p className="mt-10">
                <Link href="/">
                  <button className="text-2xl hover:underline">
                    Back to Cards
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
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

    let zeros = "";
    if (pokemon.id < 10) {
      // 009.png
      zeros = "00";
    } else if (pokemon.id < 100) {
      // 10 -> 99 -> 099.png
      zeros = "0";
    } else {
      // 100 -> 151 -> 151.png
      zeros = "";
    }

    const paddedIndex = zeros + pokemon.id;
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
    pokemon.image = image;
    return {
      props: { pokemon },
    };
  } catch (err) {
    console.error(err);
  }
}
