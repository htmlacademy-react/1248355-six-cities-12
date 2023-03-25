import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import cl from './spinner.module.css';
import classNames from 'classnames';

type SpinnerProps = {
  variant?: string;
}

const Spinner = ({ variant = 'primary' }: SpinnerProps) => (
  <FaSpinner className={classNames(cl.spinner, cl[variant])}/>
);

export default Spinner;
