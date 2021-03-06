import React from 'react';
import './UserInfo.scss';

export default function UserInfo(props) {
  const { user, rate } = props;
  const userUsdRate = ((1 / rate) * user.coins).toFixed(2);
  return (
    <div className="user-info flex column">
      <img className="user-img" src="imgs/bitcoin2.png" alt="user-img" />
      <span className="user-title">Hello {user.name}!</span>
      <span className="coins-txt flex align-center">
        <img className="coins-img" src="imgs/coins.png" alt="usd-img"></img>{' '}
        <span className="coin-txt">USD: </span> {userUsdRate}
      </span>
      <span className="coins-txt flex align-center">
        <img
          className="coins-img"
          src="imgs/bitcoin2.png"
          alt="bitcoin-img"
        ></img>{' '}
        <span className="coin-txt">BTC: </span> {user.coins}
      </span>
    </div>
  );
}
