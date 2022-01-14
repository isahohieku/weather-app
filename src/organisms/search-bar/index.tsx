import { useState } from 'react';
import type { FormControlProps } from 'react-bootstrap';
import { Col, Container, Row } from 'react-bootstrap';
import Button from '../../atoms/button';
import Input from '../../atoms/input';

interface InputEvent extends FormControlProps {
  target: {
    value: string;
  };
}

interface ISearchBar {
  onSearch(search: string): void;
}

const SearchBar = ({ onSearch }: ISearchBar) => {
  const [search, setSearch] = useState<string>('');

  const onChange = ({ target: { value } }: InputEvent) => {
    setSearch(value);
  };

  const searchCity = (): void => {
    if (!search) return;
    onSearch(search);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Input onChange={onChange} id="search" />
          <Button onClick={() => searchCity()} innerText="Search" />
        </Col>
      </Row>
    </Container>
  );
};

export default SearchBar;
