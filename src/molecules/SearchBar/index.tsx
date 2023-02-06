import type { FormEvent } from 'react';
import { useState } from 'react';
import type { FormControlProps } from 'react-bootstrap';
import { Col, Container, Row, Form } from 'react-bootstrap';
import { MapPin } from 'react-feather';
import Button from '../../atoms/button';
import Input from '../../atoms/input';
import styles from './styles.module.scss';

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

  const searchCity = (e: FormEvent): void => {
    e.preventDefault();
    if (!search) return;
    onSearch(search);
  };

  return (
    <Container className="mt-5">
      <Row className="d-flex justify-content-center">
        <Col md={6}>
          <Form className="d-flex" onSubmit={searchCity}>
            <div className={styles.inputWrapper}>
              <MapPin /> <Input onChange={onChange} id="search" placeholder="Search City" />
            </div>
            <Button innerText="Search" className={styles.button} />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchBar;
