import style from './Rates.module.css';
import { WEBSOCKET_URL_API } from '../../../../api/constants';
import useWebSocket from 'react-use-websocket';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ArrowIcon } from './ArrowIcon';

export const Rates = () => {
  const [rates, setRates] = useState([]);

  const updateRates = (message) => {
    setRates((prevRates) => {
      const updatedRates = { ...prevRates };
      const key = `${message.from}-${message.to}`;
      updatedRates[key] = message;
      return { ...updatedRates };
    });
  };

  useWebSocket(`${WEBSOCKET_URL_API}/currency-feed`, {
    onMessage: (messageEvent) => {
      const message = JSON.parse(messageEvent.data);
      if (
        message.type !== 'EXCHANGE_RATE_CHANGE' ||
        !message.change
      ) return;

      updateRates(message);
    },
    shouldReconnect: () => true,
  });

  return (
    <div className={style.wrapper}>
      <h3 className={style.title}>Курс валют</h3>
      <div>
        {rates && (
          Object.values(rates).map(({ from, to, change, rate }) => (
            <div key={uuidv4()} className={style.tr}>
              <span className={style['td_first']}>
                {from}/{to}
              </span>
              <span className={style['td_second']}></span>
              <span className={style['td_third']}>
                {rate}
              </span>
              <div className={style.svg}>
                <ArrowIcon change={change} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
