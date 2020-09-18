import * as React from 'react';
import './styles.css';

const MenuButton = (props) => {
  return (
    <div className='button' onClick={() => props.toggleMenu()}>
        <img className='image' src={menu} alt="Menu" height={27} width={30} />
    </div>
  );
};

export default MenuButton;
