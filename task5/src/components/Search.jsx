import { useContext } from "react";
import { Input, Flex } from "antd";

import { MoviesContext } from "../MoviesContext";

const Search = () => {
	const { search, setSearch } = useContext(MoviesContext);

	return (
		<Flex align="center" justify="center" style={{ padding: "0px 6px" }}>
			<Input.Search
				value={search}
				placeholder="Название фильма..."
				onChange={(e) => setSearch(e.target.value)}
				id="search"
				autoComplete="off"
			/>
		</Flex>
	);
};

export default Search;
