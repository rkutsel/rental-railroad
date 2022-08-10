import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import Auth from "../utils/auth";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import InputGroup from "react-bootstrap/InputGroup";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { QUERY_CATEGORIES } from "../utils/queries";
import { ADD_PRODUCT } from "../utils/mutations";
import { storage } from "../firebase";

function ProductAddNew() {
  const { loading, data } = useQuery(QUERY_CATEGORIES);
  const [newProduct, { error }] = useMutation(ADD_PRODUCT);

  const categories = data?.categories || [];
  const [formState, setFormState] = useState({});

  const [imgUrl, setImgUrl] = useState();
  const [progresspercent, setProgresspercent] = useState(0);

  const navigate = useNavigate();

  const handleClick = (e) => {
    const categoryId = e.target.getAttribute("value");
    setFormState({
      ...formState,
      category: categoryId,
      categoryName: e.target.text,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const mutationResponse = await newProduct({
        variables: {
          name: formState.name,
          description: formState.description,
          category: formState.category,
          image: imgUrl,
          pricePerDay: formState.pricePerDay,
        },
      });

      const response = mutationResponse.data;
    } catch (e) {
      console.log(e);
    }
    setTimeout(() => {
      navigate("/profile");
    }, 1000);
  };

  const onChange = (e) => {
    return formState.category;
  };

  const handleUpload = (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    const storageRef = ref(storage, `${uuidv4()}.${file.name.split(".")[1]}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setImgUrl(url);
      }
    );
  };

  if (Auth.loggedIn()) {
    return (
      <section>
        <Container className="py-4">
          <Row className="justify-content-center">
            <Col xs={8}>
              <Container className="py-3">
                <Row className="d-flex justify-content-center"></Row>
              </Container>
              <Card>
                <Card.Title className="d-flex justify-content-center mt-3">
                  Add New Product
                </Card.Title>
                <Card.Body>
                  <Form onSubmit={handleFormSubmit}>
                    <Form.Label>Product Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Drum Kit"
                      name="productTitle"
                      id="productTitle"
                      onChange={(e) => {
                        setFormState({ ...formState, name: e.target.value });
                      }}
                      className="mb-2"
                    />
                    <Form.Label>Product Description</Form.Label>
                    <InputGroup>
                      <Form.Control
                        as="textarea"
                        aria-label="With textarea"
                        placeholder="Drum kit for kids ages 10-16"
                        className="mb-2"
                        onChange={(e) => {
                          setFormState({
                            ...formState,
                            description: e.target.value,
                          });
                        }}
                      />
                    </InputGroup>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Upload Product Photo</Form.Label>
                      <Form.Control onChange={handleUpload} type="file" />
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label>Choose Category</Form.Label>
                      <InputGroup>
                        <Form.Control
                          onChange={onChange}
                          placeholder={formState.categoryName}
                          aria-label="Text input with 2 dropdown buttons"
                        />
                        <DropdownButton
                          onChange={(e) => {
                            setFormState({
                              ...formState,
                              category: e.target.value,
                            });
                          }}
                          variant="outline-primary"
                          title="Dropdown"
                          id="input-group-dropdown-4"
                          align="end"
                        >
                          {categories.map((item) => (
                            <Dropdown.Item
                              onClick={handleClick}
                              value={item._id}
                              key={item._id}
                            >
                              {item.name}
                            </Dropdown.Item>
                          ))}
                        </DropdownButton>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Price Per Day</Form.Label>
                      <InputGroup className="mb-3">
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control
                          placeholder="9.99"
                          onChange={(e) => {
                            setFormState({
                              ...formState,
                              pricePerDay: parseFloat(e.target.value),
                            });
                          }}
                          aria-label="Dollar amount (with dot and two decimal places)"
                        />
                      </InputGroup>
                    </Form.Group>
                    <Stack gap={2} className="col-md-5 mx-auto mb-2">
                      <Button type="submit">Add Product</Button>
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
}

export default ProductAddNew;
