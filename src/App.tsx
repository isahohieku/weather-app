import { Col, Container, Row } from 'react-bootstrap';
import UnitSelector from './molecules/unit-selector';

const App = () => {
  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-end">
          <UnitSelector />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
