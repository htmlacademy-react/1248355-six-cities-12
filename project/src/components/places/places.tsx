import React, { ReactNode } from 'react';
import classNames from 'classnames';

type PlacesProps = {
  children: ReactNode;
  className: string;
}

const Places = ({ children, className }: PlacesProps) => (
  <section className={classNames(className, 'places')}>
    {children}
  </section>
);

export default Places;
