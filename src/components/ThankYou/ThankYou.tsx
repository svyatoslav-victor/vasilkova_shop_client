import React from 'react';

import processOrder from '../../shop_icons/worker-pushing-a-cart-svgrepo-com.svg';

import './ThankYou.scss';

export const ThankYou: React.FC = () => {
  return (
    <div className='thankYou'>
      <h1 className='thankYou__heading'>
        Thank you for your order!
      </h1>
      <p className='thankYou__message'>
        A sales representative will contact you soon
      </p>
      <img
        className='thankYou__image'
        src={processOrder}
      />
    </div>
  )
}
