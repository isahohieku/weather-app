import { Frown } from 'react-feather';
import styles from './styles.module.scss';
interface Props {
  search: string | null;
}

const ErrorView = ({ search }: Props) => {
  return (
    <div className={styles.wrapper}>
      <Frown size={50} />
      <p>
        Ops! Weather report for {search ?? 'current search'} not found, Please search another
        location!
      </p>
    </div>
  );
};

export default ErrorView;
