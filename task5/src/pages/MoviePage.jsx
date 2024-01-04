import { useEffect, useContext } from "react";
import { Button, Tag, Descriptions, Typography, Space, Flex } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { MoviesContext } from "../MoviesContext";

const MoviePage = () => {
	const { currentMovie, setCurrentMovie, favorites, setFavorites } =
		useContext(MoviesContext);

	const { id } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		const fetchMovie = async () => {
			try {
				const { data } = await axios.get(`/movies/${id}`);
				setCurrentMovie(data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchMovie();
	}, [id]);

	if (!currentMovie) {
		return (
			<Flex align="center" justify="center" style={{ width: "100%" }}>
				<Typography level={2}>Фильм с айди {id} не найден</Typography>
			</Flex>
		);
	}

	const isFavorite = favorites.find((movie) => movie.id === currentMovie?.id);

	return (
		<Flex vertical style={{ padding: 20 }}>
			<Flex align="center" justify="space-between" style={{ marginBottom: 20 }}>
				<Space>
					<Tag>Номер {id}</Tag>
					{isFavorite ? (
						<Tag
							onClick={() =>
								setFavorites((p) => {
									localStorage.setItem(
										"favorites",
										JSON.stringify(
											p.filter((movie) => movie.id !== currentMovie?.id)
										)
									);
									return p.filter((movie) => movie.id !== currentMovie?.id);
								})
							}
							icon={<CloseCircleOutlined />}
							style={{ cursor: "pointer" }}
							color="error"
						>
							Удалить из избранного
						</Tag>
					) : (
						<Tag
							onClick={() =>
								setFavorites((p) => {
									localStorage.setItem(
										"favorites",
										JSON.stringify([...p, currentMovie])
									);
									return [...p, currentMovie];
								})
							}
							icon={<CheckCircleOutlined />}
							style={{ cursor: "pointer" }}
							color="success"
						>
							Добавить в избранное
						</Tag>
					)}
				</Space>
				<Button onClick={() => navigate("/editMovie")}>Редактировать</Button>
			</Flex>
			<Flex gap={20} style={{ marginBottom: 32 }}>
				<img
					onError={(e) => {
						e.target.src =
							"https://images.squarespace-cdn.com/content/v1/5a79de08aeb625f12ad4f85a/1527015265032-KYY1AQ4NCW6NB7BK1NDH/placeholder-image-vertical.png";
					}}
					width="250"
					height="400"
					src={currentMovie?.posterUrl}
					alt={"Film poster"}
				/>
				<Flex vertical>
					<Typography.Title level={2} style={{ marginBottom: 0 }}>
						{currentMovie?.title}
					</Typography.Title>
					<Typography.Title
						level={5}
						style={{ marginTop: 8, marginBottom: 20 }}
					>
						{currentMovie?.director}
					</Typography.Title>
					<Descriptions title="Параметры" column={1}>
						<Descriptions.Item label="Год производства">
							{currentMovie?.year}
						</Descriptions.Item>
						<Descriptions.Item label="Продолжительность">
							{currentMovie?.runtime} мин.
						</Descriptions.Item>
						<Descriptions.Item label="Жанры">
							{currentMovie?.genres?.join(", ")}
						</Descriptions.Item>
						<Descriptions.Item label="Актеры">
							{currentMovie?.actors}
						</Descriptions.Item>
					</Descriptions>
				</Flex>
			</Flex>
			<Typography.Title level={2}>Описание</Typography.Title>
			<Typography.Paragraph>{currentMovie?.plot}</Typography.Paragraph>
		</Flex>
	);
};

export default MoviePage;
