import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

import Badge from "react-bootstrap/Badge";
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
		<div>
			<Container>
				<Row className="justify-content-center">
					<Col xs={7}>
						<Container>
							<Row className="d-flex justify-content-center">
								<Col xs={3}>
									<h1>
										<Badge bg="info" className="justify-content-around">
											Sign up
										</Badge>
									</h1>
								</Col>
							</Row>
						</Container>
						<Card>
							<Card.Body>
								<Form onSubmit={handleFormSubmit}>
									<Form.Label>First Name</Form.Label>
									<Form.Control
										type="text"
										placeholder="First Name"
										name="firstName"
										id="firstName"
										onChange={handleChange}
									/>
									<Form.Label>Last Name</Form.Label>
									<Form.Control
										type="text"
										placeholder="Last Name"
										name="lastName"
										id="lastName"
										onChange={handleChange}
									/>{" "}
									<Form.Group className="mb-3">
										<Form.Label>Email address</Form.Label>
										<Form.Control
											type="email"
											placeholder="youremail@gmail.com"
											name="email"
											id="email"
											onChange={handleChange}
										/>
									</Form.Group>
									<Form.Group className="mb-3">
										<Form.Label>Password</Form.Label>
										<Form.Control
											placeholder="Password"
											name="password"
											type="password"
											id="pwd"
											onChange={handleChange}
										/>
									</Form.Group>
									<Stack gap={2} className="col-md-5 mx-auto">
										<Button variant="outline-primary" type="submit">
											Sign up
										</Button>
										<Button
											onClick={() => navigate("/login")}
											variant="outline-success"
											type="button"
										>
											Log in
										</Button>
									</Stack>
								</Form>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default Signup;
