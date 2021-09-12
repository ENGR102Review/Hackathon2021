import React from 'react';
import './Coin.css';

const Coin = ({
  name,
  price,
  symbol,
  marketcap,
  volume,
  image,
  priceChangePercent,
  priceChangeAmount,
}) => {
  return (
    <div className='coin-container'>
      <div className='coin-row'>
        <div className='coin'>
          <img src={image} alt='crypto' />
          <h1>{name}</h1>
          <p className='coin-symbol'>{symbol}</p>
        </div>
        <div className='coin-data'>
          <p className='coin-price'>${price}</p>
          <p className='coin-volume'>${volume.toLocaleString()}</p>

          {priceChangePercent < 0 ? (
            <p className='coin-percent red'>{priceChangePercent.toFixed(2)}%</p>
          ) : (
            <p className='coin-percent green'>{priceChangePercent.toFixed(2)}%</p>
          )}

          {priceChangeAmount < 0 ?(
              <p className='coin-percent red'>${priceChangeAmount.toFixed(2)}</p>
          ) : (
              <p className='coin-percent green'>${priceChangeAmount.toFixed(2)}</p>
          )}

        </div>
      </div>
    </div>
  );
};

export default Coin;