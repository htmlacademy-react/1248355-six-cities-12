import React, { ReactNode } from 'react';
import Container from '../../../container/container';

type GalleryContainerProps = {
  children: ReactNode;
}

const GalleryContainer = ({ children }: GalleryContainerProps) => (
  <Container className="property__gallery-container">
    {children}
  </Container>
);

export default GalleryContainer;
