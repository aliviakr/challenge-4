import { useSearch } from "../contexts/SearchContext";
import { BsSearch } from "react-icons/bs";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const {
    search,
    setSearch,
    setSearchResults,
    setIsSearch,
    setIsSearchIsLoading,
    handleClearSearch,
  } = useSearch();

  const handleSubmitSearch = async (e) => {
    e.preventDefault();
    navigate("/");
    setIsSearch(true);
    setIsSearchIsLoading(true);
    try {
      const response = await axiosInstance.get(`/search/movie?query=${search}`);
      const { results } = response.data;
      setIsSearch(true);
      setSearchResults(results);
      setIsSearchIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsSearch(false);
    }
  };

  return (
    <nav className="absolute left-10 right-10 top-5 z-50 flex items-center justify-between">
      <button onClick={handleClearSearch}>
        <h1 className="text-2xl font-extrabold text-red-600">MovieList</h1>
      </button>
      <form
        onSubmit={handleSubmitSearch}
        className="relative flex w-80 items-center justify-center text-white"
      >
        <input
          placeholder="Seach any movies"
          id="search_movie"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full border-2 border-red-600 bg-transparent px-5 py-2 outline-none backdrop-blur-md focus:border-red-800"
        />
        <button
          type="submit"
          className="absolute bottom-1/2 right-2 translate-y-1/2 rounded-full p-2 transition-colors hover:bg-gray-950/30"
        >
          <BsSearch className="h-5 w-5" />
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
