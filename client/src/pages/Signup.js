import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

import "./styles.css";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";

function Signup(props) {
	const [formState, setFormState] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [addUser] = useMutation(ADD_USER);

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		const mutationResponse = await addUser({
			variables: {
				firstName: formState.firstName,
				lastName: formState.lastName,
				email: formState.email,
				password: formState.password,
			},
		});
		const token = mutationResponse.data.addUser.token;
		Auth.login(token);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormState({
			...formState,
			[name]: value,
		});
	};
	const navigate = useNavigate();
	return (
		<section>
			<Container className="py-4">
				<Row className="justify-content-center">
					<Col xs={7}>
						<Container className="py-3">
							<Row className="d-flex justify-content-center">
								<Col xs={4}>
									<h1>Signup</h1>
								</Col>
							</Row>
						</Container>
						<Card>
							<Card.Body>
								<Form onSubmit={handleFormSubmit}>
									<Card.Title>First Name</Card.Title>
									<Form.Control
										type="text"
										placeholder="Robert"
										name="firstName"
										id="firstName"
										onChange={handleChange}
										className="mb-2"
									/>
									<Card.Title>Last Name</Card.Title>
									<Form.Control
										type="text"
										placeholder="Williams"
										name="lastName"
										id="lastName"
										onChange={handleChange}
										className="mb-2"
									/>
									<Form.Group className="mb-2">
										<Card.Title>Email Address</Card.Title>
										<Form.Control
											type="email"
											placeholder="robert@mail.com"
											name="email"
											id="email"
											onChange={handleChange}
										/>
									</Form.Group>
									<Form.Group className="mb-3">
										<Card.Title>Password</Card.Title>
										<Form.Control
											placeholder="********"
											name="password"
											type="password"
											id="pwd"
											onChange={handleChange}
										/>
									</Form.Group>
									<Stack gap={2} className="col-md-5 mx-auto">
										<Button variant="outline-primary" type="submit">
											Signup
										</Button>
										<Button
											onClick={() => navigate("/login")}
											variant="outline-success"
											type="button"
										>
											Login
										</Button>
									</Stack>
								</Form>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</section>
	);
}

export default Signup;
