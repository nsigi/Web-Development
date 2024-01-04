import { Routes, Route } from "react-router-dom";
import { Button, Typography, Flex, Layout } from "antd";
import { Link } from "react-router-dom";

import MoviePage from "./pages/MoviePage";
import EditMoviePage from "./pages/EditMoviePage";
import AddMoviePage from "./pages/AddMoviePage";
import Sidebar from "./components/Sidebar";

function App() {
	return (
		<Layout>
			<Layout.Header
				style={{
					width: "100%",
					padding: "12px 20px",
					boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.15)",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					background: "#fff",
				}}
			>
				<Typography.Title level={4} style={{ marginBottom: 0 }}>
					<Link to="/">Админка фильмотеки</Link>
				</Typography.Title>
				<Button>Никита Степанов 6408</Button>
			</Layout.Header>
			<Flex style={{ height: "calc(100vh - 64px)" }}>
				<Sidebar />
				<Routes>
					<Route
						path="/"
						element={
							<Flex align="center" justify="center" style={{ width: "100%" }}>
								<Typography.Title level={2}>Выберите фильм</Typography.Title>
							</Flex>
						}
					/>
					<Route path="/movie/:id" element={<MoviePage />} />
					<Route path="/addMovie" element={<AddMoviePage />} />
					<Route path="/editMovie" element={<EditMoviePage />} />
				</Routes>
			</Flex>
		</Layout>
	);
}

export default App;
