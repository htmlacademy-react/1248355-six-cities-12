import React, { ReactNode } from 'react';

type MapContainerProps = {
  children: ReactNode;
}

const MapContainer = ({ children }: MapContainerProps) => (
  <div className="cities__right-section">
    {children}
  </div>
);

export default MapContainer;
