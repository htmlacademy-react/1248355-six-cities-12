import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import cl from './spinner.module.css';
import classNames from 'classnames';
import { AuthorizationStatus } from '../../consts/enum';
import { useAppSelector } from '../../hooks/store';

type SpinnerProps = {
  variant?: string;
  children: JSX.Element;
}

const Spinner = ({ variant = 'primary', children }: SpinnerProps) => {
  const isLoading = useAppSelector((state) => state.api.isLoading);
  const authorizationStatus = useAppSelector((state) => state.api.authorizationStatus);

  return (
    isLoading || authorizationStatus === AuthorizationStatus.Unknown
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
