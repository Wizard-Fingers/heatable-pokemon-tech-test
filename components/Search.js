export default function Search({ onSearch }) {
  const styles = {
    wrapper: "flex justify-center py-4",
    form: "drop-shadow-md rounded-xl p-4 bg-green-200 w-[24rem] flex justify-center",
    input: "p-2 rounded-xl w-[22rem]",
  };
  const handleInputChange = (event) => {
    onSearch(event.target.value);
  };
  return (
    <div className={styles.wrapper}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className={styles.form}
      >
        <input
          type="text"
          onChange={handleInputChange}
          placeholder="Search..."
          className={styles.input}
        />
      </form>
    </div>
  );
}
