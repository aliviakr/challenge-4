import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchLoading, setIsSearchIsLoading] = useState(false);

  const handleClearSearch = (e) => {
    e.preventDefault();
    setIsSearch(false);
    setSearch("");
    setSearchResults([]);
    navigate("/");
  };

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        isSearch,
        setIsSearch,
        searchResults,
        setSearchResults,
        isSearchLoading,
        setIsSearchIsLoading,
        handleClearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
