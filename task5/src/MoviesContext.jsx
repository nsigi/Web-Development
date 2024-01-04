import { useEffect, useState, createContext } from "react";
import axios from "axios";

import useDebounce from "./hooks/useDebounce";

export const MoviesContext = createContext();

const MoviesContextProvider = ({ children }) => {
	const [movies, setMovies] = useState([]);

	const [search, setSearch] = useState("");
	const debouncedValue = useDebounce(search);

	const [favorites, setFavorites] = useState([]);

	const [currentMovie, setCurrentMovie] = useState(null);

	useEffect(() => {
		setFavorites(JSON.parse(localStorage.getItem("favorites")) ?? []);
	}, []);

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const { data } = await axios.get(`/movies/?q=${debouncedValue}`);
				setMovies(data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchMovies();
	}, [debouncedValue]);

	return (
		<MoviesContext.Provider
			value={{
				movies,
				setMovies,
				search,
				setSearch,
				currentMovie,
				setCurrentMovie,
				favorites,
				setFavorites,
			}}
		>
			{children}
		</MoviesContext.Provider>
	);
};

export default MoviesContextProvider;
