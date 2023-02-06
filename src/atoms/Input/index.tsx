import type { FormControlProps } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';

interface InputProps {
  onChange(props: FormControlProps): void;
  id: string;
  placeholder?: string;
}

const Input = ({ onChange, id, placeholder }: InputProps) => {
  return <FormControl onChange={onChange} id={id} placeholder={placeholder} />;
};

export default Input;
