import { useContext } from "react";
import { Flex } from "antd";

import { MoviesContext } from "../MoviesContext";
import MovieItem from "./MovieItem";

const MoviesList = () => {
	const { movies } = useContext(MoviesContext);

	return (
		<Flex
			vertical
			gap={16}
			style={{
				marginTop: 12,
				padding: "10px 6px",
				height: 0,
				flexGrow: 1,
				overflowY: "scroll",
			}}
		>
			{movies.map((movie) => (
				<MovieItem key={movie.id} movie={movie} />
			))}
		</Flex>
	);
};

export default MoviesList;
