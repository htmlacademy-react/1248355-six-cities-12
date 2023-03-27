import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import cl from './spinner.module.css';
import classNames from 'classnames';
import { AuthorizationStatus } from '../../consts/enum';
import { useAppSelector } from '../../hooks/store';

type SpinnerProps = {
  withLoading?: boolean;
  children: JSX.Element;
  variant?: string;
}

const Spinner = ({ withLoading = true, children, variant = 'primary' }: SpinnerProps) => {
  const isLoading = useAppSelector((state) => state.api.isLoading);
  const authorizationStatus = useAppSelector((state) => state.api.authorizationStatus);

  return (
    (withLoading && isLoading) || authorizationStatus === AuthorizationStatus.Unknown
      ?
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
      ><FaSpinner className={classNames(cl.spinner, cl[variant])}/>
      </div>
      : children
  );
};

export default Spinner;
