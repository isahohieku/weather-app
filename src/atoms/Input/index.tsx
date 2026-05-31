import { Input as ShadcnInput } from '@/components/ui/input';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  placeholder?: string;
}

const Input = ({ onChange, id, placeholder, ...props }: InputProps) => {
  return <ShadcnInput onChange={onChange} id={id} placeholder={placeholder} {...props} />;
};

export default Input;
