import { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
  className?: string;
}

const Container = ({ className = '', children }: ContainerProps) => (
  <div className={`${className} container`}>
    {children}
  </div>
);

export default Container;
