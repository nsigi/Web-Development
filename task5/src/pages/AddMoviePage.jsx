import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
	Button,
	Typography,
	Form,
	Input,
	Flex,
	Divider,
	notification,
} from "antd";
import axios from "axios";

import { DEFAULT_STATE } from "../constants";
import { MoviesContext } from "../MoviesContext";

const AddMoviePage = () => {
	const [form] = Form.useForm();
	const [api, contextHolder] = notification.useNotification();
	const [formState, setFormState] = useState(DEFAULT_STATE);

	const navigate = useNavigate();

	const { setMovies, movies } = useContext(MoviesContext);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (Object.values(formState).some((value) => !Boolean(value))) {
			api.error({
				message: "Ошибка",
				description: "Пожалуйста, заполните все поля",
				placement: "top",
			});
			return;
		}

		const addMovie = async () => {
			try {
				const { data } = await axios.post("/movies", {
					...formState,
					id: movies.length + 1,
				});

				setMovies((prevState) => [...prevState, data]);

				navigate("/movie/" + data.id);
			} catch (error) {
				console.log(error);
			}
		};
		addMovie();

		setFormState(DEFAULT_STATE);
	};

	const handleChange = (e) => {
		setFormState({
			...formState,
			[e.target.name]:
				e.target.name === "genres"
					? e.target.value.split(", ")
					: e.target.value,
		});
	};

	return (
		<Flex vertical style={{ padding: 20, width: "100%", position: "relative" }}>
			{contextHolder}
			<Typography.Title>Создать фильм</Typography.Title>
			<Form
				form={form}
				layout="vertical"
				style={{
					height: 0,
					flexGrow: 1,
					overflow: "scroll",
					padding: "0 0 60px",
				}}
			>
				<Form.Item
					label="Название фильма"
					required
					tooltip="This is a required field"
				>
					<Input
						value={formState.title}
						onChange={handleChange}
						required
						name="title"
					/>
				</Form.Item>
				<Form.Item
					label="Обложка фильма"
					required
					tooltip="This is a required field"
				>
					<Input
						value={formState.posterUrl}
						onChange={handleChange}
						required
						name="posterUrl"
						type="url"
					/>
				</Form.Item>
				<Form.Item
					label="Имя режисера"
					required
					tooltip="This is a required field"
				>
					<Input
						value={formState.director}
						onChange={handleChange}
						name="director"
						required
					/>
				</Form.Item>
				<Form.Item
					label="Год выпуска"
					required
					tooltip="This is a required field"
				>
					<Input
						value={formState.year}
						onChange={handleChange}
						type="number"
						name="year"
						required
					/>
				</Form.Item>
				<Form.Item
					label="Продолжительность (мин.)"
					required
					tooltip="This is a required field"
				>
					<Input
						value={formState.runtime}
						onChange={handleChange}
						type="number"
						name="runtime"
						required
					/>
				</Form.Item>
				<Form.Item label="Жанры" required tooltip="This is a required field">
					<Input
						value={formState.genres.join(", ")}
						onChange={handleChange}
						type="text"
						name="genres"
						required
					/>
				</Form.Item>
				<Form.Item label="Актеры" required tooltip="This is a required field">
					<Input
						value={formState.actors}
						onChange={handleChange}
						type="text"
						name="actors"
						required
					/>
				</Form.Item>
				<Form.Item
					label="Описание фильма"
					required
					tooltip="This is a required field"
				>
					<Input.TextArea
						value={formState.plot}
						onChange={handleChange}
						type="text"
						name="plot"
						rows={3}
						required
					/>
				</Form.Item>
			</Form>
			<Flex
				vertical
				style={{
					position: "absolute",
					left: 0,
					right: 0,
					bottom: 0,
					padding: "0 20px 20px",
					background: "#f5f5f5",
				}}
			>
				<Divider />
				<Flex gap={16} justify="flex-end">
					<Button onClick={() => navigate(-1)}>Отмена</Button>
					<Button onClick={handleSubmit} type="primary">
						Сохранить
					</Button>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default AddMoviePage;
