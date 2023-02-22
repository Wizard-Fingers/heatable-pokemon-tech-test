import Layout from "@/components/Layout";
import Nav from "@/components/Nav";
import Search from "@/components/Search";
import Link from "next/link";
import Image from "next/image";
// import Head from "next/head";

export default function Home({ pokemon }) {
  // console.log(pokemon);
  return (
    <>
      <Nav />
      <Search />
      <Layout title={"Pokemon Tech Test"}>
        <ul>
          {pokemon.map((p, index) => (
            <li key={index}>
              <Link href={`/pokemon?id=${index + 1}`}>
              <div className="border border-spacing-1 border-gray-400 my-2 p-4 capitalize flex items-center text-lg bg-gray-200 rounded-md">
                  <img src={p.image} alt={p.name} className="w-20 h-20 r-3"/>
                  <span className="mr-2 font-bold">{index + 1}.</span>
                  <h5>{p.name}</h5>
                  </div>
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const { results } = await res.json();
    const pokemon = results.map((result, index) => {
      const paddedIndex = ("00" + (index + 1)).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
      return {
        ...result,
        image,
      };
    });
    return {
      props: { pokemon },
    };
  } catch (error) {
    console.log(error);
  }
}
