import React from 'react';
import { Block } from '../../../consts/enum';

type MarkProps = {
  block: Block;
}

const Mark = ({ block }: MarkProps) => (
  <div className={`${block}__mark`}>
    <span>Premium</span>
  </div>
);

export default Mark;
