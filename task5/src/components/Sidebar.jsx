import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Flex } from "antd";

import { MoviesContext } from "../MoviesContext";
import Search from "./Search";
import MoviesList from "./MoviesList";

const Sidebar = () => {
	const { movies } = useContext(MoviesContext);

	const navigate = useNavigate();

	return (
		<Flex vertical style={{ padding: "20px 12px", minWidth: 300 }}>
			<Search />
			<MoviesList />
			<Flex vertical align="end">
				<Divider orientation="center">Найдено {movies.length} фильмов</Divider>
				<Button type="primary" onClick={() => navigate("/addMovie")}>
					Добавить
				</Button>
			</Flex>
		</Flex>
	);
};

export default Sidebar;
