import React from 'react';
import { Host as HostType, Offer } from '../../../types/offers';

type HostProps = {
  host: HostType & Pick<Offer, 'description'>;
};

const Host = ({ host: { isPro, name, avatarUrl, description } }: HostProps) => (
  <div className="property__host">
    <h2 className="property__host-title">Meet the host</h2>
    <div className="property__host-user user">
      <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
        <img
          className="property__avatar user__avatar"
          src={avatarUrl}
          width="74"
          height="74"
          alt="Host avatar"
        />
      </div>
      <span className="property__user-name">
        {name}
      </span>
      {isPro && <span className="property__user-status">&apos;Pro&apos;</span>}
    </div>
    <div className="property__description">
      <p className="property__text">
        {description}
      </p>
    </div>
  </div>
);

export default Host;
