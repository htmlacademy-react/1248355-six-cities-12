import { Block } from '../../consts/enum';

type PriceProps = {
  price: number;
  block: Block;
}

const Price = ({ price, block }: PriceProps) => (
  <div className={`${block}__price`}>
    <b className={`${block}__price-value`}>
      &euro;{price}
    </b>
    <span className={`${block}__price-text`}>&nbsp;night</span>
  </div>
);

export default Price;
