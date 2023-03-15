import React, { ReactNode } from 'react';
import classNames from 'classnames';

type PlacesListProps = {
  children: ReactNode;
  className: string;
}

const PlacesList = ({ children, className }: PlacesListProps) => (
  <div className={classNames(className, 'places__list')}>
    {children}
  </div>
);

export default PlacesList;
