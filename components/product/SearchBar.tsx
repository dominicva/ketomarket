export default function SearchBar({
  searchTerm,
  onSearchTermChange,
}: {
  searchTerm: string;
  onSearchTermChange: (searchTerm: string) => void;
}) {
  return (
    <div className="m-auto flex max-w-5xl flex-col gap-4 px-4 lg:px-8">
      <div className="flex flex-col gap-2">
        <label htmlFor="search" className="text-sm font-medium">
          Search
        </label>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search for products"
          value={searchTerm}
          onChange={e => onSearchTermChange(e.target.value)}
          className="max-w-sm rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
  );
}
