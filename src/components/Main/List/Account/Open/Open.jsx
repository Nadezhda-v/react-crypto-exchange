import style from './Open.module.css';
import { formatDate } from '../../../../../utils/formatDate';
import PropTypes from 'prop-types';

export const Open = ({ date }) => (
  <div className={style.wrapper}>
    <p className={style.text}>открыт</p>
    <time className={style.date} dateTime={date}>
      {formatDate(date)}
    </time>
  </div>
);

Open.propTypes = {
  date: PropTypes.string,
};
