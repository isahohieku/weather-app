import { Button as BSButton } from 'react-bootstrap';

interface ButtonProps extends HTMLButtonElement {
  onClick(): void;
}

const Button = ({ onClick, className }: Partial<ButtonProps>) => {
  return <BSButton onClick={onClick} className={className} />;
};

export default Button;
