import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

import "./styles.css";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";

function Login(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
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
                <Col xs={3}>
                  <h1>Login</h1>
                </Col>
              </Row>
            </Container>
            <Card>
              <Card.Body>
                <Form onSubmit={handleFormSubmit}>
                  <Form.Group className="mb-3">
                    <Card.Title>Email Address</Card.Title>
                    <Form.Control
                      type="email"
                      placeholder="robert@email.com"
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
                    <Button variant="outline-success" type="submit">
                      Login
                    </Button>
                    <Button
                      onClick={() => navigate("/signup")}
                      variant="outline-primary"
                      type="button"
                    >
                      Signup
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

export default Login;
