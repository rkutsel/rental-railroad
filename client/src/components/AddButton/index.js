import Button from 'react-bootstrap/Button';
import { Container, Row } from 'react-bootstrap';
import "./style.css";

function AddBtn(props) {
  return (
    <Container>
      <Row className = "d-flex flex-row-reverse m-2 p-2">
          <Button href= {props.BtnProp.link} size = "lg" className="btn-size"> {props.BtnProp.action} </Button>{' '}
      </Row>
    </Container>
  );
}

export default AddBtn;