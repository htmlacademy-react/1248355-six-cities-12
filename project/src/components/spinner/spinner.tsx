import { FaSpinner } from 'react-icons/fa';
import cl from './spinner.module.css';
import classNames from 'classnames';

type SpinnerProps = {
  isActive: boolean;
  children?: JSX.Element;
  variant?: 'small' | 'primary';
}

const Spinner = ({ children, variant = 'primary', isActive = false }: SpinnerProps) => (
  isActive
    ?
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: variant === 'small' ? '100%' : '100vh'
    }}
    >
      <FaSpinner role="presentation" className={classNames(cl.spinner, cl[variant])}/>
    </div>
    : children || null
);

export default Spinner;
