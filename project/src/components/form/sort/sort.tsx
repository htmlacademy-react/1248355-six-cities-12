import { KeyboardEventHandler, MouseEventHandler, useState } from 'react';
import { SortType } from '../../../consts/enum';
import classNames from 'classnames';
import cl from './styles.module.css';
import { useAppDispatch } from '../../../hooks/store';
import { sortCities } from '../../../store/actions';

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

  const handleSortOptionAction = (currentTarget: EventTarget & HTMLLIElement) => {
    const { sort } = currentTarget.dataset;
    if (sort) {
      setActiveSort(sort as SortType);
      setSortState(!isSortOpened);
      dispatch(sortCities(sort as SortType));
    }
  };

  const onSortOpenPanelClick = () => {
    setSortState(!isSortOpened);
  };

  const onSortOpenPanelKeyDown: KeyboardEventHandler<HTMLSpanElement> = ({ key }) => {
    if (key === 'Enter') {
      setSortState(!isSortOpened);
    }
  };

  const onSortOptionClick: MouseEventHandler<HTMLLIElement> = ({ currentTarget }) => {
    handleSortOptionAction(currentTarget);
  };

  const onSortOptionKeyDown: KeyboardEventHandler<HTMLLIElement> = ({ currentTarget, key }) => {
    if (key === 'Enter') {
      handleSortOptionAction(currentTarget);
    }
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span style={{ marginRight: '5px' }} className="places__sorting-caption">Sort by</span>
      <span
        onKeyDown={onSortOpenPanelKeyDown}
        onClick={onSortOpenPanelClick} className="places__sorting-type" tabIndex={0}
      >
        {sortTypeToTitle[activeSort]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${isSortOpened ? 'places__options--opened' : ''}`}
      >{
          Object.values(SortType).map((type, index) => (
            <li
              onKeyDown={onSortOptionKeyDown}
              onClick={onSortOptionClick}
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
