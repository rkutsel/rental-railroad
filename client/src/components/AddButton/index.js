import Button from "react-bootstrap/Button";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css";

function AddBtn(props) {
  return (
    <Container>
      <Row className="d-flex flex-row-reverse m-2 p-2">
        <Button
          size="lg"
          className="btn-size"
          as={Link}
          to={props.BtnProp.link}
        >
          {props.BtnProp.action}
        </Button>
      </Row>
    </Container>
  );
}

export default AddBtn;
