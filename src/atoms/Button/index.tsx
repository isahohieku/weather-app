import { Button as ShadcnButton } from '@/components/ui/button';

type button = 'submit' | 'button';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?(): void;
  innerText: string;
  type?: button;
}

const Button = ({ onClick, className, innerText, type = 'submit' }: ButtonProps) => {
  return (
    <ShadcnButton onClick={onClick} className={className} type={type}>
      {innerText}
    </ShadcnButton>
  );
};

export default Button;
