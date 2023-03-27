import { ReactNode } from 'react';
import { FaSpinner } from 'react-icons/fa';
import cl from './spinner.module.css';
import classNames from 'classnames';
import { AuthorizationStatus } from '../../consts/enum';
import { useAppSelector } from '../../hooks/store';

type SpinnerProps = {
  withLoading?: boolean;
  isLoading?: boolean;
  children: ReactNode;
  variant?: 'small' | 'primary';
}

const Spinner = ({ withLoading = true, children, variant = 'primary', isLoading = false }: SpinnerProps) => {
  const isGlobalLoading = useAppSelector((state) => state.api.isLoading);
  const authorizationStatus = useAppSelector((state) => state.api.authorizationStatus);

  return (
    (withLoading && (isGlobalLoading || isLoading)) || authorizationStatus === AuthorizationStatus.Unknown
      ?
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: variant === 'small' ? '100%' : '100vh'
      }}
      ><FaSpinner className={classNames(cl.spinner, cl[variant])}/>
      </div>
      : <>{children}</>
  );
};

export default Spinner;
