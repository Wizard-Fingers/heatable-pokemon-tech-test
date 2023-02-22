export default function Search({ onSearch }) {
  const handleInputChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="flex justify-center py-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="border border-black rounded-xl p-4 bg-purple-700 w-[24rem] flex justify-center"
      >
        <input
          type="text"
          onChange={handleInputChange}
          placeholder="Search..."
          className="p-2 rounded-xl w-[22rem]"
        />
      </form>
    </div>
  );
}
