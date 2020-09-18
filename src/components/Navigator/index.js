import React, {useState} from 'react';
import './styles.css';

const Navigator = (props) => {
  const [activeButton, setActiveButton] = useState('start');

  const getButtonStyle = (buttonName) => {
    if (activeButton === buttonName) {
      return 'navigator__button navigator__button_active';
    } else {
      return 'navigator__button';
    }
  };

  const getButtonTextStyle = (buttonName) => {
    if (activeButton === buttonName) {
      return 'button__text button__text_active';
    } else {
      return 'button__text';
    }
  };

  const buttonClickHandler = (buttonName) => {
    setActiveButton(buttonName);
    props.toggleMenu();
  };

  return (
    <div className='navigator'>
      <h1 className='navigator__h1'>{props.name}</h1>
      <div
        onClick={() => buttonClickHandler('start')}
        className={getButtonStyle('start')}>
        <p className={getButtonTextStyle('start')}>Start</p>
      </div>
      <div
        onClick={() => buttonClickHandler('yourCart')}
        className={getButtonStyle('yourCart')}>
        <p className={getButtonTextStyle('yourCart')}>Your Cart</p>
      </div>
      <div
        onClick={() => buttonClickHandler('favourites')}
        className={getButtonStyle('favourites')}>
        <p className={getButtonTextStyle('favourites')}>Favourites</p>
      </div>
      <div
        onClick={() => buttonClickHandler('yourOrders')}
        className={getButtonStyle('yourOrders')}>
        <p className={getButtonTextStyle('yourOrders')}>Your Orders</p>
      </div>
      <div className='navigator__delimeter' />
      <div
        onClick={() => buttonClickHandler('signOut')}
        className={getButtonStyle('signOut')}>
        <p className={getButtonTextStyle('signOut')}>Sign Out</p>
      </div>
    </div>
  );
};

export default Navigator;
