import { AppRoute, City } from '../../consts/enum';
import { generatePath, NavLink } from 'react-router-dom';
import classNames from 'classnames';

const Tabs = () => (
  <div className="tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {Object.values(City).map((city) => (
          <li key={city} className="locations__item">
            <NavLink
              className={({ isActive }) =>
                classNames({ 'tabs__item--active': isActive }, 'locations__item-link tabs__item')}
              to={generatePath(AppRoute.City, { city })}
              end
            >
              <span>{city}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </section>
  </div>
);

export default Tabs;
