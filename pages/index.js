import { useState } from "react";
import { debounce } from "lodash"; // import the debounce function
import Layout from "@/components/Layout";
import Nav from "@/components/Nav";
import Search from "@/components/Search";
import Link from "next/link";
import dynamic from "next/dynamic";

export default function Home({ pokemon }) {
  const styles = {
    loadingWrapper: "w-full text-center",
    loadingText: "Pokemon-font text-2xl",
    ulWrapper: "grid gap-4 grid-cols-1 sm:grid-cols-2",
    linkWrapper:
      "my-2 p-4 capitalize flex  text-lg bg-green-200 shadow-lg rounded-xl w-[22rem] h-[8rem] hover:scale-110 hover:bg-green-300 hover:shadow-2xl transition m-2",
    innerLinkWrapper: "flex flex-col",
    wrapperIndex: "font-bold text-[2rem] flex items-center",
    wrapperIndexContent: "bg-green-300 pl-[7px] pt-[2px] rounded-full w-8 h-8",
    cardHeader: "w-[10rem] text-green-900  mx-auto pl-4 Pokemon-font text-center text-[1.7rem] tracking-[1.5px] pt-6",
    imageBgWrapper: "w-full flex justify-end",
    imageBg: "bg-gradient-to-r from-green-300 to-green-200 w-[6.5rem] h-[6.5rem] mt- -mr-3 rounded-full",
    image: "w-[6.5rem] h-[6.5rem]  absolute translate-x-[14rem] -translate-y-1"
  };

  // Lazy loading
  const MyLazyLoadedComponent = dynamic(
    () => import("../components/LazyLoader"),
    {
      loading: () => (
        <div className={styles.loadingWrapper}>
          {" "}
          <h2 className={styles.loadingText}>Loading... </h2>
        </div>
      ),
    }
  );
  //search
  const [filteredPokemon, setFilteredPokemon] = useState(pokemon);
  const [query, setQuery] = useState("");

  // function debounce(func, timeout = 300){
  //   let timer;
  //   return (...args) => {
  //     clearTimeout(timer);
  //     timer = setTimeout(() => { func.apply(this, args); }, timeout);
  //   };
  // }

  const handleInputChange = (query) => {
    const filtered = pokemon.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPokemon(filtered);
  };

  // Use debounce to prevent calling handleSearch too frequently
  const handleSearchDebounced = debounce(handleInputChange, 300);

  return (
    <>
      <Nav />
      <Search onSearch={handleSearchDebounced} />
      <Layout title={"Pokemon Tech Test"}>
        <ul className={styles.ulWrapper}>
          {filteredPokemon.map((p, index) => (
            <li key={index}>
              <Link href={`/pokemon?name=${p.name}`}>
                <div className={styles.linkWrapper}>
                  <div className={styles.innerLinkWrapper}>
                    <span className={styles.wrapperIndex}>
                      <span className={styles.wrapperIndexContent}>
                        #
                      </span>
                      {index + 1}
                    </span>
                    <h5 className={styles.cardHeader}>
                      {p.name}
                    </h5>
                  </div>
                  <div className={styles.imageBgWrapper}>
                    <div className={styles.imageBg}></div>
                  </div>
                  <MyLazyLoadedComponent />
                  <img
                    src={p.image}
                    alt={p.name}
                    className={styles.image}
                  />
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
