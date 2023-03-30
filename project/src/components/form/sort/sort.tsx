import React, { KeyboardEventHandler, MouseEventHandler, useState } from 'react';
import { SortType } from '../../../consts/enum';
import classNames from 'classnames';
import cl from './styles.module.css';
import { useAppDispatch } from '../../../hooks/store';
import { ENTER_KEY } from '../../../consts/app';
import { sortCityOffers } from '../../../store/reducers/cities-slice/cities-slice';

const sortTypeToTitle = {
  [SortType.Popular]: 'Popular',
  [SortType.RatedFirst]: 'Top rated first',
  [SortType.HighToLow]: 'Price: high to low',
  [SortType.LowToHigh]: 'Price: low to high'
};

const Sort = () => {
  const [isSortOpened, setSortState] = useState(false);
  const [activeSort, setActiveSort] = useState<SortType>(SortType.Popular);
  const dispatch = useAppDispatch();

  const handleSortOptionChange = (currentTarget: EventTarget & HTMLLIElement) => {
    const { sort } = currentTarget.dataset;

    if (sort) {
      setActiveSort(sort as SortType);
      setSortState(!isSortOpened);
      dispatch(sortCityOffers(sort as SortType));
    }
  };

  const onOpenPanelClick = () => {
    setSortState(!isSortOpened);
  };

  const onOpenPanelKeyDown: KeyboardEventHandler<HTMLSpanElement> = ({ key }) => {
    if (key === ENTER_KEY) {
      setSortState(!isSortOpened);
    }
  };

  const onOptionClick: MouseEventHandler<HTMLLIElement> = ({ currentTarget }) => {
    handleSortOptionChange(currentTarget);
  };

  const onOptionKeyDown: KeyboardEventHandler<HTMLLIElement> = ({ currentTarget, key }) => {
    if (key === ENTER_KEY) {
      handleSortOptionChange(currentTarget);
    }
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span style={{ marginRight: '5px' }} className="places__sorting-caption">Sort by</span>
      <span
        onKeyDown={onOpenPanelKeyDown}
        onClick={onOpenPanelClick}
        className="places__sorting-type" tabIndex={0}
      >
        {sortTypeToTitle[activeSort]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={classNames('places__options places__options--custom', { 'places__options--opened': isSortOpened })}
      >{
          Object.values(SortType).map((type, index) => (
            <li
              onKeyDown={onOptionKeyDown}
              onClick={onOptionClick}
              key={`${index.toString()}-${type}`}
              data-sort={type}
              className={classNames(cl.sort, 'places__option', { 'places__option--active': activeSort === type })}
              tabIndex={0}
            >{sortTypeToTitle[type]}
            </li>
          ))
        }
      </ul>
    </form>
  );
};

export default Sort;
