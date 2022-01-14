import { Button as BSButton } from 'react-bootstrap';

interface ButtonProps extends HTMLElement {
  onClick(): void;
  text: string;
}

const Button = ({ onClick, className, innerText }: Partial<ButtonProps>) => {
  return (
    <BSButton onClick={onClick} className={className}>
      {innerText}
    </BSButton>
  );
};

export default Button;
