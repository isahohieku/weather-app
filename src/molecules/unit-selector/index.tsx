import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Toggle from '../../atoms/toggle-switch';

const UnitSelector = () => {
  const [isChecked, setChecked] = useState<boolean>(false);
  const handleChange = (checked: boolean) => {
    setChecked(checked);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Toggle checked={isChecked} onChange={handleChange} />
        </Col>
      </Row>
    </Container>
  );
};

export default UnitSelector;
