import React, { ReactNode } from 'react';

type CitiesProps = {
  children: ReactNode;
}

const Cities = ({ children }: CitiesProps) => (
  <div className="cities">
    <div className="cities__places-container container">
      {children}
    </div>
  </div>
);

export default Cities;
