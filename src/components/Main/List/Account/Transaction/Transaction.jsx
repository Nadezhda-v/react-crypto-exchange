import style from './Transaction.module.css';
import { formatDate } from '../../../../../utils/formatDate';
import PropTypes from 'prop-types';

export const Transaction = ({ date }) => (
  <div className={style.wrapper}>
    <p className={style.text}>последняя операция</p>
    <time className={style.date} dateTime={date}>
      {formatDate(date)}
    </time>
  </div>
);

Transaction.propTypes = {
  date: PropTypes.string,
};
