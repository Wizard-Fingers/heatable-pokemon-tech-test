
export default function Nav() {
  const styles = {
    nav: " pt-[0.5rem] mx-6",
    header:
      "text-4xl text-center text-transparent bg-gradient-to-r from-green-500 to-green-200 bg-clip-text leading-normal Pokemon-font tracking-[0.2rem]  -translate-y-3",
    border: "w-full h-[4px] bg-gradient-to-r from-green-500 to-white rounded-full drop-shadow-2xl",
  };
  return (
    <nav className={styles.nav}>
      <h1 className={styles.header}>
      Pokemon-Pokedex
      </h1>
      <div className={styles.border}></div>
    </nav>
  );
}
