import { Button as BSButton } from 'react-bootstrap';

type button = 'submit' | 'button';

interface ButtonProps extends HTMLElement {
  onClick(): void;
  text: string;
  type: button;
}

const Button = ({ onClick, className, innerText, type = 'submit' }: Partial<ButtonProps>) => {
  return (
    <BSButton onClick={onClick} className={className} type={type}>
      {innerText}
    </BSButton>
  );
};

export default Button;
