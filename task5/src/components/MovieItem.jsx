import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Tag, Space } from "antd";

import { MoviesContext } from "../MoviesContext";

const Movie = ({ movie }) => {
	const navigate = useNavigate();

	const { setCurrentMovie } = useContext(MoviesContext);

	return (
		<Card
			hoverable
			size="small"
			title={movie.title}
			onClick={() => {
				setCurrentMovie(movie);
				navigate("/movie/" + movie.id);
			}}
			style={{ cursor: "pointer" }}
		>
			<Space wrap>
				<Tag color="blue">{movie.year}</Tag>
				{movie.genres.map((genre) => (
					<Tag key={genre}>{genre}</Tag>
				))}
			</Space>
		</Card>
	);
};

export default Movie;
