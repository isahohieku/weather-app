import type { FormControlProps } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';

interface InputProps {
  onChange(props: FormControlProps): void;
  id: string;
}

const Input = ({ onChange, id }: InputProps) => {
  return <FormControl onChange={onChange} id={id} />;
};

export default Input;
