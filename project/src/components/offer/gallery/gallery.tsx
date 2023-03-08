import React from 'react';
import { createRandomElementsArray } from '../../../utils/common';
import { OFFER_SCREEN_IMG_COUNT } from '../../../consts/app';
import { Offer } from '../../../types/offers';

type GalleryProps = Pick<Offer, 'images' | 'type'>

const Gallery = ({ images, type }: GalleryProps) => (
  <div className="property__gallery">
    {createRandomElementsArray(images, OFFER_SCREEN_IMG_COUNT).map(((image) => (
      <div key={image} className="property__image-wrapper">
        <img className="property__image" src={image} alt={type}/>
      </div>
    )))}
  </div>
);

export default Gallery;
