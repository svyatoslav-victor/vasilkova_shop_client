import React from 'react';

import processOrder from '../../shop_icons/worker-pushing-a-cart-svgrepo-com.svg';

import './ThankYou.scss';

export const ThankYou: React.FC = () => {
  return (
    <div className='thankYou'>
      <h1 className='thankYou__heading'>
        Дякуємо за замовлення!
      </h1>
      <p className='thankYou__message'>
        Представник відділу продажів скоро з Вами зв'яжеться
      </p>
      <img
        className='thankYou__image'
        src={processOrder}
      />
    </div>
  )
}
