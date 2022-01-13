import type { FormControlProps } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';

interface InputProps {
  onChange(props: FormControlProps): void;
}

const Input = ({ onChange }: InputProps) => {
  return <FormControl onChange={onChange} />;
};

export default Input;
