import { FaSpinner } from 'react-icons/fa';
import cl from './spinner.module.css';
import classNames from 'classnames';
import { ReactNode } from 'react';

type SpinnerProps = {
  isActive: boolean;
  children?: ReactNode;
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
    ><FaSpinner className={classNames(cl.spinner, cl[variant])}/>
    </div>
    : children as JSX.Element
);

export default Spinner;
