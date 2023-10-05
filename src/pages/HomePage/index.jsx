import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import HomeSkeleton from "./skeleton";
import CarauselSection from "./section/CarauselSection";
import CardMovie from "../../components/CardMovie";
import Navbar from "../../components/Navbar";
import { useSearch } from "../../contexts/SearchContext";

const HomePage = () => {
  const [popularMovieList, setPopularMovieList] = useState([]);
  const [carauselMovieList, setCarauselMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    isSearch,
    search,
    isSearchLoading,
    searchResults,
    handleClearSearch,
  } = useSearch();

  const popularMovie = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/movie/popular");
      const results = await response.data;

      setPopularMovieList(results.results);
      setCarauselMovieList(results.results.slice(0, 4));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    popularMovie();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-slate-950 text-white">
        {isSearch ? (
          <section className="container min-h-[100vh] pb-10 pt-28">
            <div className="flex items-center justify-between pb-4">
              <h1 className="text-2xl font-bold">
                Search Movie :{" "}
                <span className="font-semibold italic">"{search}"</span>
              </h1>
              <button
                className="rounded-md bg-red-600 px-3 py-2 transition-colors hover:bg-red-800"
                onClick={handleClearSearch}
              >
                Clear seach result
              </button>
            </div>
            {isSearchLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="grid lg:grid-cols-4 gap-x-10 gap-y-8 md:grid-cols-3 grid-cols-1">
                {searchResults.length === 0 ? (
                  <p>Movies not found</p>
                ) : (
                  searchResults.map((movie) => (
                    <CardMovie key={movie.id} movie={movie} />
                  ))
                )}
              </div>
            )}
          </section>
        ) : isLoading ? (
          <HomeSkeleton />
        ) : (
          <>
            <CarauselSection carauselMovieList={carauselMovieList} />

            <section className="container  py-10">
              <h1 className="pb-4 text-2xl font-bold">Popular Movies</h1>
              <div className="grid lg:grid-cols-4 gap-x-10 gap-y-8 md:grid-cols-3 grid-cols-1">
                {popularMovieList.map((movie) => (
                  <CardMovie key={movie.id} movie={movie} />
                ))}
              </div>
            </section>

            <footer className="text-center py-5 text-lg">Made With 💕 Alivia Kusuma Reza</footer>
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;
